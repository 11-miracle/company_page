'use client';

import { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { useRouter } from 'next/navigation';

export default function FilterQuery() {
    const [avg, setAvg] = useState('500');
    const [category, setCategory] = useState('Home Supplies - 居家日用');
    const [categoryMode, setCategoryMode] = useState('模糊查询');
    const [gmvRange, setGmvRange] = useState('$1K-$10K');
    const [fans, setFans] = useState('3000');
    const [daysAgo, setDaysAgo] = useState(10);
    const [results, setResults] = useState([]);
    const [log, setLog] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(50);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();

    // Log message function
    const logMessage = (message) => {
        setLog(prev => prev + message + '\n');
    };

    // Handle filter query submission
    const handleFilterQuery = async () => {
        // Validate inputs
        if (!avg || !fans) {
            setError('请确保所有字段都已填写');
            return;
        }

        let avgNum, fansNum;
        try {
            avgNum = Number(avg);
            fansNum = Number(fans);
        } catch (error) {
            setError('均播 和 粉丝数 必须是整数');
            return;
        }

        setIsLoading(true);
        setError(null);

        // Process category and gmv_range
        let processedCategory = category === '全部' ? '' : category.split(' - ')[0].trim();
        let processedGmvRange = gmvRange === '全部' ? '' : gmvRange;

        // Check permission if both category and gmv_range are empty
        if (!processedCategory && !processedGmvRange) {
            try {
                const permResponse = await axios.get(`/api/user/${user.cpu_id}/permission`);
                if (permResponse.data.data.permission !== 'admin') {
                    alert('权限错误，请联系管理员');
                    setIsLoading(false);
                    return;
                }
            } catch (error) {
                console.error('Error checking permission:', error);
                setError('权限错误，请联系管理员');
                setIsLoading(false);
                return;
            }
        }

        // Log query parameters
        logMessage(`开始查询: 均播>${avg}, 带货品类:${processedCategory || '全部'}, GMV区间:${processedGmvRange || '全部'}, 粉丝数>${fans}`);

        try {
            const payload = {
                avg: avgNum,
                category: processedCategory || null,
                category_mode: categoryMode,
                gmv_range: processedGmvRange || null,
                fans: fansNum,
                days_ago: daysAgo
            };

            const response = await axios.post('/api/filterQuery', payload);
            if (response.data.success) {
                setResults(response.data.data);
                setTotalPages(Math.ceil(response.data.data.length / itemsPerPage));
                logMessage(`查询完成: 查询到了 ${response.data.data.length} 条数据`);
            } else {
                logMessage('查询失败');
                alert('免费次数已用完，请联系销售获得免费次数');
            }
        } catch (error) {
            console.error('Error in filter query:', error);
            if (error.response?.status === 401) {
                logMessage('免费次数已用完');
                alert('免费次数已用完，请联系销售获得免费次数');
            } else {
                logMessage('查询错误');
                alert('免费次数已用完，请联系销售获得免费次数');
            }
        } finally {
            setIsLoading(false);
        }
    };
    // 新增导出到 Excel 函数
    const exportToExcel = () => {
        if (results.length === 0) {
            alert('没有可导出的数据');
            return;
        }

        // 准备导出的数据
        const worksheetData = results.map(result => ({
            'UID': result.uid,
            '用户名': result.username,
            '粉丝数': result.fans,
            '品类': result.category,
            'GMV中位数收入': result.med_gmv_revenue,
            'GMV区间': result.gmv_range,
            '直播GMV': result.live_gmv,
            '视频GMV': result.video_gmv,
            '销售单位': result.units_sold,
            '平均': result.avg,
            '快速增长': result.is_fast_growing ? '是' : '否',
            '女性比例': result.female_rate,
            '主要粉丝年龄': result.top_follower_age,
            '粉丝年龄分布': result.top_follower_ages,
            '邮箱': result.email,
            'WhatsApp': result.whatsapp,
            '评分': result.rate,
            '是否黑名单': result.is_black ? '是' : '否',
            '黑名单原因': result.black_reason,
            '创建时间': result.create_time
        }));

        // 创建工作表和工作簿
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, '筛选查询结果');

        // 生成并下载 Excel 文件
        XLSX.writeFile(workbook, 'filter_query_results.xlsx');
    };
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">筛选查询</h2>
            <div className="mb-4">
                <button
                    onClick={() => router.push('/page/home')}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 mr-4"
                >
                    返回首页
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block mb-2">均播</label>
                    <input
                        type="text"
                        value={avg}
                        onChange={(e) => setAvg(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                </div>

                <div>
                    <label className="block mb-2">粉丝数</label>
                    <input
                        type="text"
                        value={fans}
                        onChange={(e) => setFans(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                </div>

                <div>
                    <label className="block mb-2">带货品类</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border p-2 rounded w-full"
                    >
                        <option>Home Supplies - 居家日用</option>
                        <option>Kitchenware - 厨房用品</option>
                        <option>Textiles & Soft Furnishings - 家纺布艺</option>
                        <option>Household Appliances - 家电</option>
                        <option>Womenswear & Underwear - 女装与女士内衣</option>
                        <option>Muslim Fashion - 穆斯林时尚</option>
                        <option>Shoes - 鞋靴</option>
                        <option>Beauty & Personal Care - 美妆个护</option>
                        <option>Phones & Electronics - 手机与数码</option>
                        <option>Computers & Office Equipment - 电脑办公</option>
                        <option>Pet Supplies - 宠物用品</option>
                        <option>Baby & Maternity - 母婴用品</option>
                        <option>Sports & Outdoor - 运动与户外</option>
                        <option>Toys & Hobbies - 玩具和爱好</option>
                        <option>Furniture - 家具</option>
                        <option>Tools & Hardware - 五金工具</option>
                        <option>Home Improvement - 家装建材</option>
                        <option>Automotive & Motorcycle - 汽车与摩托车</option>
                        <option>Fashion Accessories - 时尚配件</option>
                        <option>Food & Beverages - 食品饮料</option>
                        <option>Health - 保健</option>
                        <option>Books, Magazines & Audio - 图书&杂志&音频</option>
                        <option>Kids' Fashion - 儿童时尚</option>
                        <option>Menswear & Underwear - 男装与男士内衣</option>
                        <option>Luggage & Bags - 箱包</option>
                        <option>Collectibles - 收藏品</option>
                        <option>Jewelry Accessories & Derivatives - 珠宝与衍生品</option>
                        <option>全部</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2">GMV区间</label>
                    <select
                        value={gmvRange}
                        onChange={(e) => setGmvRange(e.target.value)}
                        className="border p-2 rounded w-full"
                    >
                        <option>全部</option>
                        <option>$0-$100</option>
                        <option>$100-$1K</option>
                        <option>$1K-$10K</option>
                        <option>$10K+</option>
                    </select>
                </div>
            </div>

            <div className="mb-4">
                <label className="block mb-2">查询天数</label>
                <input
                    type="number"
                    value={daysAgo}
                    onChange={(e) => setDaysAgo(Number(e.target.value))}
                    className="border p-2 rounded w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">品类查询模式</label>
                <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            checked={categoryMode === '模糊查询'}
                            onChange={() => setCategoryMode('模糊查询')}
                            className="form-radio"
                        />
                        <span className="ml-2">模糊查询</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            checked={categoryMode === '精确查询'}
                            onChange={() => setCategoryMode('精确查询')}
                            className="form-radio"
                        />
                        <span className="ml-2">精确查询</span>
                    </label>
                </div>
            </div>

            <button
                onClick={handleFilterQuery}
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300 w-full mb-4"
            >
                {isLoading ? '查询中...' : '查询'}
            </button>
            <button
                onClick={exportToExcel}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex-1"
            >
                导出到 Excel
            </button>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Log Output */}
            <div className="bg-gray-100 p-4 rounded mb-4">
                <pre className="whitespace-pre-wrap">{log}</pre>
            </div>

            {/* Results Display */}
            {results.length > 0 && (
                <div className="overflow-x-auto">
                    <div className="flex justify-between items-center mb-4">
                        <span>共 {results.length} 条数据</span>
                        <div className="flex space-x-2">
                            <button 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                上一页
                            </button>
                            <span>第 {currentPage} 页 / 共 {totalPages} 页</span>
                            <div className="flex items-center ml-2">
                                <span className="mr-2">跳至:</span>
                                <input
                                    type="number"
                                    min="1"
                                    max={totalPages}
                                    value={currentPage}
                                    onChange={(e) => {
                                        const page = Number(e.target.value);
                                        if (page >= 1 && page <= totalPages) {
                                            setCurrentPage(page);
                                        }
                                    }}
                                    className="border p-1 rounded w-16 text-center"
                                />
                            </div>
                            <button 
                                onClick={() => setCurrentPage(prev => 
                                    prev < Math.ceil(results.length / itemsPerPage) ? prev + 1 : prev
                                )}
                                disabled={currentPage >= totalPages}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                下一页
                            </button>
                        </div>
                    </div>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                        <thead>
                            <tr>
                                <th className="border px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UID</th>
                                <th className="border px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户名</th>
                                <th className="border px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">粉丝数</th>
                                <th className="border px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">品类</th>
                                <th className="border px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GMV具体值</th>
                                <th className="border px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GMV区间</th>
                                <th className="border px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">直播GMV</th>
                                <th className="border px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">视频GMV</th>
                                <th className="border px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">销售数量</th>
                                <th className="border px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">均播</th>
                                <th className="border px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">快速增长</th>
                                <th className="border px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">女性比例</th>
                                <th className="border px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">主要粉丝年龄</th>
                                <th className="border px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">粉丝年龄分布</th>
                                <th className="border px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">邮箱</th>
                                <th className="border px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WhatsApp</th>
                                <th className="border px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">履约率</th>
                                <th className="border px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">是否黑名单</th>
                                <th className="border px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">黑名单原因</th>
                                <th className="border px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">创建时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.slice(
                                (currentPage - 1) * itemsPerPage,
                                currentPage * itemsPerPage
                            ).map((result, index) => (
                                <tr key={index} className="hover:bg-gray-50 even:bg-gray-50">
                                    <td className="border px-4 py-3 text-sm text-gray-700 border-gray-200">{result.uid}</td>
                                    <td className="border px-4 py-3 text-sm text-gray-700 border-gray-200">{result.username}</td>
                                    <td className="border px-4 py-3 text-sm text-gray-700 border-gray-200">{result.fans}</td>
                                    <td className="border px-4 py-3 text-sm text-gray-700 border-gray-200">{result.category}</td>
                                    <td className="border px-4 py-3 text-sm text-gray-700 border-gray-200">{result.med_gmv_revenue}</td>
                                    <td className="border px-4 py-3 text-sm text-gray-700 border-gray-200">{result.gmv_range}</td>
                                    <td className="border px-4 py-3 text-sm text-gray-700 border-gray-200">{result.live_gmv}</td>
                                    <td className="border px-4 py-3 text-sm text-gray-700 border-gray-200">{result.video_gmv}</td>
                                    <td className="border px-4 py-3 text-sm text-gray-700 border-gray-200">{result.units_sold}</td>
                                    <td className="border px-4 py-3 text-sm text-gray-700 border-gray-200">{result.avg}</td>
                                    <td className="border px-4 py-3 text-sm text-gray-700 border-gray-200">{result.is_fast_growing ? '是' : '否'}</td>
                                    <td className="border px-4 py-3 text-sm text-gray-700 border-gray-200">{result.female_rate}</td>
                                    <td className="border px-4 py-3 text-sm text-gray-700 border-gray-200">{result.top_follower_age}</td>
                                    <td className="border px-4 py-3 text-sm text-gray-700 border-gray-200">{result.top_follower_ages}</td>
                                    <td className="border px-4 py-3 text-sm text-gray-700 border-gray-200">{result.email}</td>
                                    <td className="border px-4 py-3 text-sm text-gray-700 border-gray-200">{result.whatsapp}</td>
                                    <td className="border px-4 py-3 text-sm text-gray-700 border-gray-200">{result.rate}</td>
                                    <td className="border px-4 py-3 text-sm text-gray-700 border-gray-200">{result.is_black ? '是' : '否'}</td>
                                    <td className="border px-4 py-3 text-sm text-gray-700 border-gray-200">{result.black_reason}</td>
                                    <td className="border px-4 py-3 text-sm text-gray-700 border-gray-200">{result.create_time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
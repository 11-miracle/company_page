'use client';

import { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import FilterQuery from '../filterQuery/page';
import Blacklist from '../blacklist/page';
import { useRouter } from 'next/navigation';


// Home Component
function Home() {
  const router = useRouter();
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Welcome to TikTok Data Tool</h2>
      <p>Select an option below to query data, manage blacklists, or download templates.</p>
      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => router.push('/page/batchQuery')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Batch Query
        </button>
        <button
          onClick={() => router.push('/page/filterQuery')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Filter Query
        </button>
        <button
          onClick={() => router.push('/page/blacklist')}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Blacklist
        </button>
      </div>
    </div>
  );
}

// Batch Query Component
function BatchQuery() {
  const [usernames, setUsernames] = useState('');
  const [daysAgo, setDaysAgo] = useState(10);
  const [results, setResults] = useState([]);
  const [notFound, setNotFound] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [totalPages, setTotalPages] = useState(1);

  // Handle batch query submission
  const handleBatchQuery = async () => {
    if (!usernames.trim()) {
      setError('请输入至少一个用户名');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const usernameList = usernames.split('\n').map(name => name.trim()).filter(name => name);
      const response = await fetch('/api/batchQuery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usernames: usernameList,
          days_ago: daysAgo
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResults(data.results);
        setNotFound(data.not_found);
        setTotalPages(Math.ceil(data.results.length / itemsPerPage));
        setCurrentPage(1);
      } else {
        setError(data.message || '查询失败');
      }
    } catch (error) {
      console.error('Error in batch query:', error);
      setError('网络请求失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle template download
  const downloadTemplate = async () => {
    try {
      const response = await fetch('/api/template/uid');
      if (!response.ok) {
        throw new Error('Failed to download template');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'upload_template_uid.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading template:', error);
      alert('Error downloading template');
    }
  };

  // Handle export to Excel
  const exportToExcel = () => {
    if (results.length === 0) {
      alert('No results to export');
      return;
    }

    // Prepare data for export
    const worksheetData = results.map(result => ({
      'UID': result.uid,
      'Username': result.username,
      'Fans': result.fans,
      'Category': result.category,
      'Median GMV Revenue': result.med_gmv_revenue,
      'GMV Range': result.gmv_range,
      'Live GMV': result.live_gmv,
      'Video GMV': result.video_gmv,
      'Units Sold': result.units_sold,
      'Average': result.avg,
      'Is Fast Growing': result.is_fast_growing ? 'Yes' : 'No',
      'Female Rate': result.female_rate,
      'Top Follower Age': result.top_follower_age,
      'Top Follower Ages': result.top_follower_ages,
      'Email': result.email,
      'WhatsApp': result.whatsapp,
      'Rate': result.rate,
      'Is Blacklisted': result.is_black ? 'Yes' : 'No',
      'Blacklist Reason': result.black_reason,
      'Create Time': result.create_time
    }));

    // Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Batch Query Results');

    // Generate and download Excel file
    XLSX.writeFile(workbook, 'batch_query_results.xlsx');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Batch Query</h2>
      <textarea
        value={usernames}
        onChange={(e) => setUsernames(e.target.value)}
        placeholder="Enter usernames (one per line)"
        className="border p-2 rounded w-full mb-4"
        rows="4"
      />
      <input
        type="number"
        value={daysAgo}
        onChange={(e) => setDaysAgo(Number(e.target.value))}
        placeholder="Days ago"
        className="border p-2 rounded w-full mb-4"
      />
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleBatchQuery}
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isLoading ? '查询中...' : 'Query'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          onClick={downloadTemplate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download Template
        </button>
        <button
          onClick={exportToExcel}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Export to Excel
        </button>
      </div>
      {/* Results Table */}
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
      {/* Not Found List */}
      {notFound.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Not Found</h3>
          <ul className="list-disc pl-5">
            {notFound.map((username, index) => (
              <li key={index}>{username}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Main App Component
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [cpuId, setCpuId] = useState('');
  const [user, setUser] = useState(null);
  const [permission, setPermission] = useState('');

  // Check user on CPU ID input
  const checkUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user?cpu_id=${cpuId}`);
      if (response.data.success) {
        setUser(response.data.data);
        const permResponse = await axios.get(`http://localhost:8000/api/user/${cpuId}/permission`);
        setPermission(permResponse.data.data.permission);
      } else {
        alert('User not found');
      }
    } catch (error) {
      console.error('Error checking user:', error);
      alert('Error checking user');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">TikTok Data Tool</h1>
          <div className="space-x-4">
            <button onClick={() => setActiveTab('home')}
                    className="text-white hover:text-gray-200">Home
            </button>
            <button onClick={() => setActiveTab('batchQuery')}
                    className="text-white hover:text-gray-200">Batch Query
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Conditional Rendering Based on Active Tab */}
        {activeTab === 'home' && <Home />}
        {activeTab === 'batchQuery' && <BatchQuery />}
        {activeTab === 'filterQuery' && <FilterQuery />}
        {activeTab === 'blacklist' && <Blacklist />}
      </div>
    </div>
  );
}
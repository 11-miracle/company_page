import Image from 'next/image';
import Link from 'next/link';

export default function AboutUs() {
  // 公司数据
  const companyStats = [
    { id: 1, value: '2023', label: '成立年份' },
    { id: 2, value: '15+', label: '专业团队' },
    { id: 3, value: '120+', label: '品牌合作' },
    { id: 4, value: '80%+', label: '客户续约率' }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">关于星燃出海</h2>
            <p className="text-lg text-gray-600 mb-6">
            星燃出海是专注于TikTok营销的专业机构，拥有业内领先的达人资源与创意策略，致力于帮助品牌在全球最具活力的短视频平台上取得成功。
            </p>
            <p className="text-lg text-gray-600 mb-6">
              我们的团队由资深社交媒体专家、内容创作者和数据分析师组成，凭借对TikTok平台的深刻理解和丰富的营销经验，为客户提供全方位的短视频营销解决方案。
            </p>
            <p className="text-lg text-gray-600 mb-8">
              从内容策划、达人合作到广告投放和效果分析，我们的服务覆盖TikTok营销的各个环节，确保客户在这个快速发展的平台上获得最大的品牌价值与商业回报。
            </p>
            
            <Link href="/about" className="inline-block bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              了解更多
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {companyStats.map(stat => (
              <div key={stat.id} className="bg-gray-50 rounded-xl p-8 text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
            
            {/* 公司图片占位符 */}
            {/* <div className="col-span-2 h-64 rounded-xl overflow-hidden">
              <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                <p className="text-indigo-600 font-medium">公司团队照片</p>
              </div>
            </div> */}
          </div>
        </div>
        
        
      </div>
    </section>
  );
} 
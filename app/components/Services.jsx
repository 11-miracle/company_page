import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    id: 'content',
    icon: '/file.svg',
    title: '内容创作',
    description: '由专业团队打造引人入胜的TikTok内容，结合当前趋势与品牌核心价值，创造病毒式传播效果。',
    features: [
      '趋势洞察与创意策划',
      '脚本撰写与拍摄指导',
      '专业后期制作与特效',
      '多语言本地化内容适配'
    ]
  },
  {
    id: 'influencer',
    icon: '/globe.svg',
    title: '达人合作',
    description: '从我们60万+的达人资源库中，精准匹配适合您品牌调性的KOL，实现高效率的品牌曝光与转化。',
    features: [
      '达人筛选与评估',
      '合作方案定制',
      '数据追踪与报告',
      '长期合作关系管理'
    ]
  },
  {
    id: 'ads',
    icon: '/window.svg',
    title: '广告投放',
    description: '利用TikTok强大的广告系统，结合我们的投放经验，为您的品牌打造高ROI的营销活动。',
    features: [
      '目标受众分析',
      '创意广告制作',
      '预算优化分配',
      '实时监测与调整'
    ]
  },
  {
    id: 'strategy',
    icon: '/globe.svg',
    title: '营销策略',
    description: '基于深度数据分析，为品牌量身定制TikTok全域营销策略，实现品牌长期增长。',
    features: [
      '品牌调性分析',
      '竞品研究与对标',
      '内容日历规划',
      '多平台联动方案'
    ]
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">我们的服务</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            以专业视角挖掘品牌潜力，打造全方位TikTok营销解决方案
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-8">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={30}
                    height={30}
                    className="text-indigo-600"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* <Link href={`#${service.id}`} className="inline-block bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                  了解更多
                </Link> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
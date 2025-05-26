import Image from 'next/image';
import Link from 'next/link';

const caseStudies = [
  {
    id: 1,
    title: '国际服饰品牌TikTok营销突破',
    category: '服饰行业',
    metrics: {
      views: '120万+',
      engagement: '30万+',
      sales: '提升87%'
    },
    description: '精准达人矩阵，50位分区达人（5头部+20中腰部+25尾部）实现品牌爆发式增长。',
    image: '/images/women.png',
    link: '/cases/beauty-brand'
  },
  {
    id: 2,
    title: '新锐食品品牌短视频内容矩阵',
    category: '保健食品',
    metrics: {
      views: '160万+',
      engagement: '70万+',
      conversion: '提升42%'
    },
    description: '为新锐零食品牌策划创意短视频系列，结合产品特色与当下流行趋势，打造病毒式传播内容，带动品牌知名度与销量双提升。',
    image: '/images/food.png',
    link: '/cases/food-brand'
  },
  {
    id: 3,
    title: '科技产品全球发布TikTok策略',
    category: '科技数码',
    metrics: {
      views: '86万+',
      engagement: '20万+',
      roi: '提升66%'
    },
    description: '为科技品牌新产品全球发布策划TikTok营销方案，整合达人资源与创意内容，实现品牌声量最大化，带动产品首发销售。',
    image: '/images/keda.jpeg',
    link: '/cases/tech-product'
  }
];

export default function CaseStudies() {
  return (
    <section id="cases" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">成功案例</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            我们帮助各行业品牌在TikTok平台取得突破性增长
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {caseStudies.map((caseStudy) => (
            <div key={caseStudy.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="relative h-64 w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${caseStudy.image})` }}
                ></div>
                <div className="absolute top-4 left-4 bg-indigo-600 text-white text-sm font-semibold py-1 px-3 rounded-full z-20">
                  {caseStudy.category}
                </div>
              </div>
              
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{caseStudy.title}</h3>
                <p className="text-gray-600 mb-6">{caseStudy.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(caseStudy.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">{value}</div>
                      <div className="text-xs text-gray-500 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="px-6 pb-6">
                <Link href={`#${caseStudy.id}`} className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-medium transition-colors">
                  查看详情
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* <div className="text-center mt-12">
          <Link href="#cases" className="inline-block bg-indigo-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            查看更多案例
          </Link>
        </div> */}
      </div>
    </section>
  );
} 
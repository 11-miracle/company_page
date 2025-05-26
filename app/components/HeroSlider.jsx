"use client";

import { useState } from 'react';

const slides = [
  {
    id: 1,
    title: '专业TikTok营销解决方案',
    description: '连接品牌与全球用户，打造病毒式传播内容',
    cta: '了解我们的服务',
    section: 'services',
    image: '/images/main.jpg',
    color: 'from-blue-600 to-indigo-800'
  },
  {
    id: 2,
    title: '3万+优质达人资源',
    description: '覆盖全球各垂直领域，精准匹配您的品牌需求',
    cta: '探索达人库',
    section: 'influencers',
    image: '/images/women.png',
    color: 'from-purple-600 to-pink-700'
  },
  {
    id: 3,
    title: '数据驱动的营销策略',
    description: '基于深度分析的内容创意与投放优化',
    cta: '查看成功案例',
    section: 'cases',
    image: '/images/keda.jpeg',
    color: 'from-teal-500 to-emerald-700'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleCtaClick = (sectionId) => {
    // 获取目标元素
    const element = document.getElementById(sectionId);
    if (element) {
      // 平滑滚动到元素位置
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 flex items-center transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-80`}></div>
          <div className="absolute inset-0 bg-black opacity-30"></div>
          
          {/* 这里使用普通的div作为图片占位符，实际项目中应该使用真实图片 */}
          <div className="absolute inset-0 z-0" 
               style={{
                 backgroundImage: 'url(/images/main2.png)',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center'
               }}></div>
          
          <div className="container mx-auto px-6 relative z-20 text-white">
            <div className="max-w-3xl">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up">{slide.title}</h2>
              <p className="text-xl md:text-2xl mb-8 animate-fade-in-up animation-delay-200">{slide.description}</p>
              <button 
                onClick={() => handleCtaClick(slide.section)}
                className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all hover:shadow-lg hover:scale-105 active:scale-95 animate-fade-in-up animation-delay-400"
              >
                {slide.cta}
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-12 left-0 right-0 z-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center">
            <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-full px-6 py-3 flex space-x-4">
              {slides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className="flex flex-col items-center group transition-all"
                >
                  <span className={`text-sm font-medium mb-2 ${
                    index === currentSlide ? 'text-white' : 'text-gray-300 group-hover:text-white'
                  }`}>
                    {slide.cta}
                  </span>
                  <div className={`h-1 rounded-full transition-all duration-300 ease-in-out 
                    ${index === currentSlide 
                      ? 'bg-white w-12' 
                      : 'bg-white bg-opacity-50 w-8 group-hover:bg-opacity-70'
                    }`}
                  ></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}
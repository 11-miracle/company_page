"use client";

import { useState } from 'react';
import Link from 'next/link';

// 达人分类数据
const categories = [
  { id: 'all', name: '全部领域' },
  { id: 'beauty', name: '美妆个护' },
  { id: 'clothes', name: '女装' },
  { id: 'phone', name: '3A' },
  { id: 'lifestyle', name: '生活方式' },
  { id: 'fitness', name: '健身运动' },
  // { id: 'technology', name: '科技数码' },
  // { id: 'gaming', name: '游戏娱乐' },
  // { id: 'education', name: '教育知识' }
];

// 达人数据
const influencers = [
  {
    id: 1,
    name: '@angieanette',
    category: 'beauty',
    followers: '8.9W',
    engagement: '7.8%',
    content: '美妆教程、产品评测',
    region: '美国',
    image: '/creater/angieanette.jpg'
  },
  {
    id: 2,
    name: '@lacoronel90',
    category: 'clothes',
    followers: '46.2W',
    engagement: '6.2%',
    content: '女装推荐',
    region: '美国',
    image: '/creater/clothes.jpg'
  },
  {
    id: 3,
    name: '@lunabelaphoto',
    category: 'phone',
    followers: '14.4W',
    engagement: '5.9%',
    content: '3A产品',
    region: '美国',
    image: 'creater/phone.jpg'
  },
  {
    id: 4,
    name: '@crazycleaninglady222',
    category: 'lifestyle',
    followers: '30.6W',
    engagement: '8.1%',
    content: '日常生活、家居装饰',
    region: '美国',
    image: '/creater/lifestyle.jpg'
  },
  {
    id: 5,
    name: '@_prolumchild',
    category: 'fitness',
    followers: '22.2W',
    engagement: '9.2%',
    content: '保健食品、营养建议',
    region: '美国',
    image: '/creater/fitness.jpg'
  },
  {
    id: 6,
    name: '@ara_mm8',
    category: 'clothes',
    followers: '44.5W',
    engagement: '4.8%',
    content: '女装推荐',
    region: '美国',
    image: '/creater/ara_mm8.jpg'
  }
];

export default function InfluencerNetwork() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredInfluencers = activeCategory === 'all' 
    ? influencers 
    : influencers.filter(inf => inf.category === activeCategory);

  // 达人数量统计
  const stats = [
    { id: 1, label: '合作达人', value: '3万+' },
    { id: 2, label: '覆盖美国自治州', value: '50+' },
    { id: 3, label: '垂直领域', value: '25+' },
    { id: 4, label: '项目完成周期', value: '25天' }
  ];

  return (
    <section id="influencers" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">庞大达人资源</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            3万+全球优质达人资源，为您的品牌找到完美匹配
          </p>
        </div>
        
        {/* 数据统计 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map(stat => (
            <div key={stat.id} className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
        
        {/* 分类选择器 */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === category.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* 达人展示 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredInfluencers.map(influencer => (
            <div key={influencer.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex">
                <div className="w-1/3">
                  <div 
                    className="h-full bg-cover bg-center" 
                    style={{ backgroundImage: `url(${influencer.image})` }}
                  ></div>
                </div>
                <div className="w-2/3 p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{influencer.name}</h3>
                  <div className="text-sm text-gray-500 mb-3">
                    <div className="mb-1"><span className="font-medium">粉丝:</span> {influencer.followers}</div>
                    <div className="mb-1"><span className="font-medium">互动率:</span> {influencer.engagement}</div>
                    <div className="mb-1"><span className="font-medium">内容:</span> {influencer.content}</div>
                    <div><span className="font-medium">地区:</span> {influencer.region}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col items-center mt-12">
          <p className="text-gray-600 text-lg mb-4">这只是我们庞大达人库的一小部分，根据您的需求，我们可以提供更精准的达人匹配</p>
          {/* <button 
          onClick={() => router.push('/page/home')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-full shadow-lg flex items-center"
        >
          <span className="mr-2">探索完整达人库</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button> */}
          {/* <Link href="#influencers" className="inline-block bg-indigo-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            探索完整达人库
          </Link> */}
        </div>
      </div>
    </section>
  );
} 
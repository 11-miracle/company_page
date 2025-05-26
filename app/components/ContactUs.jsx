"use client";

import { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // 在实际应用中，这里应该有表单提交逻辑
    console.log('表单数据:', formData);
    // 模拟提交成功
    setSubmitted(true);
    // 清空表单
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
    
    // 5秒后重置提交状态
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };
  
  const services = [
    { value: 'content', label: '内容创作' },
    { value: 'influencer', label: '达人合作' },
    { value: 'ads', label: '广告投放' },
    { value: 'strategy', label: '营销策略' },
    { value: 'other', label: '其他服务' }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">联系我们</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            让我们携手共创TikTok营销成功，提升您的品牌影响力
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 联系信息 */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">联系方式</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-indigo-100 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">公司地址</h4>
                    <p className="text-gray-600">广州市南沙区保利思泰广场1栋1210</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-indigo-100 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">电话</h4>
                    <p className="text-gray-600">+86 17728757995</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-indigo-100 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">邮箱</h4>
                    <p className="text-gray-600">1057707648@qq.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-indigo-100 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">工作时间</h4>
                    <p className="text-gray-600">周一至周六: 9:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* <div className="mt-8 bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">关注我们</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-indigo-100 rounded-full p-3 text-indigo-600 hover:bg-indigo-200 transition">
                  <span className="sr-only">微信</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M18.584 14.645c-1.34.672-2.42.336-3.088-.336-.672-.672-2.017-.672-2.689 0-.672.672-1.765.672-2.437 0-.672-.672-2.016-.672-2.688 0-.672.672-1.765.672-2.437 0-.672-.672-2.016-.672-2.688 0-.672.672-1.765.672-2.437 0-.672-.672-2.016-.672-2.688 0 .672.672 1.092 1.345 1.764 1.681 1.008.504 2.352.168 3.024-.504.672-.672 2.016-.672 2.688 0 .672.672 1.764.672 2.436 0 .672-.672 2.016-.672 2.688 0 .672.672 1.764.672 2.436 0 .672-.672 2.016-.672 2.688 0 .672.672 1.764.672 2.436 0 .672-.672 2.016-.672 2.688 0 .672.672 1.764.672 2.436 0 .672-.672 2.016-.672 2.688 0 .672.672 1.764.672 2.436 0 .672-.672 2.016-.672 2.688 0 .672.672 1.764.672 2.436 0 .672-.672 2.016-.672 2.688 0 .672.672 1.512 1.008 2.52.336z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="bg-indigo-100 rounded-full p-3 text-indigo-600 hover:bg-indigo-200 transition">
                  <span className="sr-only">知乎</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.126 17.157c-2.01 0-3.925-.617-5.032-1.68l-2.093 2.179 2.01-4.407c-1.177-1.233-1.93-2.815-1.93-4.558C5.081 5.158 8.266 2 12.125 2c3.86 0 7.044 3.158 7.044 7.064 0 3.906-3.185 8.093-7.044 8.093zm0-13.157c-2.766 0-5.044 2.304-5.044 5.159 0 1.438.657 2.73 1.657 3.58L9.7 14.298l1.008-.954c.455.116.939.222 1.42.222 2.764 0 5.042-2.304 5.042-5.159s-2.278-5.159-5.042-5.159z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="bg-indigo-100 rounded-full p-3 text-indigo-600 hover:bg-indigo-200 transition">
                  <span className="sr-only">抖音</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07" />
                  </svg>
                </a>
              </div>
            </div> */}
          </div>
          
          {/* 联系表单 */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">发送咨询</h3>
            
            {submitted ? (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      您的信息已提交成功！我们将尽快与您，紧急可直接跟我们打电话。
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">姓名 *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">公司名称 *</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">电子邮箱 *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">电话</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">感兴趣的服务 *</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">请选择...</option>
                    {services.map(service => (
                      <option key={service.value} value={service.value}>{service.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">咨询内容 *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    提交咨询
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 
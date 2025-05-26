import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">星燃出海</h3>
            <p className="text-gray-400 mb-4">专业的TikTok营销解决方案提供商，连接品牌与全球用户</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">微信</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M18.584 14.645c-1.34.672-2.42.336-3.088-.336-.672-.672-2.017-.672-2.689 0-.672.672-1.765.672-2.437 0-.672-.672-2.016-.672-2.688 0-.672.672-1.765.672-2.437 0-.672-.672-2.016-.672-2.688 0-.672.672-1.765.672-2.437 0-.672-.672-2.016-.672-2.688 0 .672.672 1.092 1.345 1.764 1.681 1.008.504 2.352.168 3.024-.504.672-.672 2.016-.672 2.688 0 .672.672 1.764.672 2.436 0 .672-.672 2.016-.672 2.688 0 .672.672 1.764.672 2.436 0 .672-.672 2.016-.672 2.688 0 .672.672 1.764.672 2.436 0 .672-.672 2.016-.672 2.688 0 .672.672 1.764.672 2.436 0 .672-.672 2.016-.672 2.688 0 .672.672 1.764.672 2.436 0 .672-.672 2.016-.672 2.688 0 .672.672 1.512 1.008 2.52.336z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">知乎</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.126 17.157c-2.01 0-3.925-.617-5.032-1.68l-2.093 2.179 2.01-4.407c-1.177-1.233-1.93-2.815-1.93-4.558C5.081 5.158 8.266 2 12.125 2c3.86 0 7.044 3.158 7.044 7.064 0 3.906-3.185 8.093-7.044 8.093zm0-13.157c-2.766 0-5.044 2.304-5.044 5.159 0 1.438.657 2.73 1.657 3.58L9.7 14.298l1.008-.954c.455.116.939.222 1.42.222 2.764 0 5.042-2.304 5.042-5.159s-2.278-5.159-5.042-5.159z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">抖音</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">服务</h3>
            <ul className="space-y-2">
              <li><Link href="/services#content" className="text-gray-400 hover:text-white">内容创作</Link></li>
              <li><Link href="/services#influencer" className="text-gray-400 hover:text-white">达人合作</Link></li>
              <li><Link href="/services#ads" className="text-gray-400 hover:text-white">广告投放</Link></li>
              <li><Link href="/services#strategy" className="text-gray-400 hover:text-white">营销策略</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">资源</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-gray-400 hover:text-white">博客</Link></li>
              <li><Link href="/cases" className="text-gray-400 hover:text-white">案例研究</Link></li>
              <li><Link href="/influencers" className="text-gray-400 hover:text-white">达人库</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">联系我们</h3>
            <p className="text-gray-400">广州市南沙区保利思泰广场1栋1210</p>
            <p className="text-gray-400">电话: +86 17728757995</p>
            <p className="text-gray-400">邮箱:1057707648@qq.com</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">© {new Date().getFullYear()} 星燃出海 版权所有</p>
        </div>
      </div>
    </footer>
  );
} 
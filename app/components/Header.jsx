import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-5 px-6 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="group">
          <div className="flex items-center mb-4 md:mb-0 transition-transform duration-300 ease-in-out hover:scale-105">
            <div className="relative">
              <Image 
                src="/xingran.png" 
                alt="星燃出海Logo" 
                width={60} 
                height={60} 
                className="mr-3 rounded-lg shadow-md" 
                style={{ objectFit: 'contain' }}
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                星燃<span className="font-light">出海</span>
              </h1>
              <p className="text-xs text-blue-200 font-light tracking-wider mt-0.5">GLOBAL MARKETING SOLUTIONS</p>
            </div>
          </div>
        </Link>
        
        <nav className="w-full md:w-auto">
          <ul className="flex flex-wrap justify-center md:justify-end gap-5 md:gap-8 text-base font-medium">
            <li>
              <a href="#home" className="hover:text-blue-200 transition-colors py-2 border-b-2 border-transparent hover:border-blue-300 cursor-pointer">
                首页
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-blue-200 transition-colors py-2 border-b-2 border-transparent hover:border-blue-300 cursor-pointer">
                关于我们
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-blue-200 transition-colors py-2 border-b-2 border-transparent hover:border-blue-300 cursor-pointer">
                服务内容
              </a>
            </li>
            <li>
              <a href="#cases" className="hover:text-blue-200 transition-colors py-2 border-b-2 border-transparent hover:border-blue-300 cursor-pointer">
                成功案例
              </a>
            </li>
            <li>
              <a href="#influencers" className="hover:text-blue-200 transition-colors py-2 border-b-2 border-transparent hover:border-blue-300 cursor-pointer">
                达人资源
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-blue-200 transition-colors py-2 border-b-2 border-transparent hover:border-blue-300 cursor-pointer">
                联系我们
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
'use client';

import { useRouter } from 'next/navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSlider from './components/HeroSlider';
import Services from './components/Services';
import CaseStudies from './components/CaseStudies';
import InfluencerNetwork from './components/InfluencerNetwork';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';

export default function Home() {
  const router = useRouter();
  
  return (
    <main>
      <Header />
      <HeroSlider />
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => router.push('/page/home')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-full shadow-lg flex items-center"
        >
          <span className="mr-2">进入星燃达人库</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <AboutUs />
      <Services />
      <CaseStudies />
      <InfluencerNetwork />
      <ContactUs />
      <Footer />
    </main>
  );
}
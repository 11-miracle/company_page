'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Pages() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/page/home');
  }, [router]);
  
  return null;
}
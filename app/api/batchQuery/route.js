import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const { usernames, days_ago } = await request.json();
    
    // 调用后端API
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/detail/batch`, {
      usernames,
      days_ago
    });
    
    if (response.data.success) {
      return NextResponse.json({
        results: response.data.data.results,
        not_found: response.data.data.not_found
      });
    } else {
      return NextResponse.json(
        { message: '后端查询失败' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API路由错误:', error);
    return NextResponse.json(
      { message: '服务器内部错误' },
      { status: 500 }
    );
  }
}
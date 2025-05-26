import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // 处理权限检查
    if (!body.category && !body.gmv_range) {
      const permResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/${body.user?.cpu_id}/permission`);
      if (permResponse.data.data.permission !== 'admin') {
        return NextResponse.json({ success: false, message: '权限错误，请联系管理员' }, { status: 403 });
      }
    }
    
    // 转发请求到原始API
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/detail/filter`, body);
    
    if (response.data.success) {
      return NextResponse.json({
        success: true,
        data: response.data.data
      });
    } else {
      return NextResponse.json({
        success: false,
        message: response.data.message || '查询失败'
      }, { status: 400 });
    }
    
  } catch (error) {
    console.error('Error in filter query:', error);
    return NextResponse.json({
      success: false,
      message: '服务器内部错误'
    }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/template/uid`);
    if (!backendResponse.ok) {
      throw new Error('Failed to fetch template from backend');
    }
    
    const blob = await backendResponse.blob();
    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="upload_template_uid.xlsx"'
      }
    });
  } catch (error) {
    console.error('Error in template download route:', error);
    return NextResponse.json(
      { error: 'Failed to download template' },
      { status: 500 }
    );
  }
}
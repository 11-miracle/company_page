import './globals.css';

export const metadata = {
  title: '星燃出海 - 专业TikTok营销解决方案提供商',
  description: '星燃出海是专注于TikTok营销的专业机构，拥有3万+达人资源，为品牌提供全方位短视频营销解决方案。',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
import '../css/style.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DynamicBackground from '../components/DynamicBackground';

export const metadata = {
  title: 'UniMatch — Hack số phận, chọn đúng trường',
  description: 'Không phải danh sách trường vô tri — UniMatch chia nguyện vọng theo tỷ lệ 30/50/20: an toàn, chuẩn, và dream. Raw data, lý do rõ ràng, zero corporate fluff.',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'UniMatch — Hack số phận, chọn đúng trường',
    description: 'Chiến lược nguyện vọng đại học 30/50/20 dành cho Gen-Z.',
    type: 'website',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <DynamicBackground />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-brand-section">
          <Link href="/" className="brand">
            <span className="brand-mark">U</span>
            UNIMATCH
          </Link>
          <p className="footer-tagline">
            Hack số phận, chọn đúng trường. Hệ thống tư vấn nguyện vọng thông minh theo chiến lược
            30/50/20 dành cho Gen-Z.
          </p>
          <div className="footer-socials">
            <a
              href="https://web.facebook.com/nguyen.xuan.uc.982793"
              className="social-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://github.com/xuanduc-nxd"
              className="social-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="footer-nav-column">
          <h4>Khám Phá</h4>
          <Link href="/">Trang chủ</Link>
          <Link href="/universities">Trường ĐH</Link>
          <Link href="/majors">Ngành học</Link>
          <Link href="/map">Bản đồ trường</Link>
        </div>

        <div className="footer-nav-column">
          <h4>Dữ Liệu & Code</h4>
          <a
            href="https://github.com/xuanduc-nxd"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Author
          </a>
          <a href="/docs/Thiet_ke_de_tai_UniMatch.doc" download>
            Tài liệu đề án
          </a>
          <a
            href="https://maps.vietmap.vn/console/register"
            target="_blank"
            rel="noopener noreferrer"
          >
            VietMap API
          </a>
        </div>

        <div className="footer-nav-column">
          <h4>Liên Hệ & Support</h4>
          <a href="mailto:contact@unimatch.vn">contact@unimatch.vn</a>
          <a href="/#about">Về chúng tôi</a>
          <a href="#">Điều khoản dịch vụ</a>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="copyright">
          &copy; 2026 UniMatch. All rights reserved. Designed for Gen-Z.
        </p>
      </div>
    </footer>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '../lib/supabase';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Lấy thông tin user hiện tại
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Đăng ký listener lắng nghe sự kiện thay đổi trạng thái đăng nhập
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === 'SIGNED_OUT') {
        const keysToRemove = [
          'unimatch_strategy_plan',
          'unimatch_form_draft',
          'unimatch_bookmarked_unis',
          'unimatch_compare_list',
          'unimatch_recent_searches_uni',
          'unimatch_uni_filters',
          'unimatch_bookmarked_majors',
          'unimatch_compare_majors',
          'unimatch_recent_searches_major',
          'unimatch_major_filters'
        ];
        keysToRemove.forEach((key) => {
          if (typeof window !== 'undefined') {
            localStorage.removeItem(key);
          }
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const playLogoutSound = () => {
    if (typeof window === 'undefined') return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    try {
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.6);
      
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.6);
    } catch (e) {}
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: typeof window !== 'undefined' ? window.location.origin : '',
      },
    });
    if (error) {
      console.error('Lỗi đăng nhập Google:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      playLogoutSound();
      setIsLoggingOut(true);
      
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const [_, result] = await Promise.all([
        delay(1200),
        supabase.auth.signOut()
      ]);
      
      if (result && result.error) {
        console.error('Lỗi đăng xuất:', result.error.message);
      }
    } catch (err) {
      console.error('Lỗi khi đăng xuất:', err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navLinks = [
    { href: '/', label: 'Trang chủ' },
    { href: '/universities', label: 'Trường ĐH' },
    { href: '/majors', label: 'Ngành học' },
    { href: '/map', label: 'Bản đồ' },
  ];

  return (
    <>
      <header className="site-header">
        <Link href="/" className="brand">
          <span className="brand-mark">U</span>
          UNIMATCH
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <nav className={`site-nav ${isOpen ? 'is-open' : ''}`} id="mainNav">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={isActive ? 'is-active' : ''}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <a href="/#about" onClick={() => setIsOpen(false)}>Giới thiệu</a>
          </nav>

          {/* Khối đăng nhập / Quản lý tài khoản */}
          {user ? (
            <div className="user-profile-widget" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img
                src={user.user_metadata?.avatar_url || 'https://www.gravatar.com/avatar?d=mp'}
                alt="Avatar"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '2px solid var(--ink)',
                }}
              />
              <span
                className="user-name"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  color: 'var(--white)',
                }}
              >
                {user.user_metadata?.full_name?.split(' ').pop() || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="mini-btn auth-btn"
                style={{
                  padding: '4px 8px',
                  fontSize: '0.7rem',
                  background: '#ff6b6b',
                  cursor: 'pointer',
                }}
              >
                Thoát
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="mini-btn auth-btn"
              style={{
                background: '#FFD23F',
                cursor: 'pointer',
              }}
            >
              Đăng nhập Google
            </button>
          )}

          <button
            className="nav-toggle"
            onClick={toggleMenu}
            aria-label="Mở menu"
            aria-expanded={isOpen ? 'true' : 'false'}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Modern Gen-Z Logout Overlay */}
      {isLoggingOut && (
        <div className="logout-overlay">
          <div className="logout-content">
            <div className="logout-glitch">⚡ UNIMATCH ⚡</div>
            <div className="logout-text">Đang đăng xuất...</div>
            <div className="logout-emoji">🧹👋🛸</div>
            <div className="logout-sub">Đang dọn dẹp bộ nhớ & bảo mật phiên</div>
          </div>
        </div>
      )}
    </>
  );
}

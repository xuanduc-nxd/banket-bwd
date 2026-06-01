'use client';

import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const CATEGORIES = [
  { id: "cntt", name: "Công nghệ thông tin", color: "#006d9c" },
  { id: "kinhte", name: "Kinh tế - Tài chính", color: "#16a34a" },
  { id: "yte", name: "Y dược - Sức khỏe", color: "#ef4444" },
  { id: "kysu", name: "Kỹ thuật - Công nghiệp", color: "#f59e0b" },
  { id: "sudp", name: "Sư phạm - Giáo dục", color: "#7c3aed" },
  { id: "luat", name: "Luật - Hành chính", color: "#4f46e5" },
  { id: "nn", name: "Ngôn ngữ - Du lịch", color: "#0891b2" },
  { id: "design", name: "Thiết kế - Nghệ thuật", color: "#db2777" },
  { id: "nonglam", name: "Nông - Lâm - Môi trường", color: "#65a30d" },
  { id: "xaydung", name: "Kiến trúc - Xây dựng", color: "#57534e" }
];

// Component MapContent để sử dụng useSearchParams an toàn trong Suspense
function MapContent() {
  const searchParams = useSearchParams();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});

  const [universities, setUniversities] = useState([]);
  const [hasMapKey, setHasMapKey] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  // Bộ lọc
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'public', 'private'
  const [recommendedIds, setRecommendedIds] = useState([]);
  const [selectedUni, setSelectedUni] = useState(null);

  // 1. Fetch data & config
  useEffect(() => {
    const initData = async () => {
      try {
        // Fetch universities
        const uniRes = await fetch('/api/universities');
        const uniData = await uniRes.json();
        setUniversities(uniData);

        // Kiểm tra cấu hình VietMap API Key trên backend
        const keyRes = await fetch('/api/map-key');
        const keyData = await keyRes.json();
        setHasMapKey(keyData.hasKey);

        // Load plan từ localStorage
        const savedPlan = localStorage.getItem('unimatch_strategy_plan');
        if (savedPlan) {
          const parsed = JSON.parse(savedPlan);
          if (parsed && parsed.matches) {
            const ids = Array.from(new Set(parsed.matches.slice(0, 10).map((m) => m.university.id)));
            setRecommendedIds(ids);
          }
        }
      } catch (err) {
        console.error("Lỗi khởi tạo bản đồ:", err);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  // 2. Khởi tạo Bản đồ sau khi Script và Dữ liệu sẵn sàng
  useEffect(() => {
    if (!scriptLoaded || loading || !hasMapKey || !window.vietmapgl || mapRef.current) return;

    try {
      const styleUrl = `/api/vietmap-proxy?url=${encodeURIComponent('https://maps.vietmap.vn/maps/styles/tm/style.json')}`;

      const map = new window.vietmapgl.Map({
        container: mapContainerRef.current,
        style: styleUrl,
        center: [108.2022, 16.0544], // Miền Trung VN
        zoom: 6,
        minZoom: 5,
        maxZoom: 18
      });

      map.addControl(new window.vietmapgl.NavigationControl(), "top-right");

      map.on('load', () => {
        mapRef.current = map;
        setMapReady(true);
      });

      map.on('error', (e) => {
        console.error("Lỗi bản đồ VietMap:", e);
      });
    } catch (e) {
      console.error("Không khởi tạo được VietMap GL JS:", e);
    }
  }, [scriptLoaded, loading, hasMapKey]);

  // 3. Render Markers khi bản đồ sẵn sàng
  useEffect(() => {
    if (!mapReady || !mapRef.current || universities.length === 0) return;

    const map = mapRef.current;

    // Xóa các markers cũ
    Object.values(markersRef.current).forEach(({ marker }) => marker.remove());
    markersRef.current = {};

    // Tạo markers mới
    universities.forEach((uni) => {
      const el = document.createElement('div');
      const bg = uni.type === 'private' ? '#97CADB' : '#018ABE';
      const textCol = uni.type === 'private' ? '#000' : '#fff';
      el.className = 'map-marker-pin';
      el.style.cursor = 'pointer';
      el.innerHTML = `
        <span style="display:grid;place-items:center;width:38px;height:38px;background:${bg};color:${textCol};font-size:9px;font-weight:800;border:2px solid #000;border-radius:4px;box-shadow:3px 3px 0 #000;">
          ${uni.short_name}
        </span>
      `;

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        handleSelectUniversity(uni.id, false);
      });

      const marker = new window.vietmapgl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([uni.lng, uni.lat]);

      markersRef.current[uni.id] = { marker, uni };
    });

    // Zoom đến trường được gửi từ query param
    const targetUniId = searchParams.get('university');
    if (targetUniId) {
      setTimeout(() => {
        handleSelectUniversity(targetUniId, true);
      }, 600);
    } else {
      fitMapBounds(universities);
    }
  }, [mapReady, universities]);

  // 4. Lọc hiển thị Markers trên bản đồ theo bộ lọc tìm kiếm
  const getVisibleUnis = () => {
    const q = searchQuery.toLowerCase().trim();
    return universities.filter(uni => {
      if (recommendedIds.length > 0 && !recommendedIds.includes(uni.id)) return false;
      if (activeFilter !== 'all' && uni.type !== activeFilter) return false;
      if (q) {
        const text = `${uni.name} ${uni.short_name} ${uni.city}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  };

  const visibleUnis = getVisibleUnis();

  // Cập nhật ẩn/hiện marker
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const visibleIds = new Set(visibleUnis.map(u => u.id));

    Object.entries(markersRef.current).forEach(([id, { marker }]) => {
      if (visibleIds.has(id)) {
        marker.addTo(mapRef.current);
      } else {
        marker.remove();
      }
    });

    if (visibleUnis.length > 0 && !selectedUni) {
      fitMapBounds(visibleUnis);
    }
  }, [searchQuery, activeFilter, recommendedIds, mapReady]);

  // Helpers
  const fitMapBounds = (unis) => {
    if (!mapRef.current || unis.length === 0) return;
    const bounds = new window.vietmapgl.LngLatBounds();
    unis.forEach(u => bounds.extend([u.lng, u.lat]));
    mapRef.current.fitBounds(bounds, { padding: 48, maxZoom: 13, duration: 600 });
  };

  const handleSelectUniversity = (id, fly = true) => {
    const uni = universities.find(u => u.id === id);
    if (!uni) return;

    setSelectedUni(uni);

    if (fly && mapRef.current) {
      mapRef.current.flyTo({
        center: [uni.lng, uni.lat],
        zoom: 14,
        duration: 800
      });
    }
  };

  const handleDeselectUniversity = () => {
    setSelectedUni(null);
    fitMapBounds(visibleUnis);
  };

  const clearRecommendation = () => {
    setRecommendedIds([]);
  };

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/@vietmap/vietmap-gl-js@6.0.1/dist/vietmap-gl.css" />
      <Script
        src="https://unpkg.com/@vietmap/vietmap-gl-js@6.0.1/dist/vietmap-gl.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />

      <section className="page-header page-header--compact">
        <div className="container">
          <span className="section-badge">Map</span>
          <h1>Bản đồ trường đại học</h1>
          <p>Hiển thị danh sách trường trên nền tảng bản đồ số <strong>VietMap</strong>.</p>

          <div className="toolbar" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '8px', marginTop: '16px' }}>
            <input
              className="search-input"
              id="mapSearch"
              type="search"
              placeholder="Tìm trường, thành phố..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%' }}
            />
            <button
              type="button"
              className={`chip ${activeFilter === 'all' ? 'is-active' : ''}`}
              onClick={() => { setActiveFilter('all'); setSelectedUni(null); }}
            >
              Tất cả
            </button>
            <button
              type="button"
              className={`chip ${activeFilter === 'public' ? 'is-active' : ''}`}
              onClick={() => { setActiveFilter('public'); setSelectedUni(null); }}
            >
              Công lập
            </button>
            <button
              type="button"
              className={`chip ${activeFilter === 'private' ? 'is-active' : ''}`}
              onClick={() => { setActiveFilter('private'); setSelectedUni(null); }}
            >
              Tư thục
            </button>
          </div>

          {recommendedIds.length > 0 && (
            <div className="recommend-box" style={{ display: 'block', marginTop: '16px', background: '#FFD23F', border: '2px solid #000', borderRadius: '8px', padding: '12px', boxShadow: '3px 3px 0 #000' }}>
              <strong>Đang lọc theo kết quả tư vấn</strong>
              <p style={{ margin: '4px 0 8px 0' }}>Hiển thị các trường trong danh sách nguyện vọng phù hợp của bạn.</p>
              <button className="mini-btn" type="button" onClick={clearRecommendation}>Hiển thị tất cả các trường</button>
            </div>
          )}
        </div>
      </section>

      <section className="section map-page" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="map-layout" style={{ border: '3px solid #000', borderRadius: '12px', overflow: 'hidden', boxShadow: '5px 5px 0 #000', background: '#fff' }}>
            <aside className="map-sidebar">
              <div className="map-sidebar__head">
                <span className="section-badge">Danh sách</span>
                <h2>{visibleUnis.length} trường</h2>
              </div>

              {!selectedUni ? (
                <div className="map-list" style={{ overflowY: 'auto', maxHeight: '400px' }}>
                  {loading ? (
                    <div style={{ padding: '20px' }}>🤖 Đang tải dữ liệu...</div>
                  ) : visibleUnis.length > 0 ? (
                    visibleUnis.map((uni, i) => (
                      <button
                        type="button"
                        className="map-list-item"
                        key={uni.id}
                        onClick={() => handleSelectUniversity(uni.id, true)}
                      >
                        <strong>{uni.name}</strong>
                        <div className="meta-row">
                          <span className={`pill ${uni.type}`}>{uni.type === 'public' ? 'Công lập' : 'Tư thục'}</span>
                          <span className="pill">{uni.city}</span>
                          <span className="pill">{uni.tuition} tr/năm</span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="empty-state" style={{ padding: '20px' }}>Không có trường phù hợp.</div>
                  )}
                </div>
              ) : (
                <div className="map-info-panel" style={{ padding: '16px', background: '#fff', borderTop: '2px solid #000', position: 'relative' }}>
                  <button
                    className="close-info-btn"
                    onClick={handleDeselectUniversity}
                    type="button"
                    style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    ✕
                  </button>
                  <h3 style={{ paddingRight: '28px', marginTop: 0 }}>{selectedUni.name}</h3>
                  <p>{selectedUni.city} — {selectedUni.type === 'public' ? 'Công lập' : 'Tư thục'}</p>
                  <div className="summary-list" style={{ display: 'grid', gap: '6px', margin: '14px 0' }}>
                    <div className="summary-item"><span>Học phí</span><strong>{selectedUni.tuition} triệu/năm</strong></div>
                    <div className="summary-item"><span>Sinh viên</span><strong>{selectedUni.students}</strong></div>
                    <div className="summary-item"><span>Số ngành</span><strong>{selectedUni.majors_count}</strong></div>
                    <div className="summary-item"><span>Nhóm mạnh</span><strong>{selectedUni.categories?.map(c => CATEGORIES.find(cat => cat.id === c)?.name || c).join(", ")}</strong></div>
                  </div>
                  <div className="row-actions">
                    <a className="btn-primary" href={selectedUni.website} target="_blank" rel="noopener noreferrer">Website của trường</a>
                  </div>
                </div>
              )}
            </aside>

            <div className="map-canvas-wrap" style={{ position: 'relative', minHeight: '450px', background: '#e2e8f0' }}>
              {!hasMapKey && !loading && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.9)', padding: '20px', textAlign: 'center', zIndex: 10 }}>
                  <div>
                    <strong>Chưa cấu hình API bản đồ.</strong>
                    <p style={{ margin: '8px 0' }}>Vui lòng thêm biến môi trường <code>VIETMAP_API_KEY</code> vào file <code>.env.local</code>.</p>
                  </div>
                </div>
              )}
              <div ref={mapContainerRef} style={{ width: '100%', height: '100%', minHeight: '450px' }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function MapPage() {
  return (
    <main>
      <React.Suspense fallback={<div className="container" style={{ padding: '40px' }}>Loading Map component...</div>}>
        <MapContent />
      </React.Suspense>
    </main>
  );
}

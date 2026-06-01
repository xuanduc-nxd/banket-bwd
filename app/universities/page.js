'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

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

const INITIAL_LIMIT = 12;

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Bộ lọc
  const [searchQuery, setSearchQuery] = useState('');
  const [type, setType] = useState('all');
  const [region, setRegion] = useState('all');
  const [category, setCategory] = useState('all');
  const [bookmarkFilter, setBookmarkFilter] = useState('all');

  const [bookmarked, setBookmarked] = useState([]);
  const [compare, setCompare] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState('');

  // 1. Lắng nghe trạng thái User và gọi đồng bộ
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === 'SIGNED_OUT') {
        // Đăng xuất: Xóa danh sách yêu thích trên màn hình và local storage
        setBookmarked([]);
        localStorage.removeItem('unimatch_bookmarked_unis');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 2. Fetch danh sách trường và bộ lọc local ban đầu
  useEffect(() => {
    const fetchUnis = async () => {
      try {
        const res = await fetch('/api/universities');
        const data = await res.json();
        setUniversities(data);
      } catch (err) {
        console.error("Lỗi fetch universities:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUnis();

    try {
      setCompare(JSON.parse(localStorage.getItem("unimatch_compare_list") || "[]"));
      setRecentSearches(JSON.parse(localStorage.getItem("unimatch_recent_searches_uni") || "[]"));

      const savedFilters = JSON.parse(localStorage.getItem("unimatch_uni_filters") || "null");
      if (savedFilters) {
        if (savedFilters.query) setSearchQuery(savedFilters.query);
        if (savedFilters.type) setType(savedFilters.type);
        if (savedFilters.region) setRegion(savedFilters.region);
        if (savedFilters.category) setCategory(savedFilters.category);
        if (savedFilters.bookmarkFilter) setBookmarkFilter(savedFilters.bookmarkFilter);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // 3. Logic Đồng bộ hóa Bookmarks khi trạng thái đăng nhập thay đổi
  useEffect(() => {
    const syncBookmarks = async () => {
      // Đọc bookmarks từ localStorage
      const localBookmarks = JSON.parse(localStorage.getItem("unimatch_bookmarked_unis") || "[]");

      if (user) {
        try {
          // Lấy bookmarks từ Database Supabase
          const { data: dbBookmarksData, error } = await supabase
            .from('user_bookmarks')
            .select('university_id')
            .eq('user_id', user.id);

          if (error) throw error;

          const dbBookmarks = dbBookmarksData.map(item => item.university_id);

          // Gộp 2 mảng (loại bỏ trùng lặp)
          const merged = Array.from(new Set([...localBookmarks, ...dbBookmarks]));

          // Tìm xem có bookmark nào ở local chưa được lưu ở database không
          const newToDb = localBookmarks.filter(id => !dbBookmarks.includes(id));
          if (newToDb.length > 0) {
            const insertData = newToDb.map(id => ({
              user_id: user.id,
              university_id: id
            }));
            const { error: insertError } = await supabase
              .from('user_bookmarks')
              .insert(insertData);

            if (insertError) console.error("Lỗi gộp dữ liệu lên database:", insertError.message);
          }

          setBookmarked(merged);
          localStorage.setItem("unimatch_bookmarked_unis", JSON.stringify(merged));
        } catch (err) {
          console.error("Lỗi đồng bộ bookmarks:", err.message);
          // Fallback về local nếu lỗi kết nối
          setBookmarked(localBookmarks);
        }
      } else {
        // Chưa đăng nhập: Chỉ dùng localStorage
        setBookmarked(localBookmarks);
      }
    };

    syncBookmarks();
  }, [user]);

  // Save filters to LocalStorage on change
  useEffect(() => {
    const filters = {
      query: searchQuery,
      type,
      region,
      category,
      bookmarkFilter
    };
    localStorage.setItem("unimatch_uni_filters", JSON.stringify(filters));
  }, [searchQuery, type, region, category, bookmarkFilter]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2000);
  };

  // Logic lọc trường
  const filteredUnis = universities.filter((uni) => {
    if (bookmarkFilter === "bookmarked" && !bookmarked.includes(uni.id)) return false;

    const normQuery = searchQuery.trim().toLowerCase();
    const text = `${uni.name} ${uni.short_name} ${uni.city}`.toLowerCase();
    if (normQuery && !text.includes(normQuery)) return false;
    if (type !== "all" && uni.type !== type) return false;
    if (region !== "all" && uni.region !== region && uni.region !== "all") return false;
    if (category !== "all" && !uni.categories?.includes(category)) return false;

    return true;
  });

  const visibleUnis = isExpanded ? filteredUnis : filteredUnis.slice(0, INITIAL_LIMIT);

  // Bookmark / Lưu trường yêu thích
  const toggleBookmark = async (id) => {
    let updated;
    if (bookmarked.includes(id)) {
      updated = bookmarked.filter(item => item !== id);
      setBookmarked(updated);
      localStorage.setItem("unimatch_bookmarked_unis", JSON.stringify(updated));

      if (user) {
        const { error } = await supabase
          .from('user_bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('university_id', id);

        if (error) console.error("Lỗi xóa bookmark khỏi database:", error.message);
      }
      showToast("Đã bỏ lưu trường này.");
    } else {
      updated = [...bookmarked, id];
      setBookmarked(updated);
      localStorage.setItem("unimatch_bookmarked_unis", JSON.stringify(updated));

      if (user) {
        const { error } = await supabase
          .from('user_bookmarks')
          .insert({
            user_id: user.id,
            university_id: id
          });

        if (error) console.error("Lỗi lưu bookmark vào database:", error.message);
      }
      showToast("Đã lưu trường thành công ❤️");
    }
  };

  // So sánh
  const addCompare = (id) => {
    if (compare.includes(id)) {
      showToast("Trường này đã có trong danh sách so sánh.");
      return;
    }
    if (compare.length >= 3) {
      showToast("Chỉ nên so sánh tối đa 3 trường để dễ ra quyết định.");
      return;
    }
    const updated = [...compare, id];
    setCompare(updated);
    localStorage.setItem("unimatch_compare_list", JSON.stringify(updated));
  };

  const removeCompare = (id) => {
    const updated = compare.filter(item => item !== id);
    setCompare(updated);
    localStorage.setItem("unimatch_compare_list", JSON.stringify(updated));
  };

  const clearCompare = () => {
    setCompare([]);
    localStorage.removeItem("unimatch_compare_list");
  };

  // Recent Searches
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      const clean = searchQuery.trim();
      if (clean && !recentSearches.includes(clean)) {
        const updated = [clean, ...recentSearches.slice(0, 4)];
        setRecentSearches(updated);
        localStorage.setItem("unimatch_recent_searches_uni", JSON.stringify(updated));
      }
    }
  };

  const selectRecentTag = (tag) => {
    setSearchQuery(tag);
    setIsExpanded(false);
  };

  const deleteRecentTag = (e, tag) => {
    e.stopPropagation();
    const updated = recentSearches.filter(t => t !== tag);
    setRecentSearches(updated);
    localStorage.setItem("unimatch_recent_searches_uni", JSON.stringify(updated));
  };

  return (
    <main>
      {toastMessage && <div className="toast show">{toastMessage}</div>}

      <section className="page-header">
        <div className="container">
          <span className="section-badge">Tra cứu</span>
          <h1>Danh sách trường ĐH</h1>
          <p>Lọc, so sánh, bookmark trường học lưu vào Supabase Cloud.</p>

          <div className="toolbar" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '20px' }}>
            <input
              className="search-input"
              id="search"
              type="search"
              placeholder="Tên trường, mã, thành phố..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setIsExpanded(false); }}
              onKeyDown={handleSearchKeyDown}
              style={{ width: '100%' }}
            />
            <select id="type" className="search-input" value={type} onChange={(e) => { setType(e.target.value); setIsExpanded(false); }}>
              <option value="all">Loại trường</option>
              <option value="public">Công lập</option>
              <option value="private">Tư thục</option>
            </select>
            <select id="region" className="search-input" value={region} onChange={(e) => { setRegion(e.target.value); setIsExpanded(false); }}>
              <option value="all">Khu vực</option>
              <option value="north">Miền Bắc</option>
              <option value="central">Miền Trung</option>
              <option value="south">Miền Nam</option>
            </select>
            <select id="category" className="search-input" value={category} onChange={(e) => { setCategory(e.target.value); setIsExpanded(false); }}>
              <option value="all">Nhóm ngành</option>
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <select id="bookmarkFilter" className="search-input" value={bookmarkFilter} onChange={(e) => { setBookmarkFilter(e.target.value); setIsExpanded(false); }}>
              <option value="all">Tất cả trường</option>
              <option value="bookmarked">Trường đã lưu ❤️</option>
            </select>
          </div>

          {recentSearches.length > 0 && (
            <div id="recentSearches" style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Gần đây:</span>
              <div className="chip-grid" style={{ display: 'inline-flex', gap: '6px' }}>
                {recentSearches.map((tag) => (
                  <span className="recent-tag" key={tag} onClick={() => selectRecentTag(tag)}>
                    {tag} <span className="tag-delete" onClick={(e) => deleteRecentTag(e, tag)}>✕</span>
                  </span>
                ))}
              </div>
            </div>
          )}
          <p style={{ marginTop: '16px' }}><strong id="resultCount">{filteredUnis.length} trường</strong></p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="grid-list">
              {[1, 2, 3].map((n) => (
                <div className="skeleton-card" key={n} style={{ minHeight: '180px' }}>
                  <div className="skeleton-line" style={{ width: '30%', height: '16px' }}></div>
                  <div className="skeleton-line skeleton-line--title" style={{ marginTop: '12px', height: '20px', width: '85%' }}></div>
                  <div className="skeleton-list-items" style={{ marginTop: '14px' }}>
                    <div className="skeleton-line" style={{ width: '90%', height: '12px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : visibleUnis.length > 0 ? (
            <div className="grid-list" id="universitiesGrid">
              {visibleUnis.map((uni, index) => {
                const isBookmarked = bookmarked.includes(uni.id);
                return (
                  <article className="university-card is-compact fade-in" key={uni.id} style={{ animationDelay: `${Math.min(index, 8) * 0.04}s` }}>
                    <div className="card-top">
                      <div className={`logo-box ${uni.type === "private" ? "private" : ""}`}>{uni.short_name}</div>
                      <span className={`pill ${uni.type}`}>{uni.type === 'public' ? 'Công lập' : 'Tư thục'}</span>
                    </div>
                    <div className="card-body">
                      <h3>{uni.name}</h3>
                      <div className="summary-list" style={{ marginTop: '8px' }}>
                        <div className="summary-item" style={{ border: 'none', padding: '2px 0' }}><span>TP</span><strong>{uni.city}</strong></div>
                        <div className="summary-item" style={{ border: 'none', padding: '2px 0' }}><span>Ngành</span><strong>{uni.majors_count}</strong></div>
                        <div className="summary-item" style={{ border: 'none', padding: '2px 0' }}><span>SV</span><strong>{uni.students}</strong></div>
                        <div className="summary-item" style={{ border: 'none', padding: '2px 0' }}><span>Phí</span><strong>{uni.tuition} tr/năm</strong></div>
                      </div>
                    </div>
                    <div className="card-actions">
                      <a className="mini-btn" href={uni.website} target="_blank" rel="noopener noreferrer">Web</a>
                      <Link className="mini-btn" href={`/map?university=${encodeURIComponent(uni.id)}`}>Map</Link>
                      <button className="mini-btn" onClick={() => addCompare(uni.id)}>So sánh</button>
                      <button className="mini-btn" onClick={() => toggleBookmark(uni.id)}>
                        {isBookmarked ? "Đã lưu ❤️" : "Lưu ♡"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-state" style={{ padding: '40px', border: '3px dashed #000', borderRadius: '12px', background: '#fff', textAlign: 'center' }}>
              Không tìm thấy trường phù hợp với bộ lọc.
            </div>
          )}

          {!loading && filteredUnis.length > visibleUnis.length && (
            <div className="load-more-wrapper" style={{ marginTop: '24px', textAlign: 'center' }}>
              <button className="load-more-btn" onClick={() => setIsExpanded(true)}>
                Xem thêm ({filteredUnis.length - visibleUnis.length} trường khác)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Dock So sánh */}
      <div className={`compare-dock ${compare.length > 0 ? 'is-visible' : ''}`} id="compareDock">
        <div>
          <strong>So sánh trường ({compare.length}/3)</strong>
          <div className="dock-items" id="compareItems">
            {compare.map((id) => {
              const shortName = universities.find(u => u.id === id)?.short_name || id;
              return (
                <span className="pill" key={id} style={{ marginRight: '6px', background: '#FFD23F', color: '#000', border: '1.5px solid #000' }}>
                  {shortName} <span style={{ cursor: 'pointer', marginLeft: '6px', fontWeight: 'bold' }} onClick={() => removeCompare(id)}>✕</span>
                </span>
              );
            })}
          </div>
        </div>
        <div className="row-actions">
          <button className="btn-ghost" onClick={clearCompare}>Xóa</button>
          <button className="btn-primary" onClick={() => setIsCompareModalOpen(true)}>So sánh</button>
        </div>
      </div>

      {/* Modal So sánh */}
      {isCompareModalOpen && (
        <div className="modal is-open" id="compareModal" onClick={(e) => { if (e.target.id === 'compareModal') setIsCompareModalOpen(false); }}>
          <div className="modal-card">
            <div className="modal-header">
              <span>Bảng so sánh trường học</span>
              <button className="mini-btn" style={{ background: 'var(--sage-green)', color: 'var(--ink)' }} onClick={() => setIsCompareModalOpen(false)}>
                Đóng
              </button>
            </div>
            <div className="modal-body" id="modalBody">
              <div style={{ overflowX: 'auto' }}>
                <table className="compare-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px' }}>
                  <thead>
                    <tr>
                      <th style={{ background: '#D6E8EE', border: '2px solid #000', padding: '10px' }}>Tiêu chí</th>
                      {compare.map((id) => {
                        const u = universities.find(item => item.id === id);
                        return <th key={id} style={{ background: '#FFD23F', border: '2px solid #000', padding: '10px' }}>{u?.short_name}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ border: '2px solid #000', padding: '10px', fontWeight: 'bold' }}>Tên trường</td>
                      {compare.map((id) => {
                        const u = universities.find(item => item.id === id);
                        return <td key={id} style={{ border: '2px solid #000', padding: '10px' }}>{u?.name}</td>;
                      })}
                    </tr>
                    <tr>
                      <td style={{ border: '2px solid #000', padding: '10px', fontWeight: 'bold' }}>Loại trường</td>
                      {compare.map((id) => {
                        const u = universities.find(item => item.id === id);
                        return <td key={id} style={{ border: '2px solid #000', padding: '10px' }}>{u?.type === 'public' ? 'Công lập' : 'Tư thục'}</td>;
                      })}
                    </tr>
                    <tr>
                      <td style={{ border: '2px solid #000', padding: '10px', fontWeight: 'bold' }}>Khu vực / Tỉnh thành</td>
                      {compare.map((id) => {
                        const u = universities.find(item => item.id === id);
                        return <td key={id} style={{ border: '2px solid #000', padding: '10px' }}>{u?.city}</td>;
                      })}
                    </tr>
                    <tr>
                      <td style={{ border: '2px solid #000', padding: '10px', fontWeight: 'bold' }}>Học phí trung bình</td>
                      {compare.map((id) => {
                        const u = universities.find(item => item.id === id);
                        return <td key={id} style={{ border: '2px solid #000', padding: '10px' }}>{u?.tuition} triệu/năm</td>;
                      })}
                    </tr>
                    <tr>
                      <td style={{ border: '2px solid #000', padding: '10px', fontWeight: 'bold' }}>Quy mô sinh viên</td>
                      {compare.map((id) => {
                        const u = universities.find(item => item.id === id);
                        return <td key={id} style={{ border: '2px solid #000', padding: '10px' }}>{u?.students}</td>;
                      })}
                    </tr>
                    <tr>
                      <td style={{ border: '2px solid #000', padding: '10px', fontWeight: 'bold' }}>Số lượng ngành</td>
                      {compare.map((id) => {
                        const u = universities.find(item => item.id === id);
                        return <td key={id} style={{ border: '2px solid #000', padding: '10px' }}>{u?.majors_count}</td>;
                      })}
                    </tr>
                    <tr>
                      <td style={{ border: '2px solid #000', padding: '10px', fontWeight: 'bold' }}>Nhóm ngành giảng dạy</td>
                      {compare.map((id) => {
                        const u = universities.find(item => item.id === id);
                        const names = u?.categories?.map((catId) => CATEGORIES.find(c => c.id === catId)?.name || catId);
                        return <td key={id} style={{ border: '2px solid #000', padding: '10px' }}>{names?.join(', ')}</td>;
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

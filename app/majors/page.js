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

const QUIZ_QUESTIONS = [
  {
    text: "Bạn thích kiểu công việc nào nhất?",
    options: [
      { text: "Phân tích, lập trình, làm việc với dữ liệu", scores: { cntt: 3, kysu: 1 } },
      { text: "Giao tiếp, kinh doanh, xây dựng thương hiệu", scores: { kinhte: 3, nn: 1 } },
      { text: "Chăm sóc con người và sức khỏe", scores: { yte: 3, sudp: 1 } },
      { text: "Sáng tạo hình ảnh, không gian, sản phẩm", scores: { design: 3, xaydung: 2 } }
    ]
  },
  {
    text: "Môn học hoặc năng lực nào bạn tự tin hơn?",
    options: [
      { text: "Toán, Tin học, tư duy logic", scores: { cntt: 3, kysu: 2 } },
      { text: "Văn, Ngoại ngữ, giao tiếp", scores: { nn: 3, luat: 2 } },
      { text: "Sinh, Hóa, kiến thức sức khỏe", scores: { yte: 3, nonglam: 2 } },
      { text: "Mỹ thuật, thiết kế, quan sát", scores: { design: 3, xaydung: 2 } }
    ]
  },
  {
    text: "Bạn ưu tiên điều gì sau khi tốt nghiệp?",
    options: [
      { text: "Thu nhập cao và thị trường tăng trưởng", scores: { cntt: 3, yte: 2, kinhte: 1 } },
      { text: "Công việc ổn định, có ý nghĩa xã hội", scores: { sudp: 3, yte: 2, luat: 1 } },
      { text: "Môi trường năng động, nhiều cơ hội kinh doanh", scores: { kinhte: 3, nn: 1 } },
      { text: "Tạo sản phẩm hữu hình, công trình hoặc thiết kế", scores: { kysu: 2, xaydung: 3, design: 2 } }
    ]
  }
];

const TRENDS = [
  { title: "AI và dữ liệu", text: "Nhu cầu nhân lực tăng nhanh, phù hợp học sinh mạnh Toán - Tin.", tag: "Hot" },
  { title: "An toàn thông tin", text: "Doanh nghiệp số hóa kéo theo nhu cầu bảo mật hệ thống.", tag: "Tăng trưởng" },
  { title: "Kinh tế số", text: "Marketing số, thương mại điện tử và phân tích kinh doanh tiếp tục mở rộng.", tag: "Ổn định cao" }
];

export default function MajorsPage() {
  const [majors, setMajors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState(10);
  const [bookmarkFilter, setBookmarkFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [bookmarked, setBookmarked] = useState([]);
  const [compare, setCompare] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Trạng thái Quiz
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScores, setQuizScores] = useState({});

  // Show more
  const [majorsExpanded, setMajorsExpanded] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState('');

  // Lắng nghe trạng thái đăng nhập để xóa danh sách yêu thích/so sánh khi đăng xuất
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setBookmarked([]);
        setCompare([]);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // 1. Fetch majors từ API
    const fetchMajors = async () => {
      try {
        const res = await fetch('/api/majors');
        const data = await res.json();
        setMajors(data);
      } catch (err) {
        console.error("Lỗi fetch majors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMajors();

    // 2. Load LocalStorage
    try {
      setBookmarked(JSON.parse(localStorage.getItem("unimatch_bookmarked_majors") || "[]"));
      setCompare(JSON.parse(localStorage.getItem("unimatch_compare_majors") || "[]"));
      setRecentSearches(JSON.parse(localStorage.getItem("unimatch_recent_searches_major") || "[]"));

      const savedFilters = JSON.parse(localStorage.getItem("unimatch_major_filters") || "null");
      if (savedFilters) {
        if (savedFilters.query) setSearchQuery(savedFilters.query);
        if (savedFilters.difficulty) setDifficulty(Number(savedFilters.difficulty));
        if (savedFilters.selectedCategory) setSelectedCategory(savedFilters.selectedCategory);
        if (savedFilters.bookmarkFilter) setBookmarkFilter(savedFilters.bookmarkFilter);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save filters to LocalStorage on change
  useEffect(() => {
    const filters = {
      query: searchQuery,
      difficulty,
      selectedCategory,
      bookmarkFilter
    };
    localStorage.setItem("unimatch_major_filters", JSON.stringify(filters));
  }, [searchQuery, difficulty, selectedCategory, bookmarkFilter]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2000);
  };

  // Tìm kiếm & Lọc
  const filteredMajors = majors.filter((major) => {
    const text = `${major.name} ${major.description} ${major.careers?.join(" ")}`.toLowerCase();
    if (searchQuery && !text.includes(searchQuery.toLowerCase())) return false;
    if (selectedCategory !== "all" && major.category !== selectedCategory) return false;
    if (major.difficulty > difficulty) return false;
    if (bookmarkFilter === "bookmarked" && !bookmarked.includes(major.id)) return false;
    return true;
  });

  const visibleMajors = majorsExpanded ? filteredMajors : filteredMajors.slice(0, 9);

  // Bookmark
  const toggleBookmark = (id) => {
    let updated;
    if (bookmarked.includes(id)) {
      updated = bookmarked.filter(item => item !== id);
      showToast("Đã bỏ lưu ngành học này.");
    } else {
      updated = [...bookmarked, id];
      showToast("Đã lưu ngành học thành công ❤️");
    }
    setBookmarked(updated);
    localStorage.setItem("unimatch_bookmarked_majors", JSON.stringify(updated));
  };

  // So sánh
  const addCompare = (id) => {
    if (compare.includes(id)) {
      showToast("Ngành này đã có trong danh sách so sánh.");
      return;
    }
    if (compare.length >= 3) {
      showToast("Chỉ so sánh tối đa 3 ngành để bảng dễ đọc.");
      return;
    }
    const updated = [...compare, id];
    setCompare(updated);
    localStorage.setItem("unimatch_compare_majors", JSON.stringify(updated));
  };

  const removeCompare = (id) => {
    const updated = compare.filter(item => item !== id);
    setCompare(updated);
    localStorage.setItem("unimatch_compare_majors", JSON.stringify(updated));
  };

  const clearCompare = () => {
    setCompare([]);
    localStorage.removeItem("unimatch_compare_majors");
  };

  // Recent Searches
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      const clean = searchQuery.trim();
      if (clean && !recentSearches.includes(clean)) {
        const updated = [clean, ...recentSearches.slice(0, 4)];
        setRecentSearches(updated);
        localStorage.setItem("unimatch_recent_searches_major", JSON.stringify(updated));
      }
    }
  };

  const selectRecentTag = (tag) => {
    setSearchQuery(tag);
    setMajorsExpanded(false);
  };

  const deleteRecentTag = (e, tag) => {
    e.stopPropagation();
    const updated = recentSearches.filter(t => t !== tag);
    setRecentSearches(updated);
    localStorage.setItem("unimatch_recent_searches_major", JSON.stringify(updated));
  };

  // Quiz
  const handleQuizAnswer = (optionScores) => {
    const newScores = { ...quizScores };
    Object.entries(optionScores).forEach(([id, score]) => {
      newScores[id] = (newScores[id] || 0) + score;
    });
    setQuizScores(newScores);
    setQuizIndex(quizIndex + 1);
  };

  const applyQuizResults = (topCatId) => {
    setSelectedCategory(topCatId);
    setMajorsExpanded(false);
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setQuizScores({});
  };

  const getQuizResult = () => {
    const sorted = Object.entries(quizScores).sort((a, b) => b[1] - a[1]).slice(0, 3);
    return sorted;
  };

  return (
    <main>
      {toastMessage && <div className="toast show">{toastMessage}</div>}

      <section className="section majors-page">
        <div className="container">
          <div className="major-top-panel">
            {/* Bộ lọc */}
            <aside className="filter-panel major-top-panel__filter">
              <div className="field">
                <label htmlFor="search">Tìm ngành</label>
                <input
                  id="search"
                  type="search"
                  placeholder="AI, Marketing, Y khoa..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setMajorsExpanded(false); }}
                  onKeyDown={handleSearchKeyDown}
                />
                {recentSearches.length > 0 && (
                  <div style={{ marginTop: '8px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Gần đây:</span>
                    <div className="chip-grid" style={{ gap: '4px' }}>
                      {recentSearches.map((tag) => (
                        <span className="recent-tag" key={tag} onClick={() => selectRecentTag(tag)}>
                          {tag} <span className="tag-delete" onClick={(e) => deleteRecentTag(e, tag)}>✕</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="field" style={{ marginTop: '14px' }}>
                <label htmlFor="difficulty">Độ khó tối đa</label>
                <select id="difficulty" value={difficulty} onChange={(e) => { setDifficulty(Number(e.target.value)); setMajorsExpanded(false); }}>
                  <option value="10">Tất cả</option>
                  <option value="6">Dễ — TB</option>
                  <option value="8">Khá khó</option>
                </select>
              </div>
              <div className="field" style={{ marginTop: '14px' }}>
                <label htmlFor="bookmarkFilter">Lọc yêu thích</label>
                <select id="bookmarkFilter" value={bookmarkFilter} onChange={(e) => { setBookmarkFilter(e.target.value); setMajorsExpanded(false); }}>
                  <option value="all">Tất cả ngành</option>
                  <option value="bookmarked">Ngành đã lưu ❤️</option>
                </select>
              </div>
              <div style={{ marginTop: '16px' }}>
                <span className="field-label">Nhóm ngành</span>
                <div className="chip-grid" id="categoryChips" style={{ marginTop: '10px' }}>
                  <button
                    className={`chip ${selectedCategory === 'all' ? 'is-active' : ''}`}
                    onClick={() => { setSelectedCategory('all'); setMajorsExpanded(false); }}
                  >
                    Tất cả
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      className={`chip ${selectedCategory === cat.id ? 'is-active' : ''}`}
                      onClick={() => { setSelectedCategory(cat.id); setMajorsExpanded(false); }}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Quiz định hướng */}
            <div className="major-top-panel__quiz">
              <div className="quiz-box" id="quizBox">
                {quizIndex < QUIZ_QUESTIONS.length ? (
                  <>
                    <h3>Trắc nghiệm định hướng ({quizIndex + 1}/{QUIZ_QUESTIONS.length})</h3>
                    <p>{QUIZ_QUESTIONS[quizIndex].text}</p>
                    <div className="quiz-options" style={{ display: 'grid', gap: '8px' }}>
                      {QUIZ_QUESTIONS[quizIndex].options.map((opt, i) => (
                        <button
                          key={i}
                          className="quiz-option btn-ghost"
                          style={{ border: '2px solid #000', borderRadius: '8px', padding: '10px', fontWeight: 'bold' }}
                          onClick={() => handleQuizAnswer(opt.scores)}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h3>Kết quả định hướng</h3>
                    <p>Ba nhóm ngành nổi bật nhất theo câu trả lời của bạn:</p>
                    <div className="meta-row" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                      {getQuizResult().map(([id, score]) => {
                        const name = CATEGORIES.find(c => c.id === id)?.name || id;
                        return (
                          <span className="pill" key={id} style={{ background: '#FFD23F', color: '#000', fontWeight: 'bold' }}>
                            {name}: {score} điểm
                          </span>
                        );
                      })}
                    </div>
                    <div className="row-actions" style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className="btn-primary"
                        onClick={() => applyQuizResults(getQuizResult()[0]?.[0] || 'all')}
                      >
                        Lọc nhóm cao nhất
                      </button>
                      <button className="btn-ghost" onClick={restartQuiz}>Làm lại</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Catalog Ngành học */}
          <div className="majors-catalog">
            <div className="section-header">
              <div>
                <span className="section-badge">Catalog</span>
                <h2>Danh sách ngành học</h2>
              </div>
              <strong id="majorCount">{filteredMajors.length} ngành</strong>
            </div>

            {loading ? (
              <div className="grid-list">
                {[1, 2, 3].map((n) => (
                  <div className="skeleton-card" key={n} style={{ minHeight: '220px' }}>
                    <div className="skeleton-line" style={{ width: '30%', height: '16px' }}></div>
                    <div className="skeleton-line skeleton-line--title" style={{ marginTop: '12px', height: '20px', width: '85%' }}></div>
                    <div className="skeleton-list-items" style={{ marginTop: '14px' }}>
                      <div className="skeleton-line" style={{ width: '90%', height: '12px' }}></div>
                      <div className="skeleton-line" style={{ width: '85%', height: '12px' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : visibleMajors.length > 0 ? (
              <div className="grid-list">
                {visibleMajors.map((major, index) => {
                  const cat = CATEGORIES.find((c) => c.id === major.category);
                  const isBookmarked = bookmarked.includes(major.id);
                  return (
                    <article className="major-card fade-in" key={major.id} style={{ animationDelay: `${Math.min(index, 8) * 0.04}s` }}>
                      <div className="card-top">
                        <span className="pill" style={{ color: cat?.color || '#000', background: '#f8fafc' }}>
                          {cat?.name || major.category}
                        </span>
                        <span className="pill">Độ khó {major.difficulty}/10</span>
                      </div>
                      <div className="card-body">
                        <h3>{major.name}</h3>
                        <p>{major.description}</p>
                        <div className="meta-row">
                          <span className="pill">Lương: {major.salary}</span>
                          <span className="pill">Việc làm: {major.employment}%</span>
                          <span className="pill">{major.combos?.join(", ")}</span>
                        </div>
                        <p style={{ marginTop: '8px', fontSize: '13px' }}>
                          <strong>Nghề nghiệp:</strong> {major.careers?.join(", ")}
                        </p>
                      </div>
                      <div className="card-actions">
                        <button className="mini-btn" onClick={() => addCompare(major.id)}>So sánh</button>
                        <button className="mini-btn" onClick={() => toggleBookmark(major.id)}>
                          {isBookmarked ? "Đã lưu ❤️" : "Lưu ♡"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state" style={{ padding: '40px', border: '3px dashed #000', borderRadius: '12px', background: '#fff', textAlign: 'center' }}>
                Không tìm thấy ngành phù hợp. Thử thay đổi từ khóa hoặc bộ lọc khó.
              </div>
            )}

            {!loading && filteredMajors.length > visibleMajors.length && (
              <div className="majors-show-more-wrap" style={{ marginTop: '24px', textAlign: 'center' }}>
                <button type="button" className="btn-secondary" onClick={() => setMajorsExpanded(true)}>
                  Xem thêm ({filteredMajors.length - visibleMajors.length} ngành)
                </button>
              </div>
            )}
          </div>

          {/* Xu hướng */}
          <div className="majors-trending">
            <div className="section-header" style={{ marginTop: '48px' }}>
              <div>
                <span className="section-badge">Trending</span>
                <h2>Nhóm nổi bật</h2>
              </div>
            </div>
            <div className="trend-grid">
              {TRENDS.map((item, i) => (
                <article className="tool-card trend-card" key={i}>
                  <span className="pill fit">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dock So sánh */}
      <div className={`compare-dock ${compare.length > 0 ? 'is-visible' : ''}`} id="compareDock">
        <div>
          <strong>So sánh ngành ({compare.length}/3)</strong>
          <div className="dock-items" id="compareItems">
            {compare.map((id) => {
              const name = majors.find(m => m.id === id)?.name || id;
              return (
                <span className="pill" key={id} style={{ marginRight: '6px', background: '#FFD23F', color: '#000', border: '1.5px solid #000' }}>
                  {name} <span style={{ cursor: 'pointer', marginLeft: '6px', fontWeight: 'bold' }} onClick={() => removeCompare(id)}>✕</span>
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
              <span>Bảng so sánh ngành học</span>
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
                        const m = majors.find(item => item.id === id);
                        return <th key={id} style={{ background: '#FFD23F', border: '2px solid #000', padding: '10px' }}>{m?.name}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ border: '2px solid #000', padding: '10px', fontWeight: 'bold' }}>Nhóm ngành</td>
                      {compare.map((id) => {
                        const m = majors.find(item => item.id === id);
                        const catName = CATEGORIES.find(c => c.id === m?.category)?.name || m?.category;
                        return <td key={id} style={{ border: '2px solid #000', padding: '10px' }}>{catName}</td>;
                      })}
                    </tr>
                    <tr>
                      <td style={{ border: '2px solid #000', padding: '10px', fontWeight: 'bold' }}>Mức lương</td>
                      {compare.map((id) => {
                        const m = majors.find(item => item.id === id);
                        return <td key={id} style={{ border: '2px solid #000', padding: '10px' }}>{m?.salary}</td>;
                      })}
                    </tr>
                    <tr>
                      <td style={{ border: '2px solid #000', padding: '10px', fontWeight: 'bold' }}>Cơ hội việc làm</td>
                      {compare.map((id) => {
                        const m = majors.find(item => item.id === id);
                        return <td key={id} style={{ border: '2px solid #000', padding: '10px' }}>{m?.employment}%</td>;
                      })}
                    </tr>
                    <tr>
                      <td style={{ border: '2px solid #000', padding: '10px', fontWeight: 'bold' }}>Độ khó</td>
                      {compare.map((id) => {
                        const m = majors.find(item => item.id === id);
                        return <td key={id} style={{ border: '2px solid #000', padding: '10px' }}>{m?.difficulty}/10</td>;
                      })}
                    </tr>
                    <tr>
                      <td style={{ border: '2px solid #000', padding: '10px', fontWeight: 'bold' }}>Tổ hợp xét tuyển</td>
                      {compare.map((id) => {
                        const m = majors.find(item => item.id === id);
                        return <td key={id} style={{ border: '2px solid #000', padding: '10px' }}>{m?.combos?.join(", ")}</td>;
                      })}
                    </tr>
                    <tr>
                      <td style={{ border: '2px solid #000', padding: '10px', fontWeight: 'bold' }}>Nghề nghiệp đầu ra</td>
                      {compare.map((id) => {
                        const m = majors.find(item => item.id === id);
                        return <td key={id} style={{ border: '2px solid #000', padding: '10px' }}>{m?.careers?.join(", ")}</td>;
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

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabase';

const SUBJECT_GROUPS = {
  A00: ["Toán", "Vật lý", "Hóa học"],
  A01: ["Toán", "Vật lý", "Tiếng Anh"],
  B00: ["Toán", "Hóa học", "Sinh học"],
  C00: ["Ngữ văn", "Lịch sử", "Địa lý"],
  C03: ["Ngữ văn", "Toán", "Lịch sử"],
  D01: ["Toán", "Ngữ văn", "Tiếng Anh"],
  D07: ["Toán", "Hóa học", "Tiếng Anh"],
  D08: ["Toán", "Sinh học", "Tiếng Anh"],
  D14: ["Ngữ văn", "Lịch sử", "Tiếng Anh"],
  V00: ["Toán", "Vật lý", "Vẽ mỹ thuật"],
  H00: ["Ngữ văn", "Năng khiếu vẽ 1", "Năng khiếu vẽ 2"]
};

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

export default function Home() {
  const [step, setStep] = useState(1);
  const [combination, setCombination] = useState('');
  const [scores, setScores] = useState({});
  const [interests, setInterests] = useState([]);
  const [region, setRegion] = useState('all');
  const [schoolType, setSchoolType] = useState('all');
  const [maxTuition, setMaxTuition] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'safe', 'fit', 'reach'
  const [toastMessage, setToastMessage] = useState('');

  const [user, setUser] = useState(null);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const [isSyncCompleted, setIsSyncCompleted] = useState(false);

  // 1. Lắng nghe trạng thái Auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (!currentUser) {
        setIsSyncCompleted(true);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (event === 'SIGNED_OUT') {
        // Đăng xuất: Xóa toàn bộ dữ liệu trên màn hình và local storage
        localStorage.removeItem('unimatch_strategy_plan');
        localStorage.removeItem('unimatch_form_draft');
        setCombination('');
        setScores({});
        setInterests([]);
        setRegion('all');
        setSchoolType('all');
        setMaxTuition('');
        setResults(null);
        setStep(1);
        setActiveTab('all');
        setIsSyncCompleted(true);
      } else if (event === 'SIGNED_IN') {
        setIsSyncCompleted(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 2. Tự động khôi phục bản thảo hoặc kế hoạch đã tạo từ localStorage ban đầu (trước khi đăng nhập)
  useEffect(() => {
    const savedPlan = localStorage.getItem('unimatch_strategy_plan');
    if (savedPlan) {
      try {
        const parsed = JSON.parse(savedPlan);
        if (parsed && parsed.matches) {
          setResults(parsed);
          setCombination(parsed.profile.combination || '');
          setScores(parsed.profile.scores || {});
          setInterests(parsed.profile.interests || []);
          setRegion(parsed.profile.region || 'all');
          setSchoolType(parsed.profile.schoolType || 'all');
          setMaxTuition(parsed.profile.maxTuition || '');
          setStep(4);
          setIsInitialLoaded(true);
          return;
        }
      } catch (e) {
        console.error("Lỗi đọc plan cũ:", e);
      }
    }

    const draftStr = localStorage.getItem('unimatch_form_draft');
    if (draftStr) {
      try {
        const draft = JSON.parse(draftStr);
        if (draft && draft.profile) {
          setCombination(draft.profile.combination || '');
          setScores(draft.profile.scores || {});
          setInterests(draft.profile.interests || []);
          setRegion(draft.profile.region || 'all');
          setSchoolType(draft.profile.schoolType || 'all');
          setMaxTuition(draft.profile.maxTuition || '');
          setStep(draft.step || 1);
        }
      } catch (e) {
        console.error("Lỗi đọc draft cũ:", e);
      }
    }
    setIsInitialLoaded(true);
  }, []);

  // 3. Logic Đồng bộ hóa Bản nháp và Plan từ Database khi đăng nhập
  useEffect(() => {
    const syncDrafts = async () => {
      if (!user) {
        setIsSyncCompleted(true);
        return;
      }

      setIsSyncCompleted(false);

      try {
        const { data, error } = await supabase
          .from('user_drafts')
          .select('draft_data')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) throw error;

        const dbData = data?.draft_data;
        const localDraft = localStorage.getItem('unimatch_form_draft');
        const localPlan = localStorage.getItem('unimatch_strategy_plan');

        let finalDraft = localDraft ? JSON.parse(localDraft) : null;
        let finalPlan = localPlan ? JSON.parse(localPlan) : null;

        if (dbData) {
          // Database có dữ liệu -> Đè vào local storage và các state
          finalDraft = dbData.formDraft || null;
          finalPlan = dbData.strategyPlan || null;

          if (finalPlan) {
            localStorage.setItem('unimatch_strategy_plan', JSON.stringify(finalPlan));
            localStorage.removeItem('unimatch_form_draft');
            setResults(finalPlan);
            setCombination(finalPlan.profile.combination || '');
            setScores(finalPlan.profile.scores || {});
            setInterests(finalPlan.profile.interests || []);
            setRegion(finalPlan.profile.region || 'all');
            setSchoolType(finalPlan.profile.schoolType || 'all');
            setMaxTuition(finalPlan.profile.maxTuition || '');
            setStep(4);
          } else if (finalDraft) {
            localStorage.setItem('unimatch_form_draft', JSON.stringify(finalDraft));
            localStorage.removeItem('unimatch_strategy_plan');
            setResults(null);
            setCombination(finalDraft.profile.combination || '');
            setScores(finalDraft.profile.scores || {});
            setInterests(finalDraft.profile.interests || []);
            setRegion(finalDraft.profile.region || 'all');
            setSchoolType(finalDraft.profile.schoolType || 'all');
            setMaxTuition(finalDraft.profile.maxTuition || '');
            setStep(finalDraft.step || 1);
          }
        } else {
          // Database trống nhưng Local có -> Đẩy dữ liệu Local lên Database
          if (localDraft || localPlan) {
            await supabase.from('user_drafts').upsert({
              user_id: user.id,
              draft_data: {
                formDraft: finalDraft,
                strategyPlan: finalPlan,
                updatedAt: new Date().toISOString()
              },
              updated_at: new Date().toISOString()
            });
          }
        }
      } catch (err) {
        console.error("Lỗi đồng bộ bản nháp:", err.message);
      } finally {
        setIsSyncCompleted(true);
      }
    };

    syncDrafts();
  }, [user]);

  // 4. Lưu bản thảo form (Local & DB) khi thay đổi cấu hình
  useEffect(() => {
    if (!isInitialLoaded || !isSyncCompleted) return;
    if (!combination) return; // Không lưu nháp nếu chưa chọn tổ hợp (tránh ghi đè khi reset/logout)

    const saveDraftLocalAndDb = async () => {
      if (step < 4) {
        const draft = {
          step,
          profile: { combination, scores, interests, region, schoolType, maxTuition }
        };
        localStorage.setItem('unimatch_form_draft', JSON.stringify(draft));

        if (user) {
          try {
            await supabase.from('user_drafts').upsert({
              user_id: user.id,
              draft_data: {
                formDraft: draft,
                strategyPlan: null,
                updatedAt: new Date().toISOString()
              },
              updated_at: new Date().toISOString()
            });
          } catch (err) {
            console.error("Lỗi lưu nháp lên DB:", err.message);
          }
        }
      }
    };

    saveDraftLocalAndDb();
  }, [step, combination, scores, interests, region, schoolType, maxTuition, user, isInitialLoaded, isSyncCompleted]);

  // Audio tone helper
  const playTone = (type) => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    try {
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;
      if (type === 'transition') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1100, now + 0.12);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.13);
      } else if (type === 'success') {
        const playNode = (freq, start, duration) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, start);
          gain.gain.setValueAtTime(0.03, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(start);
          osc.stop(start + duration);
        };
        playNode(523.25, now, 0.1);
        playNode(659.25, now + 0.06, 0.14);
        playNode(783.99, now + 0.12, 0.2);
      }
    } catch (e) {}
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2400);
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!combination) {
        showToast("Bạn cần chọn tổ hợp xét tuyển trước.");
        return;
      }
      // Khởi tạo điểm cho các môn thi
      const subjects = SUBJECT_GROUPS[combination] || [];
      const newScores = { ...scores };
      subjects.forEach(s => {
        if (newScores[s] === undefined) newScores[s] = '';
      });
      setScores(newScores);
    }

    if (step === 2) {
      const subjects = SUBJECT_GROUPS[combination] || [];
      const invalid = subjects.some(s => {
        const val = Number(scores[s]);
        return isNaN(val) || val < 0 || val > 10 || scores[s] === '';
      });
      if (invalid) {
        showToast("Điểm từng môn cần nằm trong khoảng 0 đến 10.");
        return;
      }
    }

    playTone('transition');
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    playTone('transition');
    setStep(step - 1);
  };

  const handleInterestToggle = (id) => {
    if (interests.includes(id)) {
      setInterests(interests.filter(item => item !== id));
    } else {
      setInterests([...interests, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (interests.length === 0) {
      showToast("Bạn nên chọn ít nhất một lĩnh vực quan tâm để kết quả sát hơn.");
      return;
    }

    setLoading(true);
    playTone('success');
    setStep(4);

    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          combination,
          scores,
          interests,
          region,
          schoolType,
          maxTuition: Number(maxTuition || 0)
        })
      });
      const data = await response.json();
      setResults(data);
      localStorage.setItem('unimatch_strategy_plan', JSON.stringify(data));
      localStorage.removeItem('unimatch_form_draft');

      if (user) {
        try {
          await supabase.from('user_drafts').upsert({
            user_id: user.id,
            draft_data: {
              formDraft: null,
              strategyPlan: data,
              updatedAt: new Date().toISOString()
            },
            updated_at: new Date().toISOString()
          });
        } catch (err) {
          console.error("Lỗi lưu kết quả lên DB:", err.message);
        }
      }
    } catch (error) {
      showToast("Có lỗi kết nối đến cơ sở dữ liệu. Thử lại sau.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const restartPlan = async () => {
    localStorage.removeItem('unimatch_strategy_plan');
    localStorage.removeItem('unimatch_form_draft');
    setCombination('');
    setScores({});
    setInterests([]);
    setRegion('all');
    setSchoolType('all');
    setMaxTuition('');
    setResults(null);
    setStep(1);
    setActiveTab('all');

    if (user) {
      try {
        await supabase.from('user_drafts').delete().eq('user_id', user.id);
      } catch (err) {
        console.error("Lỗi xóa bản nháp trên database:", err.message);
      }
    }
  };

  const totalScore = Object.values(scores).reduce((sum, val) => sum + Number(val || 0), 0);

  // Lọc kết quả theo Tab (An toàn / Phù hợp / Thử thách) để sửa Bug 1
  const filteredMatches = results?.matches
    ? results.matches.filter(m => activeTab === 'all' || m.risk.id === activeTab)
    : [];

  // Đếm số lượng của từng nhóm nguyện vọng trong kết quả
  const counts = results?.matches?.reduce((acc, m) => {
    acc[m.risk.id] = (acc[m.risk.id] || 0) + 1;
    return acc;
  }, { safe: 0, fit: 0, reach: 0 }) || { safe: 0, fit: 0, reach: 0 };

  return (
    <main>
      {toastMessage && <div className="toast show">{toastMessage}</div>}

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-card brutal-card">
            <span className="eyebrow">Gen-Z college strategy</span>
            <h1 className="hero-headline">
              UNIMATCH:
              <span>HACK SỐ PHẬN,</span>
              <span>CHỌN ĐÚNG TRƯỜNG.</span>
            </h1>
            <p className="hero-lead">
              Không phải danh sách trường vô tri — UniMatch chia nguyện vọng theo tỷ lệ 30/50/20: an toàn, chuẩn, và
              dream. Dữ liệu thực, lý do rõ ràng, kết nối trực tiếp đến Supabase Database.
            </p>
            <div className="hero-actions">
              <a className="btn-primary" href="#match">Bắt đầu ngay</a>
              <Link className="btn-secondary" href="/majors">Khám phá ngành</Link>
            </div>
          </div>

          <aside className="insight-panel">
            <p className="panel-title">Chiến lược 30 · 50 · 20</p>
            <div className="strategy-stack">
              <div className="strategy-card">
                <span className="strategy-dot safe"></span>
                <div><strong>An toàn</strong><span>Điểm cao hơn ngưỡng ≥ 2</span></div>
                <b>30%</b>
              </div>
              <div className="strategy-card">
                <span className="strategy-dot fit"></span>
                <div><strong>Sweet spot</strong><span>Đúng ngành, đúng điểm</span></div>
                <b>50%</b>
              </div>
              <div className="strategy-card">
                <span className="strategy-dot reach"></span>
                <div><strong>Dream</strong><span>Thử thách, tính rủi ro</span></div>
                <b>20%</b>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Smart Match Section */}
      <section className="section" id="match">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-badge">Smart Match</span>
              <h2>Tạo chiến lược nguyện vọng</h2>
              <p>4 bước — kết quả hiện trong Aspiration Matrix với 3 khối bất đối xứng 30/50/20.</p>
            </div>
          </div>

          <div className="smart-card">
            <div className="steps">
              <div className={`step-tab ${step === 1 ? 'is-active' : ''} ${step > 1 ? 'is-done' : ''}`}><span className="step-number">1</span> Tổ hợp</div>
              <div className={`step-tab ${step === 2 ? 'is-active' : ''} ${step > 2 ? 'is-done' : ''}`}><span className="step-number">2</span> Điểm</div>
              <div className={`step-tab ${step === 3 ? 'is-active' : ''} ${step > 3 ? 'is-done' : ''}`}><span className="step-number">3</span> Lọc</div>
              <div className={`step-tab ${step === 4 ? 'is-active' : ''}`}><span className="step-number">4</span> Matrix</div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Bước 1: Chọn tổ hợp */}
              {step === 1 && (
                <section className="form-step is-active">
                  <div className="form-grid">
                    <div className="field full">
                      <label htmlFor="combination">Tổ hợp xét tuyển</label>
                      <select
                        id="combination"
                        value={combination}
                        onChange={(e) => setCombination(e.target.value)}
                        required
                      >
                        <option value="">Chọn tổ hợp môn</option>
                        {Object.entries(SUBJECT_GROUPS).map(([code, subjects]) => (
                          <option key={code} value={code}>
                            {code} - {subjects.join(", ")}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-actions">
                    <button className="btn-primary" type="button" onClick={handleNextStep}>Tiếp tục →</button>
                  </div>
                </section>
              )}

              {/* Bước 2: Nhập điểm */}
              {step === 2 && (
                <section className="form-step is-active">
                  <span className="field-label">Nhập điểm từng môn ({combination})</span>
                  <div className="score-grid">
                    {(SUBJECT_GROUPS[combination] || []).map((subject, index) => (
                      <div className="field" key={subject}>
                        <label htmlFor={`score${index}`}>{subject}</label>
                        <input
                          id={`score${index}`}
                          type="number"
                          min="0"
                          max="10"
                          step="0.01"
                          placeholder="0.00"
                          value={scores[subject] || ''}
                          onChange={(e) => setScores({ ...scores, [subject]: e.target.value })}
                          required
                        />
                      </div>
                    ))}
                  </div>
                  <div className="score-total">
                    Tổng điểm: {(Object.values(scores).reduce((sum, v) => sum + Number(v || 0), 0)).toFixed(2)} / 30
                  </div>
                  <div className="form-actions">
                    <button className="btn-ghost" type="button" onClick={handlePrevStep}>← Quay lại</button>
                    <button className="btn-primary" type="button" onClick={handleNextStep}>Tiếp tục →</button>
                  </div>
                </section>
              )}

              {/* Bước 3: Lọc dữ liệu */}
              {step === 3 && (
                <section className="form-step is-active">
                  <div className="form-grid">
                    <div className="field full">
                      <span className="field-label">Lĩnh vực bạn quan tâm</span>
                      <div className="chip-grid">
                        {CATEGORIES.map((category) => (
                          <label
                            className={`chip ${interests.includes(category.id) ? 'checked' : ''}`}
                            key={category.id}
                            style={{ '--chip-color': category.color }}
                          >
                            <input
                              type="checkbox"
                              name="interest"
                              value={category.id}
                              checked={interests.includes(category.id)}
                              onChange={() => handleInterestToggle(category.id)}
                            />
                            {category.name}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="field">
                      <label htmlFor="region">Khu vực ưu tiên</label>
                      <select id="region" value={region} onChange={(e) => setRegion(e.target.value)}>
                        <option value="all">Toàn quốc</option>
                        <option value="north">Miền Bắc</option>
                        <option value="central">Miền Trung</option>
                        <option value="south">Miền Nam</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="schoolType">Loại trường</label>
                      <select id="schoolType" value={schoolType} onChange={(e) => setSchoolType(e.target.value)}>
                        <option value="all">Không giới hạn</option>
                        <option value="public">Công lập</option>
                        <option value="private">Tư thục</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="maxTuition">Học phí tối đa/năm (triệu)</label>
                      <input
                        id="maxTuition"
                        type="number"
                        min="0"
                        step="1"
                        placeholder="VD: 30"
                        value={maxTuition}
                        onChange={(e) => setMaxTuition(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button className="btn-ghost" type="button" onClick={handlePrevStep}>← Quay lại</button>
                    <button className="btn-primary" type="submit">Chạy Matrix →</button>
                  </div>
                </section>
              )}

              {/* Bước 4: Hiển thị kết quả */}
              {step === 4 && (
                <section className="form-step is-active">
                  <div className="results-layout">
                    <div className="results-main">
                      <div className="aspiration-matrix-wrap brutal-card" style={{ background: 'var(--white)' }}>
                        <div className="section-header" style={{ marginBottom: '16px' }}>
                          <div>
                            <span className="section-badge">Kết quả</span>
                            <h2 style={{ margin: 0 }}>Ma trận nguyện vọng</h2>
                          </div>
                        </div>

                        {/* Thanh bộ lọc Tab sửa lỗi cắt cụt hiển thị (Bug 1 Fix) */}
                        <div className="matrix-tabs" style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            className={`mini-btn ${activeTab === 'all' ? 'is-active' : ''}`}
                            onClick={() => setActiveTab('all')}
                            style={{ background: activeTab === 'all' ? '#018ABE' : '#fff', color: activeTab === 'all' ? '#fff' : '#000' }}
                          >
                            🚀 Tất cả ({results?.matches?.length || 0})
                          </button>
                          <button
                            type="button"
                            className={`mini-btn ${activeTab === 'safe' ? 'is-active' : ''}`}
                            onClick={() => setActiveTab('safe')}
                            style={{ background: activeTab === 'safe' ? '#38B000' : '#fff', color: activeTab === 'safe' ? '#fff' : '#000' }}
                          >
                            🟢 An toàn ({counts.safe})
                          </button>
                          <button
                            type="button"
                            className={`mini-btn ${activeTab === 'fit' ? 'is-active' : ''}`}
                            onClick={() => setActiveTab('fit')}
                            style={{ background: activeTab === 'fit' ? '#FFD23F' : '#fff', color: '#000' }}
                          >
                            🟡 Phù hợp ({counts.fit})
                          </button>
                          <button
                            type="button"
                            className={`mini-btn ${activeTab === 'reach' ? 'is-active' : ''}`}
                            onClick={() => setActiveTab('reach')}
                            style={{ background: activeTab === 'reach' ? '#ef4444' : '#fff', color: activeTab === 'reach' ? '#fff' : '#000' }}
                          >
                            🔴 Thử thách ({counts.reach})
                          </button>
                        </div>

                        {loading ? (
                          <div className="results-list">
                            <div className="matrix-loading-status" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '12px', color: 'var(--spruce-green)' }}>
                              🤖 Đang chạy ma trận tuyển sinh từ Supabase...
                            </div>
                            <div className="skeleton-result-card">
                              <div className="skeleton-line" style={{ width: '25%', height: '10px' }}></div>
                              <div className="skeleton-line" style={{ width: '70%', height: '18px', marginTop: '8px' }}></div>
                              <div className="skeleton-metrics" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', margin: '12px 0' }}>
                                <div className="skeleton-metric" style={{ height: '46px', background: '#e2e8f0', borderRadius: '6px' }}></div>
                                <div className="skeleton-metric" style={{ height: '46px', background: '#e2e8f0', borderRadius: '6px' }}></div>
                              </div>
                              <div className="skeleton-line" style={{ width: '90%', height: '12px' }}></div>
                            </div>
                          </div>
                        ) : filteredMatches.length > 0 ? (
                          <div className="results-list">
                            {filteredMatches.map((match, i) => (
                              <article className="uni-card fade-in" key={match.id}>
                                <div className="uni-card__rank">#{i + 1}</div>
                                <h4 className="uni-card__title">
                                  {match.major.name}{' '}
                                  <span
                                    className={`badge-risk ${match.risk.id}`}
                                    style={{
                                      fontSize: '11px',
                                      padding: '3px 8px',
                                      borderRadius: '20px',
                                      border: '1.5px solid #000',
                                      marginLeft: '8px',
                                      display: 'inline-block',
                                      fontWeight: '700',
                                      background: match.risk.id === 'safe' ? '#38B000' : match.risk.id === 'fit' ? '#FFD23F' : '#ef4444',
                                      color: match.risk.id === 'fit' ? '#000' : '#fff'
                                    }}
                                  >
                                    {match.risk.label}
                                  </span>
                                </h4>
                                <p className="uni-card__school">{match.university.name} ({match.university.short_name}) · {match.university.city}</p>
                                <div className="uni-card__metrics">
                                  <div className="metric">
                                    <span className="tag tag--blue">Điểm chuẩn '25</span>
                                    <strong>{match.cutoff.toFixed(1)}</strong>
                                  </div>
                                  <div className="metric">
                                    <span className="tag tag--green">Học phí</span>
                                    <strong>{match.university.tuition} triệu/năm</strong>
                                  </div>
                                </div>
                                <p className="uni-card__why">{match.reason}</p>
                                <div className="uni-card__foot">
                                  <span className="match-pct">{match.score}% match</span>
                                  <div className="card-actions">
                                    <a className="mini-btn" href={match.university.website} target="_blank" rel="noopener noreferrer">Web</a>
                                    <Link className="mini-btn" href={`/map?university=${encodeURIComponent(match.university.id)}`}>Map</Link>
                                  </div>
                                </div>
                              </article>
                            ))}
                          </div>
                        ) : (
                          <div className="empty-state">Không có trường gợi ý phù hợp cho bộ lọc này.</div>
                        )}
                      </div>
                    </div>

                    <div className="results-sidebar">
                      <aside className="side-summary">
                        {results && (
                          <div className="summary-list">
                            <div className="summary-item"><span>Tổ hợp</span><strong>{results.profile.combination}</strong></div>
                            <div className="summary-item"><span>Tổng điểm</span><strong>{results.totalScore.toFixed(2)}</strong></div>
                            <div className="summary-item"><span>Khu vực</span><strong>{region === 'all' ? 'Toàn quốc' : region === 'north' ? 'Miền Bắc' : region === 'central' ? 'Miền Trung' : 'Miền Nam'}</strong></div>
                            <div className="summary-item"><span>An toàn 🟢</span><strong>{counts.safe}</strong></div>
                            <div className="summary-item"><span>Phù hợp 🟡</span><strong>{counts.fit}</strong></div>
                            <div className="summary-item"><span>Thử thách 🔴</span><strong>{counts.reach}</strong></div>
                          </div>
                        )}
                      </aside>

                      <div className="results-footer">
                        <Link className="btn-secondary" href="/map">Xem bản đồ</Link>
                        <button className="btn-ghost" type="button" onClick={restartPlan}>Làm lại từ đầu</button>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section" id="about">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-badge">Vì sao khác?</span>
              <h2>Không corporate. Có cơ sở.</h2>
              <p>Giải thích điểm, xu hướng chuẩn, học phí — để bạn tự tin điền NV thay vì đoán mò.</p>
            </div>
          </div>
          <div className="trend-grid">
            <article className="tool-card trend-card">
              <span className="pill safe">01</span>
              <h3>30/50/20 split</h3>
              <p>Ma trận 3 khối bất đối xứng — không nhồi một list dài vô nghĩa.</p>
            </article>
            <article className="tool-card trend-card">
              <span className="pill fit">02</span>
              <h3>Minh bạch</h3>
              <p>Mỗi gợi ý có học phí, benchmark score và text giải thích chi tiết.</p>
            </article>
            <article className="tool-card trend-card">
              <span className="pill reach">03</span>
              <h3>Supabase-first</h3>
              <p>Dữ liệu được lưu trữ tập trung trên PostgreSQL đám mây, bảo mật và đồng bộ.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

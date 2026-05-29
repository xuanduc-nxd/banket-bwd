(function () {
  "use strict";

  const DATA = window.UniMatchData;
  const STORAGE_PLAN = "unimatch_strategy_plan";

  function $(selector, root = document) {
    return root.querySelector(selector);
  }

  function $all(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function toast(message) {
    const old = $(".toast");
    if (old) old.remove();

    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => el.remove(), 220);
    }, 2400);
  }

  function initNav() {
    const toggle = $(".nav-toggle");
    const nav = $(".site-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", nav.classList.contains("is-open") ? "true" : "false");
    });
  }

  function initPageTransitions() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link || !link.href) return;
      
      try {
        const url = new URL(link.href);
        const isSameOrigin = url.origin === location.origin;
        const isSamePage = url.pathname === location.pathname;
        const isHash = url.hash && isSamePage;
        const isBlank = link.target === '_blank';
        const isDownload = link.hasAttribute('download');
        
        if (isSameOrigin && !isHash && !isBlank && !isDownload && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          document.body.classList.add('is-exiting');
          setTimeout(() => {
            window.location.href = link.href;
          }, 250);
        }
      } catch (err) {}
    });
  }


  function classify(delta) {
    if (delta >= 2) return { id: "safe", label: "An toàn" };
    if (delta >= -1) return { id: "fit", label: "Phù hợp" };
    return { id: "reach", label: "Thử thách" };
  }

  function categoryMatchBonus(major, interests) {
    if (!interests.length) return 8;
    return interests.includes(major.category) ? 22 : 0;
  }

  function regionBonus(university, region) {
    if (!region || region === "all") return 8;
    if (university.region === "all") return 7;
    return university.region === region ? 12 : -4;
  }

  function tuitionBonus(university, maxTuition) {
    if (!maxTuition) return 6;
    if (university.tuition <= maxTuition) return 12;
    const over = university.tuition - maxTuition;
    return Math.max(-12, 4 - over * 0.8);
  }

  function calculateMatches(profile) {
    const matches = [];
    const totalScore = Object.values(profile.scores).reduce((sum, value) => sum + Number(value || 0), 0);

    DATA.universities.forEach((university) => {
      Object.entries(university.cutoffs).forEach(([majorId, cutoffs]) => {
        const major = DATA.getMajor(majorId);
        if (!major) return;
        if (!major.combos.includes(profile.combination)) return;
        
        // Lọc theo khu vực nếu người dùng có chọn cụ thể
        if (profile.region !== "all" && university.region !== "all" && university.region !== profile.region) return;

        const cutoff = cutoffs[2025] || cutoffs[2024] || cutoffs[2023];
        const delta = totalScore - cutoff;
        const risk = classify(delta);
        const trend = DATA.getTrend(cutoffs);
        const trendPenalty = trend === "Tăng" ? -4 : trend === "Giảm" ? 5 : 2;

        let score = 58 + delta * 8;
        score += categoryMatchBonus(major, profile.interests);
        score += regionBonus(university, profile.region);
        score += tuitionBonus(university, profile.maxTuition);
        score += trendPenalty;
        score = Math.max(1, Math.min(99, Math.round(score)));

        matches.push({
          id: `${university.id}-${major.id}`,
          university,
          major,
          cutoff,
          cutoffs,
          delta,
          risk,
          trend,
          score,
          reason: buildReason(profile, university, major, delta, risk, trend)
        });
      });
    });

    return matches
      .sort((a, b) => b.score - a.score || b.delta - a.delta)
      .slice(0, 18);
  }

  function buildReason(profile, university, major, delta, risk, trend) {
    const diffText = delta >= 0
      ? `cao hơn điểm tham khảo ${delta.toFixed(1)} điểm`
      : `thấp hơn điểm tham khảo ${Math.abs(delta).toFixed(1)} điểm`;
    const category = DATA.getCategory(major.category)?.name || "ngành phù hợp";
    const regionText = profile.region === "all" || !profile.region
      ? "không giới hạn khu vực"
      : `ưu tiên khu vực ${regionLabel(profile.region)}`;

    return `Điểm của bạn ${diffText}, ngành thuộc nhóm ${category}, trường ở ${university.city}, ${regionText}. Xu hướng điểm chuẩn: ${trend.toLowerCase()}.`;
  }

  function regionLabel(region) {
    return {
      north: "miền Bắc",
      central: "miền Trung",
      south: "miền Nam",
      all: "toàn quốc"
    }[region] || "toàn quốc";
  }

  function getPlan() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_PLAN) || "null");
    } catch (error) {
      return null;
    }
  }

  function savePlan(plan) {
    localStorage.setItem(STORAGE_PLAN, JSON.stringify(plan));
  }

  function clearPlan() {
    localStorage.removeItem(STORAGE_PLAN);
  }

  function formatDelta(delta) {
    if (delta > 0) return `+${delta.toFixed(1)}`;
    return delta.toFixed(1);
  }

  function renderResultCard(match, index) {
    const isInPages = window.location.pathname.includes("/pages/");
    const mapPath = isInPages ? "map.html" : "pages/map.html";
    const mapHref = `${mapPath}?university=${encodeURIComponent(match.university.id)}`;
    const reasonShort = match.reason.length > 120 ? `${match.reason.slice(0, 117)}…` : match.reason;

    return `
      <article class="uni-card fade-in" style="animation-delay: ${Math.min(index, 8) * 0.04}s">
        <div class="uni-card__rank">#${index + 1}</div>
        <h4 class="uni-card__title">${match.major.name}</h4>
        <p class="uni-card__school">${match.university.shortName} · ${match.university.city}</p>
        <div class="uni-card__metrics">
          <div class="metric">
            <span class="tag tag--blue">Benchmark '25</span>
            <strong>${match.cutoff.toFixed(1)}</strong>
          </div>
          <div class="metric">
            <span class="tag tag--green">Học phí</span>
            <strong>${DATA.money(match.university.tuition)}</strong>
          </div>
        </div>
        <p class="uni-card__why">${reasonShort}</p>
        <div class="uni-card__foot">
          <span class="match-pct">${match.score}% match</span>
          <div class="card-actions">
            <a class="mini-btn" href="${match.university.website}" target="_blank" rel="noopener">Web</a>
            <a class="mini-btn" href="${mapHref}">Map</a>
          </div>
        </div>
      </article>
    `;
  }

  function renderResultsMatrix(matches) {
    const listEl = $("#resultsList");
    if (!listEl) return;

    const safeMatches = matches.filter((m) => m.risk.id === "safe");
    const empty = '<div class="empty-state">Không có trường gợi ý phù hợp (An toàn).</div>';

    listEl.innerHTML = safeMatches.length
      ? safeMatches.map((m, i) => renderResultCard(m, i)).join("")
      : empty;
  }

  function clearResultsMatrix() {
    const el = $("#resultsList");
    if (el) el.innerHTML = '<div class="empty-state">Chưa có lựa chọn nào.</div>';
  }

  function renderPlanSummary(plan, container) {
    if (!container || !plan) return;
    const counts = plan.matches.reduce((acc, item) => {
      acc[item.risk.id] = (acc[item.risk.id] || 0) + 1;
      return acc;
    }, {});

    container.innerHTML = `
      <div class="summary-list">
        <div class="summary-item"><span>Tổ hợp</span><strong>${plan.profile.combination}</strong></div>
        <div class="summary-item"><span>Tổng điểm</span><strong>${plan.totalScore.toFixed(2)}</strong></div>
        <div class="summary-item"><span>Khu vực</span><strong>${regionLabel(plan.profile.region)}</strong></div>
        <div class="summary-item"><span>Số trường gợi ý (An toàn)</span><strong>${counts.safe || 0}</strong></div>
      </div>
    `;
  }

  function initSmartMatch() {
    const form = $("#strategyForm");
    if (!form) return;

    const stepEls = $all(".form-step");
    const tabs = $all(".step-tab");
    const combination = $("#combination");
    const scoreGrid = $("#scoreGrid");
    const totalEl = $("#scoreTotal");
    const summary = $("#resultSummary");
    let step = 1;

    Object.entries(DATA.subjects).forEach(([code, subjects]) => {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = `${code} - ${subjects.join(", ")}`;
      combination.appendChild(option);
    });

    DATA.categories.forEach((category) => {
      const label = document.createElement("label");
      label.className = "chip";
      label.innerHTML = `<input type="checkbox" name="interest" value="${category.id}"> ${category.name}`;
      $("#interestGrid").appendChild(label);
    });

    function saveDraft() {
      if (step === 4) return;
      const draft = {
        step,
        profile: getProfile()
      };
      localStorage.setItem("unimatch_form_draft", JSON.stringify(draft));
    }

    function go(next) {
      step = Math.max(1, Math.min(4, next));
      stepEls.forEach((el) => el.classList.toggle("is-active", Number(el.dataset.step) === step));
      tabs.forEach((tab) => {
        const tabStep = Number(tab.dataset.step);
        tab.classList.toggle("is-active", tabStep === step);
        tab.classList.toggle("is-done", tabStep < step);
      });
      saveDraft();
      $(".smart-card").scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function renderScores() {
      const subjects = DATA.subjects[combination.value] || [];
      scoreGrid.innerHTML = subjects.map((subject, index) => `
        <div class="field">
          <label for="score${index}">${subject}</label>
          <input id="score${index}" name="${subject}" type="number" min="0" max="10" step="0.01" placeholder="0.00" required>
        </div>
      `).join("");
      $all("input", scoreGrid).forEach((input) => input.addEventListener("input", updateTotal));
      updateTotal();
    }

    function updateTotal() {
      const values = $all("input", scoreGrid).map((input) => Number(input.value || 0));
      const total = values.reduce((sum, value) => sum + value, 0);
      totalEl.textContent = `${total.toFixed(2)} / 30`;
    }

    function getProfile() {
      const scores = {};
      $all("input", scoreGrid).forEach((input) => {
        scores[input.name] = Number(input.value || 0);
      });

      return {
        combination: combination.value,
        scores,
        interests: $all('input[name="interest"]:checked').map((input) => input.value),
        region: $("#region").value,
        maxTuition: Number($("#maxTuition").value || 0),
        schoolType: $("#schoolType").value
      };
    }

    function validateStep(current) {
      if (current === 1 && !combination.value) {
        toast("Bạn cần chọn tổ hợp xét tuyển trước.");
        return false;
      }

      if (current === 2) {
        const inputs = $all("input", scoreGrid);
        const ok = inputs.length && inputs.every((input) => {
          const value = Number(input.value);
          return !Number.isNaN(value) && value >= 0 && value <= 10;
        });
        if (!ok) toast("Điểm từng môn cần nằm trong khoảng 0 đến 10.");
        return ok;
      }

      if (current === 3 && !$all('input[name="interest"]:checked').length) {
        toast("Bạn nên chọn ít nhất một lĩnh vực quan tâm để kết quả sát hơn.");
        return false;
      }

      return true;
    }

    combination.addEventListener("change", renderScores);

    $all("[data-next]").forEach((button) => {
      button.addEventListener("click", () => {
        if (!validateStep(step)) return;
        if (step === 1) renderScores();
        go(step + 1);
      });
    });

    $all("[data-prev]").forEach((button) => {
      button.addEventListener("click", () => go(step - 1));
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateStep(3)) return;

      const profile = getProfile();
      let matches = calculateMatches(profile);
      if (profile.schoolType !== "all") {
        matches = matches.filter((item) => item.university.type === profile.schoolType);
      }

      const totalScore = Object.values(profile.scores).reduce((sum, value) => sum + Number(value || 0), 0);
      const plan = {
        createdAt: new Date().toISOString(),
        profile,
        totalScore,
        matches
      };

      savePlan(plan);
      localStorage.removeItem("unimatch_form_draft");

      const listEl = $("#resultsList");
      if (listEl) {
        listEl.innerHTML = `
          <div class="matrix-loading-status" style="font-family:var(--font-display);font-weight:700;margin-bottom:12px;color:var(--spruce-green);animation:skeleton-pulse 1.2s infinite ease-in-out;">
            🤖 Đang chạy ma trận tuyển sinh 30/50/20...
          </div>
          <div class="skeleton-result-card">
            <div class="skeleton-line" style="width: 25%; height: 10px;"></div>
            <div class="skeleton-line" style="width: 70%; height: 18px; margin-top: 8px;"></div>
            <div class="skeleton-line" style="width: 45%; height: 12px;"></div>
            <div class="skeleton-metrics" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:12px 0;">
              <div class="skeleton-metric" style="height:46px;background:#e2e8f0;border-radius:6px;animation:skeleton-pulse 1.2s infinite ease-in-out;"></div>
              <div class="skeleton-metric" style="height:46px;background:#e2e8f0;border-radius:6px;animation:skeleton-pulse 1.2s infinite ease-in-out;"></div>
            </div>
            <div class="skeleton-line" style="width: 90%; height: 12px;"></div>
            <div class="skeleton-line" style="width: 75%; height: 12px;"></div>
          </div>
          <div class="skeleton-result-card">
            <div class="skeleton-line" style="width: 20%; height: 10px;"></div>
            <div class="skeleton-line" style="width: 60%; height: 18px; margin-top: 8px;"></div>
            <div class="skeleton-line" style="width: 40%; height: 12px;"></div>
            <div class="skeleton-metrics" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:12px 0;">
              <div class="skeleton-metric" style="height:46px;background:#e2e8f0;border-radius:6px;animation:skeleton-pulse 1.2s infinite ease-in-out;"></div>
              <div class="skeleton-metric" style="height:46px;background:#e2e8f0;border-radius:6px;animation:skeleton-pulse 1.2s infinite ease-in-out;"></div>
            </div>
            <div class="skeleton-line" style="width: 85%; height: 12px;"></div>
            <div class="skeleton-line" style="width: 65%; height: 12px;"></div>
          </div>
        `;
      }

      if (summary) {
        summary.innerHTML = `
          <div style="text-align:center;padding:12px;font-family:var(--font-display);font-weight:700;color:var(--ink);animation:skeleton-pulse 1.2s infinite ease-in-out;">
            Tính điểm match...
          </div>
        `;
      }

      go(4);

      setTimeout(() => {
        if (matches.length) {
          renderResultsMatrix(matches);
        } else {
          clearResultsMatrix();
          if (listEl) {
            listEl.innerHTML = `<div class="empty-state">Không có kết quả. Thử nới học phí hoặc khu vực.</div>`;
          }
        }
        renderPlanSummary(plan, summary);
      }, 700);
    });

    $("#restartPlan")?.addEventListener("click", () => {
      clearPlan();
      localStorage.removeItem("unimatch_form_draft");
      form.reset();
      scoreGrid.innerHTML = "";
      totalEl.textContent = "0.00 / 30";
      clearResultsMatrix();
      summary.innerHTML = "";
      go(1);
    });

    // Auto-save form draft on any input change
    form.addEventListener("input", saveDraft);
    form.addEventListener("change", saveDraft);

    const saved = getPlan();
    if (saved?.matches?.length) {
      renderResultsMatrix(saved.matches);
      renderPlanSummary(saved, summary);
      go(4);
    } else {
      const draftStr = localStorage.getItem("unimatch_form_draft");
      if (draftStr) {
        try {
          const draft = JSON.parse(draftStr);
          if (draft && draft.profile) {
            // Restore combination
            combination.value = draft.profile.combination || "";
            if (combination.value) {
              renderScores();
              // Restore scores
              const inputs = $all("input", scoreGrid);
              inputs.forEach((input) => {
                if (draft.profile.scores && draft.profile.scores[input.name] !== undefined) {
                  input.value = draft.profile.scores[input.name];
                }
              });
              updateTotal();
            }

            // Restore interests
            if (Array.isArray(draft.profile.interests)) {
              $all('input[name="interest"]').forEach((cb) => {
                cb.checked = draft.profile.interests.includes(cb.value);
              });
            }

            // Restore other filters
            $("#region").value = draft.profile.region || "all";
            $("#schoolType").value = draft.profile.schoolType || "all";
            $("#maxTuition").value = draft.profile.maxTuition || "";

            // Restore step manually to avoid screen scroll and saveDraft triggers
            if (draft.step && draft.step >= 1 && draft.step <= 3) {
              step = draft.step;
              stepEls.forEach((el) => el.classList.toggle("is-active", Number(el.dataset.step) === step));
              tabs.forEach((tab) => {
                const tabStep = Number(tab.dataset.step);
                tab.classList.toggle("is-active", tabStep === step);
                tab.classList.toggle("is-done", tabStep < step);
              });
            }
          }
        } catch (e) {
          console.error("Error restoring draft", e);
        }
      }
    }
  }

  window.UniMatch = {
    $,
    $all,
    toast,
    initNav,
    calculateMatches,
    renderResultCard,
    renderResultsMatrix,
    renderPlanSummary,
    getPlan,
    savePlan,
    clearPlan,
    classify,
    regionLabel,
    formatDelta,
    STORAGE_PLAN
  };

  document.addEventListener("DOMContentLoaded", () => {
    initPageTransitions();
    initNav();
    initSmartMatch();
  });
})();

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
      <article class="uni-card">
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
    const safeEl = $("#resultsSafe");
    const fitEl = $("#resultsFit");
    const reachEl = $("#resultsReach");
    if (!safeEl || !fitEl || !reachEl) return;

    const buckets = { safe: [], fit: [], reach: [] };
    matches.forEach((m) => {
      if (buckets[m.risk.id]) buckets[m.risk.id].push(m);
    });

    const limits = { safe: 4, fit: 6, reach: 3 };
    const empty = '<div class="empty-state">Chưa có lựa chọn trong vùng này.</div>';

    [["safe", safeEl], ["fit", fitEl], ["reach", reachEl]].forEach(([key, el]) => {
      const list = buckets[key].slice(0, limits[key]);
      el.innerHTML = list.length
        ? list.map((m, i) => renderResultCard(m, i)).join("")
        : empty;
    });
  }

  function clearResultsMatrix() {
    const empty = '<div class="empty-state">Chưa có lựa chọn trong vùng này.</div>';
    ["#resultsSafe", "#resultsFit", "#resultsReach"].forEach((sel) => {
      const el = $(sel);
      if (el) el.innerHTML = empty;
    });
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
        <div class="summary-item"><span>An toàn (30%)</span><strong>${counts.safe || 0}</strong></div>
        <div class="summary-item"><span>Sweet spot (50%)</span><strong>${counts.fit || 0}</strong></div>
        <div class="summary-item"><span>Dream (20%)</span><strong>${counts.reach || 0}</strong></div>
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

    function go(next) {
      step = Math.max(1, Math.min(4, next));
      stepEls.forEach((el) => el.classList.toggle("is-active", Number(el.dataset.step) === step));
      tabs.forEach((tab) => {
        const tabStep = Number(tab.dataset.step);
        tab.classList.toggle("is-active", tabStep === step);
        tab.classList.toggle("is-done", tabStep < step);
      });
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
      if (matches.length) {
        renderResultsMatrix(matches);
      } else {
        clearResultsMatrix();
        const fitEl = $("#resultsFit");
        if (fitEl) {
          fitEl.innerHTML = `<div class="empty-state">Không có kết quả. Thử nới học phí hoặc khu vực.</div>`;
        }
      }
      renderPlanSummary(plan, summary);
      go(4);
    });

    $("#restartPlan")?.addEventListener("click", () => {
      clearPlan();
      form.reset();
      scoreGrid.innerHTML = "";
      totalEl.textContent = "0.00 / 30";
      clearResultsMatrix();
      summary.innerHTML = "";
      go(1);
    });

    const saved = getPlan();
    if (saved?.matches?.length) {
      renderResultsMatrix(saved.matches);
      renderPlanSummary(saved, summary);
      go(4);
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

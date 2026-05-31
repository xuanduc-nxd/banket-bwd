(function () {
  "use strict";

  const DATA = window.UniMatchData;
  const UI = window.UniMatch;
  let selectedCategory = "all";
  let compare = [];
  try {
    compare = JSON.parse(localStorage.getItem("unimatch_compare_majors") || "[]");
  } catch (e) {
    compare = [];
  }

  let bookmarked = [];
  try {
    bookmarked = JSON.parse(localStorage.getItem("unimatch_bookmarked_majors") || "[]");
  } catch (e) {
    bookmarked = [];
  }

  let recentSearches = [];
  try {
    recentSearches = JSON.parse(localStorage.getItem("unimatch_recent_searches_major") || "[]");
  } catch (e) {
    recentSearches = [];
  }
  let quizIndex = 0;
  let quizScores = {};
  let majorsExpanded = false;
  const MAX_VISIBLE_ROWS = 3;

  const questions = [
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

  function renderCategories() {
    const box = UI.$("#categoryChips");
    box.innerHTML = `<button class="chip is-active" data-category="all">Tất cả</button>` + DATA.categories
      .map((cat) => `<button class="chip" data-category="${cat.id}">${cat.name}</button>`)
      .join("");

    UI.$all("[data-category]", box).forEach((button) => {
      button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;
        UI.$all("[data-category]", box).forEach((item) => item.classList.toggle("is-active", item === button));
        majorsExpanded = false;
        renderMajors();
      });
    });
  }

  function renderMajors() {
    const query = UI.$("#search").value.trim().toLowerCase();
    const difficulty = Number(UI.$("#difficulty").value || 10);
    const bookmarkFilter = UI.$("#bookmarkFilter") ? UI.$("#bookmarkFilter").value : "all";

    const list = DATA.majors.filter((major) => {
      const text = `${major.name} ${major.description} ${major.careers.join(" ")}`.toLowerCase();
      if (query && !text.includes(query)) return false;
      if (selectedCategory !== "all" && major.category !== selectedCategory) return false;
      if (major.difficulty > difficulty) return false;
      if (bookmarkFilter === "bookmarked" && !bookmarked.includes(major.id)) return false;
      return true;
    });

    UI.$("#majorCount").textContent = `${list.length} ngành`;
    UI.$("#majorsGrid").innerHTML = list.length ? list.map((major, index) => majorCard(major, index)).join("") : `<div class="empty-state">Không tìm thấy ngành phù hợp.</div>`;
    UI.$all("[data-compare]").forEach((button) => button.addEventListener("click", () => addCompare(button.dataset.compare)));
    UI.$all("[data-bookmark]").forEach((button) => button.addEventListener("click", () => toggleBookmark(button.dataset.bookmark)));
    applyMajorsRowLimit();
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }

  function applyMajorsRowLimit() {
    requestAnimationFrame(() => {
      requestAnimationFrame(applyMajorsRowLimitNow);
    });
  }

  function applyMajorsRowLimitNow() {
    const wrap = UI.$("#majorsGridWrap");
    const grid = UI.$("#majorsGrid");
    const showMoreWrap = UI.$(".majors-show-more-wrap");
    const showMoreBtn = UI.$("#showMoreMajors");
    const cards = [...grid.querySelectorAll(".major-card")];

    if (!cards.length) {
      wrap.style.maxHeight = "";
      wrap.classList.remove("majors-grid-wrap--collapsed");
      showMoreWrap.classList.add("is-hidden");
      if (typeof AOS !== 'undefined') AOS.refresh();
      return;
    }

    if (majorsExpanded) {
      wrap.style.maxHeight = "";
      wrap.classList.remove("majors-grid-wrap--collapsed");
      showMoreWrap.classList.add("is-hidden");
      cards.forEach((card) => { card.style.display = ""; });
      if (typeof AOS !== 'undefined') AOS.refresh();
      return;
    }

    cards.forEach((card) => { card.style.display = ""; });

    const rowTops = [...new Set(cards.map((card) => card.offsetTop))].sort((a, b) => a - b);
    const visibleTops = new Set(rowTops.slice(0, MAX_VISIBLE_ROWS));
    let hiddenCount = 0;

    cards.forEach((card) => {
      const visible = visibleTops.has(card.offsetTop);
      card.style.display = visible ? "" : "none";
      if (!visible) hiddenCount += 1;
    });

    if (hiddenCount === 0) {
      wrap.style.maxHeight = "";
      wrap.classList.remove("majors-grid-wrap--collapsed");
      showMoreWrap.classList.add("is-hidden");
      if (typeof AOS !== 'undefined') AOS.refresh();
      return;
    }

    const lastVisible = cards.filter((card) => visibleTops.has(card.offsetTop)).pop();
    const wrapRect = wrap.getBoundingClientRect();
    const lastRect = lastVisible.getBoundingClientRect();
    wrap.style.maxHeight = `${lastRect.bottom - wrapRect.top + 8}px`;
    wrap.classList.add("majors-grid-wrap--collapsed");
    showMoreWrap.classList.remove("is-hidden");
    showMoreBtn.textContent = "Xem thêm";

    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }

  function majorCard(major, index = 0) {
    const cat = DATA.getCategory(major.category);
    const isBookmarked = bookmarked.includes(major.id);
    const bookmarkText = isBookmarked ? "Đã lưu ❤️" : "Lưu ♡";
    return `
      <article class="major-card fade-in" style="animation-delay: ${Math.min(index, 8) * 0.04}s">
        <div class="card-top">
          <span class="pill" style="color:${cat.color};background:#f8fafc">${cat.name}</span>
          <span class="pill">Độ khó ${major.difficulty}/10</span>
        </div>
        <div class="card-body">
          <h3>${major.name}</h3>
          <p>${major.description}</p>
          <div class="meta-row">
            <span class="pill">Lương: ${major.salary}</span>
            <span class="pill">Việc làm: ${major.employment}%</span>
            <span class="pill">${major.combos.join(", ")}</span>
          </div>
          <p><strong>Nghề nghiệp:</strong> ${major.careers.join(", ")}</p>
        </div>
        <div class="card-actions">
          <button class="mini-btn" data-compare="${major.id}">So sánh</button>
          <button class="mini-btn" data-bookmark="${major.id}">${bookmarkText}</button>
        </div>
      </article>
    `;
  }

  function addCompare(id) {
    if (compare.includes(id)) {
      UI.toast("Ngành này đã có trong danh sách so sánh.");
      return;
    }
    if (compare.length >= 3) {
      UI.toast("Chỉ so sánh tối đa 3 ngành để bảng dễ đọc.");
      return;
    }
    compare.push(id);
    localStorage.setItem("unimatch_compare_majors", JSON.stringify(compare));
    renderCompare();
  }

  function toggleBookmark(id) {
    const idx = bookmarked.indexOf(id);
    if (idx > -1) {
      bookmarked.splice(idx, 1);
      UI.toast("Đã bỏ lưu ngành học này.");
    } else {
      bookmarked.push(id);
      UI.toast("Đã lưu ngành học thành công ❤️");
    }
    localStorage.setItem("unimatch_bookmarked_majors", JSON.stringify(bookmarked));
    renderMajors();
  }

  function saveFilters() {
    const filters = {
      query: UI.$("#search").value,
      difficulty: UI.$("#difficulty").value,
      selectedCategory: selectedCategory,
      bookmarkFilter: UI.$("#bookmarkFilter") ? UI.$("#bookmarkFilter").value : "all"
    };
    localStorage.setItem("unimatch_major_filters", JSON.stringify(filters));
  }

  function restoreFilters() {
    try {
      const saved = JSON.parse(localStorage.getItem("unimatch_major_filters"));
      if (saved) {
        if (saved.query !== undefined) UI.$("#search").value = saved.query;
        if (saved.difficulty !== undefined) UI.$("#difficulty").value = saved.difficulty;
        if (saved.selectedCategory !== undefined) {
          selectedCategory = saved.selectedCategory;
          // Cập nhật class active cho chip nhóm ngành
          const box = UI.$("#categoryChips");
          if (box) {
            UI.$all("[data-category]", box).forEach((btn) => {
              btn.classList.toggle("is-active", btn.dataset.category === selectedCategory);
            });
          }
        }
        if (saved.bookmarkFilter !== undefined && UI.$("#bookmarkFilter")) {
          UI.$("#bookmarkFilter").value = saved.bookmarkFilter;
        }
      }
    } catch (e) {
      console.error("Error restoring filters", e);
    }
  }

  function renderRecentSearches() {
    const container = UI.$("#recentSearches");
    const tagsContainer = UI.$("#recentTags");
    if (!container || !tagsContainer) return;

    if (recentSearches.length === 0) {
      container.style.display = "none";
      return;
    }

    container.style.display = "block";
    tagsContainer.innerHTML = recentSearches.map((tag) => `
      <span class="recent-tag" data-tag="${tag}">${tag} ✕</span>
    `).join("");

    UI.$all("[data-tag]", tagsContainer).forEach((el) => {
      el.addEventListener("click", (e) => {
        const tag = el.dataset.tag;
        if (e.target.textContent.includes("✕") && e.offsetX > el.offsetWidth - 20) {
          e.stopPropagation();
          removeRecentSearch(tag);
        } else {
          UI.$("#search").value = tag;
          majorsExpanded = false;
          saveFilters();
          renderMajors();
        }
      });
    });
  }

  function addRecentSearch(query) {
    const cleaned = query.trim();
    if (!cleaned) return;
    recentSearches = recentSearches.filter((t) => t !== cleaned);
    recentSearches.unshift(cleaned);
    recentSearches = recentSearches.slice(0, 5);
    localStorage.setItem("unimatch_recent_searches_major", JSON.stringify(recentSearches));
    renderRecentSearches();
  }

  function removeRecentSearch(query) {
    recentSearches = recentSearches.filter((t) => t !== query);
    localStorage.setItem("unimatch_recent_searches_major", JSON.stringify(recentSearches));
    renderRecentSearches();
  }

  function renderCompare() {
    const dock = UI.$("#compareDock");
    const items = UI.$("#compareItems");
    dock.classList.toggle("is-visible", compare.length > 0);
    items.innerHTML = compare.map((id) => `<span class="pill">${DATA.getMajor(id).name}</span>`).join("");
  }

  function openCompare() {
    if (compare.length < 2) {
      UI.toast("Cần ít nhất 2 ngành để so sánh.");
      return;
    }
    const majors = compare.map((id) => DATA.getMajor(id)).filter(Boolean);
    UI.$("#modalBody").innerHTML = `
      <table class="compare-table">
        <tr><th>Tiêu chí</th>${majors.map((m) => `<th>${m.name}</th>`).join("")}</tr>
        <tr><td>Nhóm ngành</td>${majors.map((m) => `<td>${DATA.getCategory(m.category).name}</td>`).join("")}</tr>
        <tr><td>Mức lương</td>${majors.map((m) => `<td>${m.salary}</td>`).join("")}</tr>
        <tr><td>Tỷ lệ việc làm</td>${majors.map((m) => `<td>${m.employment}%</td>`).join("")}</tr>
        <tr><td>Độ khó</td>${majors.map((m) => `<td>${m.difficulty}/10</td>`).join("")}</tr>
        <tr><td>Tổ hợp</td>${majors.map((m) => `<td>${m.combos.join(", ")}</td>`).join("")}</tr>
        <tr><td>Nghề nghiệp</td>${majors.map((m) => `<td>${m.careers.join(", ")}</td>`).join("")}</tr>
      </table>
    `;
    UI.$("#compareModal").classList.add("is-open");
  }

  function renderQuiz() {
    const box = UI.$("#quizBox");
    const question = questions[quizIndex];

    if (!question) {
      const results = Object.entries(quizScores).sort((a, b) => b[1] - a[1]).slice(0, 3);
      box.innerHTML = `
        <h3>Kết quả định hướng</h3>
        <p>Ba nhóm ngành nổi bật nhất theo câu trả lời của bạn:</p>
        <div class="meta-row">
          ${results.map(([id, score]) => `<span class="pill">${DATA.getCategory(id)?.name || id}: ${score} điểm</span>`).join("")}
        </div>
        <div class="row-actions">
          <button class="btn-secondary" id="applyQuiz">Lọc theo nhóm mạnh nhất</button>
          <button class="btn-ghost" id="restartQuiz">Làm lại</button>
        </div>
      `;
      UI.$("#applyQuiz").addEventListener("click", () => {
        selectedCategory = results[0]?.[0] || "all";
        renderCategories();
        UI.$all("[data-category]").forEach((item) => {
          item.classList.toggle("is-active", item.dataset.category === selectedCategory);
        });
        majorsExpanded = false;
        renderMajors();
      });
      UI.$("#restartQuiz").addEventListener("click", () => {
        quizIndex = 0;
        quizScores = {};
        renderQuiz();
      });
      return;
    }

    box.innerHTML = `
      <h3>Câu ${quizIndex + 1}/${questions.length}</h3>
      <p>${question.text}</p>
      <div class="quiz-options">
        ${question.options.map((option, index) => `<button class="quiz-option" data-answer="${index}">${option.text}</button>`).join("")}
      </div>
    `;

    UI.$all("[data-answer]", box).forEach((button) => {
      button.addEventListener("click", () => {
        const option = question.options[Number(button.dataset.answer)];
        Object.entries(option.scores).forEach(([id, score]) => {
          quizScores[id] = (quizScores[id] || 0) + score;
        });
        quizIndex += 1;
        renderQuiz();
      });
    });
  }

  function renderTrends() {
    const trends = [
      { title: "AI và dữ liệu", text: "Nhu cầu nhân lực tăng nhanh, phù hợp học sinh mạnh Toán - Tin.", tag: "Hot" },
      { title: "An toàn thông tin", text: "Doanh nghiệp số hóa kéo theo nhu cầu bảo mật hệ thống.", tag: "Tăng trưởng" },
      { title: "Kinh tế số", text: "Marketing số, thương mại điện tử và phân tích kinh doanh tiếp tục mở rộng.", tag: "Ổn định cao" }
    ];
    UI.$("#trendGrid").innerHTML = trends.map((item) => `
      <article class="tool-card trend-card">
        <span class="pill fit">${item.tag}</span>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </article>
    `).join("");
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderCategories();
    restoreFilters();
    renderMajors();
    renderQuiz();
    renderTrends();

    UI.$("#search").addEventListener("input", () => {
      majorsExpanded = false;
      saveFilters();
      renderMajors();
    });
    UI.$("#difficulty").addEventListener("input", () => {
      majorsExpanded = false;
      saveFilters();
      renderMajors();
    });
    if (UI.$("#bookmarkFilter")) {
      UI.$("#bookmarkFilter").addEventListener("change", () => {
        majorsExpanded = false;
        saveFilters();
        renderMajors();
      });
    }

    // Capture search category chip click to save filters
    const box = UI.$("#categoryChips");
    if (box) {
      box.addEventListener("click", (e) => {
        if (e.target.dataset.category) {
          saveFilters();
        }
      });
    }

    UI.$("#search").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = e.target.value.trim();
        if (val) {
          addRecentSearch(val);
          saveFilters();
          renderMajors();
        }
      }
    });

    renderRecentSearches();

    UI.$("#showMoreMajors").addEventListener("click", () => {
      majorsExpanded = true;
      applyMajorsRowLimit();
    });

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!majorsExpanded) applyMajorsRowLimit();
      }, 150);
    });
    UI.$("#clearCompare").addEventListener("click", () => {
      compare = [];
      localStorage.removeItem("unimatch_compare_majors");
      renderCompare();
    });
    UI.$("#openCompare").addEventListener("click", openCompare);
    UI.$("#closeModal").addEventListener("click", () => UI.$("#compareModal").classList.remove("is-open"));
    UI.$("#compareModal").addEventListener("click", (event) => {
      if (event.target.id === "compareModal") event.currentTarget.classList.remove("is-open");
    });

    renderCompare();
  });
})();

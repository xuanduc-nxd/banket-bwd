(function () {
  "use strict";

  const DATA = window.UniMatchData;
  const UI = window.UniMatch;
  let compare = [];
  try {
    compare = JSON.parse(localStorage.getItem("unimatch_compare_list") || "[]");
  } catch (e) {
    compare = [];
  }
  let isExpanded = false;
  const INITIAL_LIMIT = 12;

  let bookmarked = [];
  try {
    bookmarked = JSON.parse(localStorage.getItem("unimatch_bookmarked_unis") || "[]");
  } catch (e) {
    bookmarked = [];
  }

  let recentSearches = [];
  try {
    recentSearches = JSON.parse(localStorage.getItem("unimatch_recent_searches_uni") || "[]");
  } catch (e) {
    recentSearches = [];
  }

  function universityMatches(uni, query, type, region, category) {
    const normalized = query.trim().toLowerCase();
    const text = `${uni.name} ${uni.shortName} ${uni.city}`.toLowerCase();
    if (normalized && !text.includes(normalized)) return false;
    if (type !== "all" && uni.type !== type) return false;
    if (region !== "all" && uni.region !== region && uni.region !== "all") return false;
    if (category !== "all" && !uni.categories.includes(category)) return false;
    return true;
  }

  function render() {
    const list = UI.$("#universitiesGrid");
    if (!list) return;

    const query = UI.$("#search").value;
    const type = UI.$("#type").value;
    const region = UI.$("#region").value;
    const category = UI.$("#category").value;
    const bookmarkFilter = UI.$("#bookmarkFilter") ? UI.$("#bookmarkFilter").value : "all";

    const filtered = DATA.universities.filter((uni) => {
      if (bookmarkFilter === "bookmarked" && !bookmarked.includes(uni.id)) return false;
      return universityMatches(uni, query, type, region, category);
    });
    UI.$("#resultCount").textContent = `${filtered.length} trường`;

    const displayList = isExpanded ? filtered : filtered.slice(0, INITIAL_LIMIT);

    list.innerHTML = displayList.length ? displayList.map((uni, index) => {
      const typeLabel = uni.type === "public" ? "Công lập" : "Tư thục";
      const isBookmarked = bookmarked.includes(uni.id);
      const bookmarkText = isBookmarked ? "Đã lưu ❤️" : "Lưu ♡";

      return `
        <article class="university-card is-compact fade-in" style="animation-delay: ${Math.min(index, 8) * 0.04}s">
          <div class="card-top">
            <div class="logo-box ${uni.type === "private" ? "private" : ""}">${uni.shortName}</div>
            <span class="pill ${uni.type}">${typeLabel}</span>
          </div>
          <div class="card-body">
            <h3>${uni.name}</h3>
            <div class="summary-list" style="margin-top: 8px;">
              <div class="summary-item" style="border: none; padding: 2px 0;"><span>TP</span><strong>${uni.city}</strong></div>
              <div class="summary-item" style="border: none; padding: 2px 0;"><span>Ngành</span><strong>${uni.majorsCount}</strong></div>
              <div class="summary-item" style="border: none; padding: 2px 0;"><span>SV</span><strong>${uni.students}</strong></div>
              <div class="summary-item" style="border: none; padding: 2px 0;"><span>Phí</span><strong>${DATA.money(uni.tuition)}</strong></div>
            </div>
          </div>
          <div class="card-actions">
            <a class="mini-btn" href="${uni.website}" target="_blank" rel="noopener">Web</a>
            <a class="mini-btn" href="map.html?university=${encodeURIComponent(uni.id)}">Map</a>
            <button class="mini-btn" data-compare="${uni.id}">So sánh</button>
            <button class="mini-btn" data-bookmark="${uni.id}">${bookmarkText}</button>
          </div>
        </article>
      `;
    }).join("") : `<div class="empty-state">Không tìm thấy trường phù hợp với bộ lọc.</div>`;

    // Thêm nút Xem thêm nếu còn trường ẩn
    if (!isExpanded && filtered.length > INITIAL_LIMIT) {
      list.insertAdjacentHTML("beforeend", `
        <div class="load-more-wrapper">
          <button class="load-more-btn" id="loadMore">Xem thêm (${filtered.length - INITIAL_LIMIT} trường khác)</button>
        </div>
      `);
      UI.$("#loadMore").addEventListener("click", () => {
        isExpanded = true;
        render();
      });
    }

    UI.$all("[data-compare]").forEach((button) => {
      button.addEventListener("click", () => addCompare(button.dataset.compare));
    });

    UI.$all("[data-bookmark]").forEach((button) => {
      button.addEventListener("click", () => toggleBookmark(button.dataset.bookmark));
    });

    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }
  }

  function toggleBookmark(id) {
    const idx = bookmarked.indexOf(id);
    if (idx > -1) {
      bookmarked.splice(idx, 1);
      UI.toast("Đã bỏ lưu trường này.");
    } else {
      bookmarked.push(id);
      UI.toast("Đã lưu trường thành công ❤️");
    }
    localStorage.setItem("unimatch_bookmarked_unis", JSON.stringify(bookmarked));
    render();
  }

  function saveFilters() {
    const filters = {
      query: UI.$("#search").value,
      type: UI.$("#type").value,
      region: UI.$("#region").value,
      category: UI.$("#category").value,
      bookmarkFilter: UI.$("#bookmarkFilter") ? UI.$("#bookmarkFilter").value : "all"
    };
    localStorage.setItem("unimatch_uni_filters", JSON.stringify(filters));
  }

  function restoreFilters() {
    try {
      const saved = JSON.parse(localStorage.getItem("unimatch_uni_filters"));
      if (saved) {
        if (saved.query !== undefined) UI.$("#search").value = saved.query;
        if (saved.type !== undefined) UI.$("#type").value = saved.type;
        if (saved.region !== undefined) UI.$("#region").value = saved.region;
        if (saved.category !== undefined) UI.$("#category").value = saved.category;
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

    container.style.display = "flex";
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
          isExpanded = false;
          saveFilters();
          render();
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
    localStorage.setItem("unimatch_recent_searches_uni", JSON.stringify(recentSearches));
    renderRecentSearches();
  }

  function removeRecentSearch(query) {
    recentSearches = recentSearches.filter((t) => t !== query);
    localStorage.setItem("unimatch_recent_searches_uni", JSON.stringify(recentSearches));
    renderRecentSearches();
  }

  function addCompare(id) {
    if (compare.includes(id)) {
      UI.toast("Trường này đã có trong danh sách so sánh.");
      return;
    }
    if (compare.length >= 3) {
      UI.toast("Chỉ nên so sánh tối đa 3 trường để dễ ra quyết định.");
      return;
    }
    compare.push(id);
    localStorage.setItem("unimatch_compare_list", JSON.stringify(compare));
    renderCompareDock();
  }

  function renderCompareDock() {
    const dock = UI.$("#compareDock");
    const items = UI.$("#compareItems");
    dock.classList.toggle("is-visible", compare.length > 0);
    items.innerHTML = compare.map((id) => {
      const uni = DATA.universities.find((item) => item.id === id);
      return `<span class="pill">${uni.shortName}</span>`;
    }).join("");
  }

  function openCompare() {
    if (compare.length < 2) {
      UI.toast("Cần ít nhất 2 trường để so sánh.");
      return;
    }
    const selected = compare.map((id) => DATA.universities.find((item) => item.id === id)).filter(Boolean);
    UI.$("#modalBody").innerHTML = `
      <table class="compare-table">
        <tr><th>Tiêu chí</th>${selected.map((u) => `<th>${u.shortName}</th>`).join("")}</tr>
        <tr><td>Tên trường</td>${selected.map((u) => `<td>${u.name}</td>`).join("")}</tr>
        <tr><td>Loại trường</td>${selected.map((u) => `<td>${u.type === "public" ? "Công lập" : "Tư thục"}</td>`).join("")}</tr>
        <tr><td>Khu vực</td>${selected.map((u) => `<td>${u.city}</td>`).join("")}</tr>
        <tr><td>Học phí</td>${selected.map((u) => `<td>${DATA.money(u.tuition)}</td>`).join("")}</tr>
        <tr><td>Số ngành</td>${selected.map((u) => `<td>${u.majorsCount}</td>`).join("")}</tr>
        <tr><td>Nhóm mạnh</td>${selected.map((u) => `<td>${u.categories.map((id) => DATA.getCategory(id)?.name || id).join(", ")}</td>`).join("")}</tr>
      </table>
    `;
    UI.$("#compareModal").classList.add("is-open");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const category = UI.$("#category");
    DATA.categories.forEach((item) => {
      category.insertAdjacentHTML("beforeend", `<option value="${item.id}">${item.name}</option>`);
    });

    ["search", "type", "region", "category", "bookmarkFilter"].forEach((id) => {
      const el = UI.$(`#${id}`);
      if (el) {
        el.addEventListener("input", () => {
          isExpanded = false; // Reset trạng thái khi lọc
          saveFilters();
          render();
        });
      }
    });

    UI.$("#search").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = e.target.value.trim();
        if (val) {
          addRecentSearch(val);
          saveFilters();
          render();
        }
      }
    });

    restoreFilters();
    renderRecentSearches();

    UI.$("#clearCompare").addEventListener("click", () => {
      compare = [];
      localStorage.removeItem("unimatch_compare_list");
      renderCompareDock();
    });
    UI.$("#openCompare").addEventListener("click", openCompare);
    UI.$("#closeModal").addEventListener("click", () => UI.$("#compareModal").classList.remove("is-open"));
    UI.$("#compareModal").addEventListener("click", (event) => {
      if (event.target.id === "compareModal") event.currentTarget.classList.remove("is-open");
    });

    renderCompareDock();
    render();
  });
})();

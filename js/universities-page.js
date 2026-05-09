(function () {
  "use strict";

  const DATA = window.UniMatchData;
  const UI = window.UniMatch;
  let compare = [];

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

    const filtered = DATA.universities.filter((uni) => universityMatches(uni, query, type, region, category));
    UI.$("#resultCount").textContent = `${filtered.length} trường`;

    list.innerHTML = filtered.length ? filtered.map((uni) => {
      const mainCutoffs = Object.entries(uni.cutoffs).slice(0, 3).map(([majorId, cutoffs]) => {
        const major = DATA.getMajor(majorId);
        return major ? `<span class="pill">${major.name}: ${cutoffs[2025].toFixed(1)}</span>` : "";
      }).join("");
      const typeLabel = uni.type === "public" ? "Công lập" : "Tư thục";

      return `
        <article class="university-card">
          <div class="card-top">
            <div class="logo-box ${uni.type === "private" ? "private" : ""}">${uni.shortName}</div>
            <span class="pill ${uni.type}">${typeLabel}</span>
          </div>
          <div class="card-body">
            <h3>${uni.name}</h3>
            <p>${uni.city} - ${uni.majorsCount} ngành - ${uni.students} sinh viên</p>
            <div class="meta-row">
              <span class="pill">Học phí: ${DATA.money(uni.tuition)}</span>
              ${uni.categories.map((id) => `<span class="pill">${DATA.getCategory(id)?.name || id}</span>`).join("")}
            </div>
            <div class="meta-row">${mainCutoffs}</div>
          </div>
          <div class="card-actions">
            <a class="mini-btn" href="${uni.website}" target="_blank" rel="noopener">Website</a>
            <a class="mini-btn" href="map.html?university=${encodeURIComponent(uni.id)}">Bản đồ</a>
            <button class="mini-btn" data-compare="${uni.id}">So sánh</button>
          </div>
        </article>
      `;
    }).join("") : `<div class="empty-state">Không tìm thấy trường phù hợp với bộ lọc.</div>`;

    UI.$all("[data-compare]").forEach((button) => {
      button.addEventListener("click", () => addCompare(button.dataset.compare));
    });
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

    ["search", "type", "region", "category"].forEach((id) => {
      UI.$(`#${id}`).addEventListener("input", render);
    });

    UI.$("#clearCompare").addEventListener("click", () => {
      compare = [];
      renderCompareDock();
    });
    UI.$("#openCompare").addEventListener("click", openCompare);
    UI.$("#closeModal").addEventListener("click", () => UI.$("#compareModal").classList.remove("is-open"));
    UI.$("#compareModal").addEventListener("click", (event) => {
      if (event.target.id === "compareModal") event.currentTarget.classList.remove("is-open");
    });

    render();
  });
})();

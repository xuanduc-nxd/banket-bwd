(function () {
  "use strict";

  const DATA = window.UniMatchData;
  const UI = window.UniMatch;
  const MAP_CFG = window.UNIMATCH_MAP || { provider: "vietmap", apiKey: "", style: "tm" };

  let map;
  let markers = {};
  let activeFilter = "all";
  let recommendedIds = [];
  let mapReady = false;

  function getVisibleUniversities() {
    const query = UI.$("#mapSearch").value.trim().toLowerCase();
    return DATA.universities.filter((uni) => {
      if (recommendedIds.length && !recommendedIds.includes(uni.id)) return false;
      if (activeFilter !== "all" && uni.type !== activeFilter) return false;
      if (query) {
        const text = `${uni.name} ${uni.shortName} ${uni.city}`.toLowerCase();
        if (!text.includes(query)) return false;
      }
      return true;
    });
  }

  function showMapSetupMessage(message) {
    const el = UI.$("#map");
    if (!el) return;
    el.innerHTML = `<div class="empty-state" style="height:100%;min-height:360px;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center">${message}</div>`;
  }

  function createMarkerElement(uni) {
    const el = document.createElement("div");
    const bg = uni.type === "private" ? "#000000" : "#3a86ff";
    el.className = "map-marker-pin";
    el.innerHTML = `<span style="display:grid;place-items:center;width:38px;height:38px;background:${bg};color:#fff;font-size:9px;font-weight:800;font-family:system-ui,sans-serif;border:2px solid #000;border-radius:4px;box-shadow:3px 3px 0 #000;cursor:pointer">${uni.shortName}</span>`;
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      selectUniversity(uni.id, false);
    });
    return el;
  }

  function buildStyleUrl() {
    const key = (MAP_CFG.apiKey || "").trim();
    const style = MAP_CFG.style || "tm";
    return `https://maps.vietmap.vn/maps/styles/${style}/style.json?apikey=${encodeURIComponent(key)}`;
  }

  function initMap() {
    const key = (MAP_CFG.apiKey || "").trim();
    if (!key) {
      showMapSetupMessage(
        "<strong>Chưa cấu hình API bản đồ.</strong><br><br>" +
        "Mở <code>js/map-config.js</code> và điền <code>apiKey</code> VietMap " +
        "(miễn phí: <a href='https://maps.vietmap.vn/console/register' target='_blank' rel='noopener'>đăng ký tại đây</a>).<br><br>" +
        "UniMatch dùng <strong>VietMap</strong> thay OpenStreetMap để hiển thị đúng chủ quyền <strong>Hoàng Sa, Trường Sa thuộc Việt Nam</strong>."
      );
      return;
    }

    if (!window.vietmapgl) {
      showMapSetupMessage("Không tải được VietMap GL JS. Kiểm tra kết nối mạng.");
      return;
    }

    map = new vietmapgl.Map({
      container: "map",
      style: buildStyleUrl(),
      center: [108.2022, 16.0544],
      zoom: 6,
      minZoom: 5,
      maxZoom: 18
    });

    map.addControl(new vietmapgl.NavigationControl(), "top-right");

    map.on("load", () => {
      mapReady = true;

      DATA.universities.forEach((uni) => {
        const marker = new vietmapgl.Marker({ element: createMarkerElement(uni), anchor: "bottom" })
          .setLngLat([uni.lng, uni.lat]);
        markers[uni.id] = { marker, uni };
      });

      render();
    });

    map.on("error", (e) => {
      console.error("VietMap error:", e);
      if (!mapReady) {
        showMapSetupMessage(
          "Không tải được bản đồ VietMap. Kiểm tra <code>apiKey</code> và giới hạn domain trong VietMap Console."
        );
      }
    });
  }

  function setMarkerVisibility(visible) {
    if (!mapReady) return;
    const visibleIds = new Set(visible.map((u) => u.id));
    DATA.universities.forEach((uni) => {
      const entry = markers[uni.id];
      if (!entry) return;
      if (visibleIds.has(uni.id)) {
        entry.marker.addTo(map);
      } else {
        entry.marker.remove();
      }
    });
  }

  function render() {
    if (!mapReady) return;

    const visible = getVisibleUniversities();
    setMarkerVisibility(visible);

    UI.$("#mapCount").textContent = `${visible.length} trường`;
    UI.$("#mapList").innerHTML = visible.length
      ? visible
          .map(
            (uni) => `
      <button type="button" class="map-list-item" data-id="${uni.id}">
        <strong>${uni.name}</strong>
        <div class="meta-row">
          <span class="pill ${uni.type}">${uni.type === "public" ? "Công lập" : "Tư thục"}</span>
          <span class="pill">${uni.city}</span>
          <span class="pill">${DATA.money(uni.tuition)}</span>
        </div>
      </button>
    `
          )
          .join("")
      : `<div class="empty-state">Không có trường phù hợp để hiển thị.</div>`;

    UI.$all(".map-list-item[data-id]").forEach((item) => {
      item.addEventListener("click", () => selectUniversity(item.dataset.id, true));
    });

    if (visible.length) {
      const bounds = new vietmapgl.LngLatBounds();
      visible.forEach((uni) => bounds.extend([uni.lng, uni.lat]));
      map.fitBounds(bounds, { padding: 48, maxZoom: 13, duration: 600 });
    }
  }

  function selectUniversity(id, fly) {
    const uni = DATA.universities.find((item) => item.id === id);
    if (!uni || !mapReady) return;

    UI.$all(".map-list-item").forEach((item) => {
      item.classList.toggle("is-active", item.dataset.id === id);
    });

    UI.$("#infoPanel").innerHTML = `
      <h3>${uni.name}</h3>
      <p>${uni.city} — ${uni.type === "public" ? "Công lập" : "Tư thục"}</p>
      <div class="summary-list">
        <div class="summary-item"><span>Học phí</span><strong>${DATA.money(uni.tuition)}</strong></div>
        <div class="summary-item"><span>Sinh viên</span><strong>${uni.students}</strong></div>
        <div class="summary-item"><span>Số ngành</span><strong>${uni.majorsCount}</strong></div>
        <div class="summary-item"><span>Nhóm mạnh</span><strong>${uni.categories.map((cat) => DATA.getCategory(cat)?.name || cat).join(", ")}</strong></div>
      </div>
      <div class="row-actions">
        <a class="btn-primary" href="${uni.website}" target="_blank" rel="noopener">Website</a>
      </div>
    `;

    if (fly) {
      map.flyTo({
        center: [uni.lng, uni.lat],
        zoom: 14,
        duration: 800
      });
    }
  }

  function loadPlan() {
    const plan = UI.getPlan();
    if (!plan?.matches?.length) return;
    recommendedIds = Array.from(new Set(plan.matches.slice(0, 10).map((match) => match.university.id)));
    UI.$("#recommendBox").style.display = "block";
    UI.$("#recommendText").textContent = `Đang hiển thị ${recommendedIds.length} trường từ kết quả tư vấn ${plan.totalScore.toFixed(1)} điểm.`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    initMap();
    loadPlan();

    UI.$all("[data-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;
        UI.$all("[data-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
        render();
      });
    });

    UI.$("#mapSearch")?.addEventListener("input", render);
    UI.$("#clearRecommendation")?.addEventListener("click", () => {
      recommendedIds = [];
      UI.$("#recommendBox").style.display = "none";
      render();
    });

    const params = new URLSearchParams(window.location.search);
    const target = params.get("university");
    if (target) {
      setTimeout(() => selectUniversity(target, true), 800);
    }
  });
})();

/*  CHUCWS NANG CUA FILE LA DE DINH NGHIA CAC KIEU GIAO DIEN CHUNG CHO TOAN BO TRANG WEB,
NHU THANH DIEU HUONG, THANH CONG CU, THANH TRANG, VA CAC THANH PHAN BO CUC KHAC.
CAC KIEU GIAO DIEN NAY SE GIUP TOI TAO RA MOT TRANG WEB CO THIET KE NHAT QUAN, DE SU DUNG TRONG MOI TRANG VA MOI THANH PHAN TREN WEBSITE.  
*/
// DUNG DE DINH NGHIA CAC HAM VA BIEN LIEN QUAN DEN TRANG MAP, NHU VI TRI CUA CAC TRUONG TREN BAN DO, CAC LOC TRUONG, VA CAC HANH DONG KHI NGUOI DUNG TUONG TAC VOI BAN DO VA DANH SACH TRUONG.
(function () {
  "use strict";

  const DATA = window.UniMatchData;
  const UI = window.UniMatch;
  let map;
  let markers = {};
  let activeFilter = "all";
  let recommendedIds = [];

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

  function markerIcon(uni) {
    const color = uni.type === "private" ? "#b45309" : "#006d9c";
    return L.divIcon({
      className: "",
      iconSize: [42, 42],
      iconAnchor: [21, 42],
      popupAnchor: [0, -36],
      html: `<div style="width:42px;height:42px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:grid;place-items:center;background:${color};box-shadow:0 10px 24px rgba(15,23,42,.25);border:2px solid #fff"><span style="transform:rotate(45deg);color:white;font-size:10px;font-weight:900">${uni.shortName}</span></div>`
    });
  }


  // Ham khoi tao ban do va dat cac marker cho tung truong dai hoc tren ban do, cung nhu thiet lap su kien khi nguoi dung click vao marker de hien thi thong tin chi tiet cua truong do. Ham nay se duoc goi khi trang duoc tai len va se tao ra mot ban do tuong tac voi cac truong dai hoc duoc dinh nghia trong DATA.universities.
  function initMap() {
    map = L.map("map").setView([16.0544, 108.2022], 6);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    DATA.universities.forEach((uni) => {
      const marker = L.marker([uni.lat, uni.lng], { icon: markerIcon(uni) });
      marker.bindPopup(`<strong>${uni.name}</strong><br>${uni.city}<br>Học phí: ${DATA.money(uni.tuition)}`);
      marker.on("click", () => selectUniversity(uni.id, false));
      markers[uni.id] = marker;
    });
  }

  // Ham render se duoc goi moi khi nguoi dung thay doi bo loc hoac nhap vao o tim kiem, va se cap nhat lai cac marker tren ban do va danh sach cac truong duoc hien thi ben canh ban do. Ham nay se loc cac truong dai hoc theo bo loc dang hoat dong (cong lap, tu thuc, hoac tat ca) va theo tu khoa tim kiem, sau do se them marker tuong ung vao ban do va cap nhat danh sach cac truong duoc hien thi.
  function render() {
    const visible = getVisibleUniversities();
    DATA.universities.forEach((uni) => {
      const marker = markers[uni.id];
      if (visible.includes(uni)) {
        marker.addTo(map);
      } else {
        marker.remove();
      }
    });

    UI.$("#mapCount").textContent = `${visible.length} trường`;
    UI.$("#mapList").innerHTML = visible.length ? visible.map((uni) => `
      <button class="map-item" data-id="${uni.id}">
        <strong>${uni.name}</strong>
        <div class="meta-row">
          <span class="pill ${uni.type}">${uni.type === "public" ? "Công lập" : "Tư thục"}</span>
          <span class="pill">${uni.city}</span>
          <span class="pill">${DATA.money(uni.tuition)}</span>
        </div>
      </button>
    `).join("") : `<div class="empty-state">Không có trường phù hợp để hiển thị.</div>`;

    UI.$all("[data-id]").forEach((item) => item.addEventListener("click", () => selectUniversity(item.dataset.id, true)));

    if (visible.length) {
      const bounds = L.latLngBounds(visible.map((uni) => [uni.lat, uni.lng]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    }
  }

  // Ham selectUniversity se duoc goi khi nguoi dung click vao mot marker tren ban do hoac mot truong trong danh sach ben canh ban do, va se hien thi thong tin chi tiet cua truong do trong mot panel ben phai. Ham nay se tim kiem truong dai hoc theo id, sau do cap nhat noi dung cua panel thong tin va bay marker tuong ung len ban do. Neu tham so fly la true, thi ban do se bay den vi tri cua truong do.
  function selectUniversity(id, fly) {
    const uni = DATA.universities.find((item) => item.id === id);
    if (!uni) return;
    UI.$all(".map-item").forEach((item) => item.classList.toggle("is-active", item.dataset.id === id));
    UI.$("#infoPanel").innerHTML = `
      <h3>${uni.name}</h3>
      <p>${uni.city} - ${uni.type === "public" ? "Công lập" : "Tư thục"}</p>
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
    if (fly) map.flyTo([uni.lat, uni.lng], 14, { duration: 0.8 });
    markers[id].openPopup();
  }

  // Ham loadPlan se duoc goi khi trang duoc tai len, va se kiem tra xem co ket qua tu van nao duoc luu trong UI hay khong. Neu co, ham se lay ra 10 truong dai hoc duoc danh gia cao nhat trong ket qua tu van va luu id cua chung vao bien recommendedIds, sau do hien thi mot thong bao tren giao dien de thong bao cho nguoi dung biet rang dang co cac truong duoc hien thi la nhung truong duoc de xuat dua tren ket qua tu van cua ho. Neu khong co ket qua tu van nao, ham se bo qua va khong hien thi thong bao nao.
  function loadPlan() {
    const plan = UI.getPlan();
    if (!plan?.matches?.length) return;
    recommendedIds = Array.from(new Set(plan.matches.slice(0, 10).map((match) => match.university.id)));
    UI.$("#recommendBox").style.display = "block";
    UI.$("#recommendText").textContent = `Đang hiển thị ${recommendedIds.length} trường từ kết quả tư vấn ${plan.totalScore.toFixed(1)} điểm.`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!window.L) {
      UI.$("#map").innerHTML = `<div class="empty-state">Không tải được Leaflet. Hãy kiểm tra kết nối mạng.</div>`;
      return;
    }

    initMap();
    loadPlan();

    UI.$all("[data-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;
        UI.$all("[data-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
        render();
      });
    });

    UI.$("#mapSearch").addEventListener("input", render);
    UI.$("#clearRecommendation").addEventListener("click", () => {
      recommendedIds = [];
      UI.$("#recommendBox").style.display = "none";
      render();
    });

    render();

    const params = new URLSearchParams(window.location.search);
    const target = params.get("university");
    if (target) {
      setTimeout(() => selectUniversity(target, true), 300);
    }
  });
})();

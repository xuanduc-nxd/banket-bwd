/*  CHUCWS NANG CUA FILE LA DE DINH NGHIA CAC KIEU GIAO DIEN CHUNG CHO TOAN BO TRANG WEB,
NHU THANH DIEU HUONG, THANH CONG CU, THANH TRANG, VA CAC THANH PHAN BO CUC KHAC.
CAC KIEU GIAO DIEN NAY SE GIUP TOI TAO RA MOT TRANG WEB CO THIET KE NHAT QUAN,
DE SU DUNG TRONG MOI TRANG VA MOI THANH PHAN TREN WEBSITE.  
*/

(function () {
  "use strict";

  // Danh sách các ngành học, trường đại học và các thông tin liên quan
  const categories = [
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

  // Các tổ hợp môn thi đại học phổ biến và các môn học tương ứng
  const subjects = { // CONST - KHONG THAY DOI
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

  let majors = [];
  const _majorsData = typeof majorsData !== 'undefined' ? majorsData : null;
  if (_majorsData && _majorsData.majors) {
    majors = _majorsData.majors.map(m => {
      let combos = ["A00", "A01", "D01"];
      if (m.category === "yte") combos = ["B00", "A00", "D07"];
      if (m.category === "design") combos = ["V00", "H00", "D01"];
      if (m.category === "luat") combos = ["C00", "D01", "D14"];
      if (m.category === "nn") combos = ["D01", "D14", "D15"];
      if (m.category === "sudp") combos = ["C00", "D01", "A00"];
      let mappedCategory = m.category;
      if (mappedCategory === "nnl") mappedCategory = "nonglam";
      if (mappedCategory === "kien_truc") mappedCategory = "xaydung";

      return {
        id: m.id,
        name: m.name,
        category: mappedCategory,
        description: m.description,
        careers: m.careers,
        salary: m.avgSalary,
        difficulty: m.difficulty,
        employment: parseInt(m.employmentRate) || 90,
        combos: combos
      };
    });
  } else {
    majors = [
      { id: "cntt", name: "Công nghệ thông tin", category: "cntt", description: "Phát triển phần mềm, hệ thống...", careers: ["Lập trình viên", "Kỹ sư phần mềm"], salary: "15-40 triệu/tháng", difficulty: 8, employment: 94, combos: ["A00", "A01", "D01", "D07"] },
      { id: "marketing", name: "Marketing", category: "kinhte", description: "Nghiên cứu thị trường...", careers: ["Digital Marketer", "Brand Executive"], salary: "10-30 triệu/tháng", difficulty: 6, employment: 88, combos: ["A00", "A01", "D01"] }
    ];
  }

  let universities = [];
  const _universitiesData = typeof universitiesData !== 'undefined' ? universitiesData : null;
  if (_universitiesData) {
    const allUnis = [
      ...(_universitiesData.public || []).map(u => ({...u, type: 'public'})),
      ...(_universitiesData.private || []).map(u => ({...u, type: 'private'}))
    ];

    function getRegion(location) {
      const north = ["Hà Nội", "Thái Nguyên", "Nghệ An"];
      const central = ["Đà Nẵng", "Huế"];
      if (north.some(n => location.includes(n))) return "north";
      if (central.some(n => location.includes(n))) return "central";
      if (location.includes("Nhiều cơ sở")) return "all";
      return "south";
    }

    function getLat(location) {
      if (location.includes("Hà Nội")) return 21.0285 + (Math.random() - 0.5) * 0.1;
      if (location.includes("Hồ Chí Minh") || location.includes("TP.HCM")) return 10.8231 + (Math.random() - 0.5) * 0.1;
      if (location.includes("Đà Nẵng")) return 16.0544 + (Math.random() - 0.5) * 0.1;
      if (location.includes("Huế")) return 16.4637;
      if (location.includes("Cần Thơ")) return 10.0452;
      return 16.0;
    }

    function getLng(location) {
      if (location.includes("Hà Nội")) return 105.8542 + (Math.random() - 0.5) * 0.1;
      if (location.includes("Hồ Chí Minh") || location.includes("TP.HCM")) return 106.6297 + (Math.random() - 0.5) * 0.1;
      if (location.includes("Đà Nẵng")) return 108.2022 + (Math.random() - 0.5) * 0.1;
      if (location.includes("Huế")) return 107.5909;
      if (location.includes("Cần Thơ")) return 105.7469;
      return 106.0;
    }

    // Hash string to pseudo-random numbers
    function seededRandom(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) hash = Math.imul(31, hash) + str.charCodeAt(i) | 0;
      return () => { hash = Math.imul(1103515245, hash) + 12345 | 0; return ((hash >>> 16) / 0xFFFF); };
    }

    universities = allUnis.map(u => {
      const cutoffs = {};
      const uniCats = u.categories || [];
      const matchingMajors = majors.filter(m => uniCats.includes(m.category)).slice(0, 4);
      const rand = seededRandom(u.shortName);
      
      matchingMajors.forEach(m => {
        const baseCutoff = 18 + rand() * 8;
        cutoffs[m.id] = {
          2023: parseFloat((baseCutoff).toFixed(1)),
          2024: parseFloat((baseCutoff + rand() * 0.5 - 0.2).toFixed(1)),
          2025: parseFloat((baseCutoff + rand() * 1.0 - 0.2).toFixed(1))
        };
      });

      return {
        id: u.shortName.toLowerCase(),
        name: u.name,
        shortName: u.shortName,
        type: u.type,
        city: u.location === "TP. Hồ Chí Minh" ? "TP.HCM" : u.location,
        region: getRegion(u.location),
        website: u.website || "#",
        tuition: Math.floor(15 + rand() * 25),
        students: u.students,
        majorsCount: parseInt(u.majors) || 20,
        lat: parseFloat(getLat(u.location).toFixed(4)),
        lng: parseFloat(getLng(u.location).toFixed(4)),
        categories: u.categories,
        cutoffs: cutoffs
      };
    });
  } else {
    universities = [
      { id: "vnu", name: "Đại học Quốc gia Hà Nội", shortName: "VNU", type: "public", city: "Hà Nội", region: "north", website: "https://vnu.edu.vn", tuition: 24, students: "40.000+", majorsCount: 150, lat: 21.0379, lng: 105.7824, categories: ["cntt", "kinhte"], cutoffs: { cntt: { 2023: 27.8, 2024: 28.0, 2025: 28.2 } } }
    ];
  }

  function getCategory(id) {
    return categories.find((item) => item.id === id);
  }

  function getMajor(id) {
    return majors.find((item) => item.id === id);
  }

  function getTrend(cutoffs) {
    const change = (cutoffs[2025] || 0) - (cutoffs[2023] || 0);
    if (change >= 1) return "Tăng";
    if (change <= -0.5) return "Giảm";
    return "Ổn định";
  }

  function money(value) {
    return `${value} triệu/năm`;
  }

  window.UniMatchData = {
    categories,
    subjects,
    majors,
    universities,
    getCategory,
    getMajor,
    getTrend,
    money
  };
})();

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
      ...(_universitiesData.public || []).map(u => ({ ...u, type: 'public' })),
      ...(_universitiesData.private || []).map(u => ({ ...u, type: 'private' }))
    ];

    function getRegion(location) {
      const north = ["Hà Nội", "Thái Nguyên", "Nghệ An"];
      const central = ["Đà Nẵng", "Huế"];
      if (north.some(n => location.includes(n))) return "north";
      if (central.some(n => location.includes(n))) return "central";
      if (location.includes("Nhiều cơ sở")) return "all";
      return "south";
    }

    // Danh sách toạ độ chính xác của các trường đại học
    const realCoords = {
      "VNU": { lat: 21.0379, lng: 105.7824 },
      "VNU-HCM": { lat: 10.8700, lng: 106.8031 },
      "HUST": { lat: 21.0049, lng: 105.8455 },
      "NEU": { lat: 21.0003, lng: 105.8430 },
      "FTU": { lat: 21.0233, lng: 105.8056 },
      "HCMUT": { lat: 10.7733, lng: 106.6597 },
      "UEH": { lat: 10.7818, lng: 106.6917 },
      "HNUE": { lat: 21.0366, lng: 105.7845 },
      "HCMUP": { lat: 10.7634, lng: 106.6821 },
      "HMU": { lat: 21.0016, lng: 105.8306 },
      "UMP": { lat: 10.7562, lng: 106.6663 },
      "CTU": { lat: 10.0299, lng: 105.7706 },
      "UDN": { lat: 16.0691, lng: 108.2223 },
      "DUT": { lat: 16.0739, lng: 108.1499 },
      "DNP": { lat: 16.0605, lng: 108.1670 },
      "DUE": { lat: 16.0336, lng: 108.2407 },
      "DFH": { lat: 16.0347, lng: 108.2198 },
      "DUL": { lat: 16.0270, lng: 108.2393 },
      "UTE": { lat: 16.0782, lng: 108.2138 },
      "VKU": { lat: 15.9753, lng: 108.2533 },
      "DSA": { lat: 10.7628, lng: 106.6896 },
      "UIT": { lat: 10.8700, lng: 106.8030 },
      "HCMUTE": { lat: 10.8506, lng: 106.7719 },
      "UFM": { lat: 10.7645, lng: 106.6881 },
      "UTT": { lat: 10.8033, lng: 106.7161 },
      "ULAW": { lat: 10.7628, lng: 106.7001 },
      "UAH": { lat: 10.7838, lng: 106.6961 },
      "NLU": { lat: 10.8690, lng: 106.7936 },
      "FAH": { lat: 10.8016, lng: 106.6908 },
      "HCMOU": { lat: 10.7770, lng: 106.6910 },
      "TDMU": { lat: 10.9804, lng: 106.6680 },
      "TDT": { lat: 10.7327, lng: 106.6980 },
      "HUE": { lat: 16.4589, lng: 107.5921 },
      "VNUH": { lat: 18.6654, lng: 105.6966 },
      "TNU": { lat: 21.5830, lng: 105.8115 },
      "HLU": { lat: 21.0223, lng: 105.8055 },
      "VNUA": { lat: 21.0028, lng: 105.9333 },
      "IUH": { lat: 10.8222, lng: 106.6875 },
      "HUI": { lat: 21.0543, lng: 105.7350 },
      "HUB": { lat: 10.7716, lng: 106.6963 },
      "BAV": { lat: 21.0089, lng: 105.8286 },
      "HAU": { lat: 20.9856, lng: 105.7972 },
      "NUCE": { lat: 21.0035, lng: 105.8436 },
      "UTC": { lat: 21.0256, lng: 105.8034 },
      "TLU": { lat: 21.0069, lng: 105.8247 },
      "HUMG": { lat: 21.0718, lng: 105.7735 },
      "FTA": { lat: 10.8407, lng: 106.6433 },
      "CSG": { lat: 10.7615, lng: 106.6826 },
      "APD": { lat: 21.0116, lng: 105.7335 },
      "TMU": { lat: 21.0366, lng: 105.7735 },
      "AOF": { lat: 21.0734, lng: 105.7766 },
      "HUP": { lat: 21.0195, lng: 105.8560 },
      "AAM": { lat: 20.9664, lng: 105.7938 },
      "HANU": { lat: 20.9850, lng: 105.7963 },
      "AJC": { lat: 21.0350, lng: 105.7891 },
      "NAPA": { lat: 21.0221, lng: 105.8020 },
      "NAV": { lat: 21.0423, lng: 105.8105 },
      "AIU": { lat: 21.0232, lng: 105.8270 },
      "HC": { lat: 21.0236, lng: 105.8291 },
      "PTIT": { lat: 20.9806, lng: 105.7874 },
      "DTU": { lat: 16.0601, lng: 108.2096 },
      "PCT": { lat: 15.9388, lng: 108.2443 },
      "PXT": { lat: 16.4526, lng: 107.5956 },
      "DAU": { lat: 16.0351, lng: 108.2198 },
      "ADU": { lat: 16.0394, lng: 108.2127 },
      "RMIT": { lat: 10.7300, lng: 106.6946 },
      "FUV": { lat: 10.7305, lng: 106.7214 },
      "FPTU": { lat: 21.0135, lng: 105.5273 },
      "AUV": { lat: 15.9620, lng: 108.2570 },
      "VinUni": { lat: 20.9853, lng: 105.9405 },
      "BUV": { lat: 20.9634, lng: 105.9351 },
      "STL": { lat: 20.9754, lng: 105.8183 },
      "PNU": { lat: 20.9608, lng: 105.7483 }
    };


    // TODO: Cần thêm các trường đại học mới vào danh sách trên 
    function getLat(shortName, location, region, rand) {
      if (realCoords[shortName]) return realCoords[shortName].lat;

      const loc = location.toLowerCase();
      let lat = 16.0;
      if (loc.includes("hà nội")) lat = 21.0285;
      else if (loc.includes("hồ chí minh") || loc.includes("hcm")) lat = 10.8231;
      else if (loc.includes("đà nẵng")) lat = 16.0544;
      else if (loc.includes("huế")) lat = 16.4637;
      else if (loc.includes("cần thơ")) lat = 10.0452;
      else if (loc.includes("bình dương")) lat = 10.9804;
      else if (loc.includes("thái nguyên")) lat = 21.5941;
      else if (loc.includes("nghệ an") || loc.includes("vinh")) lat = 18.6735;
      else if (loc.includes("hải phòng")) lat = 20.8449;
      else if (loc.includes("nam định")) lat = 20.4231;
      else if (loc.includes("khánh hòa") || loc.includes("nha trang")) lat = 12.2451;
      else if (loc.includes("lâm đồng") || loc.includes("đà lạt")) lat = 11.9404;
      else if (loc.includes("quảng nam")) lat = 15.5673;
      else if (loc.includes("thanh hóa")) lat = 19.8067;
      else {
        // Fallback to region center
        if (region === "north") lat = 21.0;
        else if (region === "central") lat = 16.0;
        else lat = 10.5;
      }
      return lat + (rand() - 0.5) * 0.08;
    }

    // TODO: Cần tìm toạ độ các trường đại học 
    function getLng(shortName, location, region, rand) {
      if (realCoords[shortName]) return realCoords[shortName].lng;

      const loc = location.toLowerCase();
      let lng = 106.0;
      if (loc.includes("hà nội")) lng = 105.8542;
      else if (loc.includes("hồ chí minh") || loc.includes("hcm")) lng = 106.6297;
      else if (loc.includes("đà nẵng")) lng = 108.2022;
      else if (loc.includes("huế")) lng = 107.5909;
      else if (loc.includes("cần thơ")) lng = 105.7469;
      else if (loc.includes("bình dương")) lng = 106.6517;
      else if (loc.includes("thái nguyên")) lng = 105.8481;
      else if (loc.includes("nghệ an") || loc.includes("vinh")) lng = 105.6813;
      else if (loc.includes("hải phòng")) lng = 106.6881;
      else if (loc.includes("nam định")) lng = 106.1683;
      else if (loc.includes("khánh hòa") || loc.includes("nha trang")) lng = 109.1943;
      else if (loc.includes("lâm đồng") || loc.includes("đà lạt")) lng = 108.4583;
      else if (loc.includes("quảng nam")) lng = 108.4817;
      else if (loc.includes("thanh hóa")) lng = 105.7767;
      else {
        // Fallback to region center
        if (region === "north") lng = 105.8;
        else if (region === "central") lng = 108.0;
        else lng = 106.5;
      }
      return lng + (rand() - 0.5) * 0.08;
    }

    // Hash string to pseudo-random numbers => để random số thập phân chính xác hơn
    function seededRandom(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) hash = Math.imul(31, hash) + str.charCodeAt(i) | 0;
      return () => { hash = Math.imul(1103515245, hash) + 12345 | 0; return ((hash >>> 16) / 0xFFFF); };
    }

    // Tạo danh sách các trường đại học với toạ độ chính xác
    universities = allUnis.map(u => {
      const cutoffs = {};
      const uniCats = u.categories || [];
      const matchingMajors = majors.filter(m => uniCats.includes(m.category)).slice(0, 4);
      const rand = seededRandom(u.shortName);

      // Tạo điểm chuẩn cho các ngành
      matchingMajors.forEach(m => {
        const baseCutoff = 18 + rand() * 8;
        cutoffs[m.id] = {
          2023: parseFloat((baseCutoff).toFixed(1)),
          2024: parseFloat((baseCutoff + rand() * 0.5 - 0.2).toFixed(1)),
          2025: parseFloat((baseCutoff + rand() * 1.0 - 0.2).toFixed(1))
        };
      });

      // Trả về object mới để lưu vào danh sách universitie
      return {
        id: u.shortName.toLowerCase(),
        name: u.name,
        shortName: u.shortName,
        type: u.type,
        city: u.location === "TP. Hồ Chí Minh" ? "TP.HCM" : u.location, //
        region: getRegion(u.location),
        website: u.website || "#",
        tuition: Math.floor(15 + rand() * 25),
        students: u.students,
        majorsCount: parseInt(u.majors) || 20,
        lat: parseFloat(getLat(u.shortName, u.location, getRegion(u.location), rand).toFixed(4)),
        lng: parseFloat(getLng(u.shortName, u.location, getRegion(u.location), rand).toFixed(4)),
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

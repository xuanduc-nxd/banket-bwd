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

  const majors = [
    {
      id: "cntt",
      name: "Công nghệ thông tin",
      category: "cntt",
      description: "Phát triển phần mềm, hệ thống thông tin, dữ liệu, AI và hạ tầng số.",
      careers: ["Lập trình viên", "Kỹ sư phần mềm", "Data Analyst", "DevOps"],
      salary: "15-40 triệu/tháng",
      difficulty: 8,
      employment: 94,
      combos: ["A00", "A01", "D01", "D07"]
    },
    {
      id: "ai",
      name: "Trí tuệ nhân tạo",
      category: "cntt",
      description: "Xây dựng mô hình học máy, xử lý dữ liệu lớn và các ứng dụng AI.",
      careers: ["AI Engineer", "Data Scientist", "ML Engineer"],
      salary: "22-60 triệu/tháng",
      difficulty: 9,
      employment: 96,
      combos: ["A00", "A01", "D07"]
    },
    {
      id: "attt",
      name: "An toàn thông tin",
      category: "cntt",
      description: "Bảo vệ hệ thống, dữ liệu và hạ tầng mạng trước rủi ro an ninh.",
      careers: ["Security Analyst", "Pentester", "SOC Engineer"],
      salary: "18-45 triệu/tháng",
      difficulty: 8,
      employment: 93,
      combos: ["A00", "A01", "D01"]
    },
    {
      id: "marketing",
      name: "Marketing",
      category: "kinhte",
      description: "Nghiên cứu thị trường, xây dựng thương hiệu và triển khai truyền thông số.",
      careers: ["Digital Marketer", "Brand Executive", "Content Planner"],
      salary: "10-30 triệu/tháng",
      difficulty: 6,
      employment: 88,
      combos: ["A00", "A01", "D01"]
    },
    {
      id: "taichinh",
      name: "Tài chính - Ngân hàng",
      category: "kinhte",
      description: "Quản trị tài chính, ngân hàng, đầu tư, bảo hiểm và thị trường vốn.",
      careers: ["Chuyên viên tín dụng", "Financial Analyst", "Kiểm toán"],
      salary: "12-35 triệu/tháng",
      difficulty: 7,
      employment: 90,
      combos: ["A00", "A01", "D01", "D07"]
    },
    {
      id: "qtkd",
      name: "Quản trị kinh doanh",
      category: "kinhte",
      description: "Quản lý vận hành, nhân sự, bán hàng, marketing và chiến lược doanh nghiệp.",
      careers: ["Business Analyst", "Sales Manager", "HR Executive"],
      salary: "10-30 triệu/tháng",
      difficulty: 6,
      employment: 86,
      combos: ["A00", "A01", "D01"]
    },
    {
      id: "ykhoa",
      name: "Y khoa",
      category: "yte",
      description: "Đào tạo bác sĩ đa khoa, chẩn đoán và điều trị bệnh.",
      careers: ["Bác sĩ", "Bác sĩ chuyên khoa", "Giảng viên y khoa"],
      salary: "18-55 triệu/tháng",
      difficulty: 10,
      employment: 98,
      combos: ["B00", "D08"]
    },
    {
      id: "duoc",
      name: "Dược học",
      category: "yte",
      description: "Nghiên cứu, sản xuất, phân phối và tư vấn sử dụng thuốc.",
      careers: ["Dược sĩ", "QA/QC dược", "Trình dược viên"],
      salary: "12-32 triệu/tháng",
      difficulty: 8,
      employment: 93,
      combos: ["A00", "B00", "D07"]
    },
    {
      id: "cokhi",
      name: "Kỹ thuật cơ khí",
      category: "kysu",
      description: "Thiết kế, chế tạo, vận hành máy móc và hệ thống sản xuất.",
      careers: ["Kỹ sư cơ khí", "Kỹ sư sản xuất", "CAD/CAM Engineer"],
      salary: "12-35 triệu/tháng",
      difficulty: 7,
      employment: 91,
      combos: ["A00", "A01"]
    },
    {
      id: "dientu",
      name: "Kỹ thuật điện - điện tử",
      category: "kysu",
      description: "Thiết kế, điều khiển và bảo trì hệ thống điện, điện tử, tự động hóa.",
      careers: ["Kỹ sư điện", "Automation Engineer", "Embedded Engineer"],
      salary: "13-38 triệu/tháng",
      difficulty: 8,
      employment: 92,
      combos: ["A00", "A01"]
    },
    {
      id: "suphamtoan",
      name: "Sư phạm Toán",
      category: "sudp",
      description: "Đào tạo giáo viên Toán với năng lực sư phạm và định hướng STEM.",
      careers: ["Giáo viên Toán", "Gia sư", "Chuyên viên giáo dục"],
      salary: "8-22 triệu/tháng",
      difficulty: 7,
      employment: 89,
      combos: ["A00", "A01"]
    },
    {
      id: "luat",
      name: "Luật",
      category: "luat",
      description: "Nghiên cứu hệ thống pháp luật, tố tụng, tư vấn và quản trị rủi ro pháp lý.",
      careers: ["Luật sư", "Pháp chế doanh nghiệp", "Công chứng viên"],
      salary: "10-35 triệu/tháng",
      difficulty: 7,
      employment: 84,
      combos: ["C00", "D01", "D14"]
    },
    {
      id: "ngonngu_anh",
      name: "Ngôn ngữ Anh",
      category: "nn",
      description: "Ngôn ngữ, biên phiên dịch, giao tiếp quốc tế và văn hóa Anh - Mỹ.",
      careers: ["Biên phiên dịch", "Giáo viên tiếng Anh", "Chuyên viên đối ngoại"],
      salary: "10-30 triệu/tháng",
      difficulty: 6,
      employment: 88,
      combos: ["D01", "D14"]
    },
    {
      id: "dulich",
      name: "Quản trị du lịch",
      category: "nn",
      description: "Điều hành tour, khách sạn, dịch vụ du lịch và trải nghiệm khách hàng.",
      careers: ["Điều hành tour", "Hotel Manager", "Hướng dẫn viên"],
      salary: "9-26 triệu/tháng",
      difficulty: 5,
      employment: 86,
      combos: ["C00", "D01", "D14"]
    },
    {
      id: "tkdh",
      name: "Thiết kế đồ họa",
      category: "design",
      description: "Thiết kế nhận diện, truyền thông thị giác, sản phẩm số và nội dung sáng tạo.",
      careers: ["Graphic Designer", "UI Designer", "Art Director"],
      salary: "10-32 triệu/tháng",
      difficulty: 7,
      employment: 87,
      combos: ["H00", "V00", "D01"]
    },
    {
      id: "nongnghiep",
      name: "Công nghệ nông nghiệp",
      category: "nonglam",
      description: "Ứng dụng công nghệ vào sản xuất nông nghiệp, quản lý cây trồng và chuỗi cung ứng.",
      careers: ["Kỹ sư nông nghiệp", "Chuyên viên R&D", "Quản lý trang trại"],
      salary: "9-24 triệu/tháng",
      difficulty: 6,
      employment: 84,
      combos: ["A00", "B00", "D08"]
    },
    {
      id: "kientruc",
      name: "Kiến trúc",
      category: "xaydung",
      description: "Thiết kế công trình, không gian sống, quy hoạch và kiến trúc bền vững.",
      careers: ["Kiến trúc sư", "Thiết kế nội thất", "Quản lý dự án"],
      salary: "14-42 triệu/tháng",
      difficulty: 8,
      employment: 85,
      combos: ["V00", "H00"]
    }
  ];

  const universities = [
    {
      id: "vku",
      name: "Đại học Công nghệ Thông tin và Truyền thông Việt - Hàn",
      shortName: "VKU",
      type: "public",
      city: "Đà Nẵng",
      region: "central",
      website: "https://vku.udn.vn",
      tuition: 18,
      students: "6.000+",
      majorsCount: 18,
      lat: 15.9756,
      lng: 108.2522,
      categories: ["cntt", "kinhte", "design"],
      cutoffs: {
        cntt: { 2023: 24.1, 2024: 24.6, 2025: 25.0 },
        ai: { 2023: 24.4, 2024: 25.0, 2025: 25.5 },
        marketing: { 2023: 22.3, 2024: 22.8, 2025: 23.1 },
        tkdh: { 2023: 21.8, 2024: 22.2, 2025: 22.6 }
      }
    },
    {
      id: "dut",
      name: "Đại học Bách khoa - Đại học Đà Nẵng",
      shortName: "DUT",
      type: "public",
      city: "Đà Nẵng",
      region: "central",
      website: "https://dut.udn.vn",
      tuition: 20,
      students: "16.000+",
      majorsCount: 40,
      lat: 16.0737,
      lng: 108.1499,
      categories: ["cntt", "kysu", "xaydung"],
      cutoffs: {
        cntt: { 2023: 26.4, 2024: 26.7, 2025: 27.0 },
        ai: { 2023: 26.5, 2024: 27.0, 2025: 27.4 },
        cokhi: { 2023: 22.5, 2024: 23.0, 2025: 23.5 },
        dientu: { 2023: 24.2, 2024: 24.8, 2025: 25.1 },
        kientruc: { 2023: 21.6, 2024: 22.0, 2025: 22.3 }
      }
    },
    {
      id: "due",
      name: "Đại học Kinh tế - Đại học Đà Nẵng",
      shortName: "DUE",
      type: "public",
      city: "Đà Nẵng",
      region: "central",
      website: "https://due.udn.vn",
      tuition: 18,
      students: "12.000+",
      majorsCount: 27,
      lat: 16.0473,
      lng: 108.2419,
      categories: ["kinhte", "luat"],
      cutoffs: {
        marketing: { 2023: 25.1, 2024: 25.5, 2025: 25.7 },
        taichinh: { 2023: 24.8, 2024: 25.1, 2025: 25.3 },
        qtkd: { 2023: 24.3, 2024: 24.9, 2025: 25.0 },
        luat: { 2023: 23.5, 2024: 24.0, 2025: 24.2 }
      }
    },
    {
      id: "ued",
      name: "Đại học Sư phạm - Đại học Đà Nẵng",
      shortName: "UED",
      type: "public",
      city: "Đà Nẵng",
      region: "central",
      website: "https://ued.udn.vn",
      tuition: 12,
      students: "9.000+",
      majorsCount: 32,
      lat: 16.0612,
      lng: 108.2138,
      categories: ["sudp", "nn"],
      cutoffs: {
        suphamtoan: { 2023: 24.5, 2024: 25.0, 2025: 25.2 },
        ngonngu_anh: { 2023: 24.0, 2024: 24.4, 2025: 24.6 }
      }
    },
    {
      id: "vnu",
      name: "Đại học Quốc gia Hà Nội",
      shortName: "VNU",
      type: "public",
      city: "Hà Nội",
      region: "north",
      website: "https://vnu.edu.vn",
      tuition: 24,
      students: "40.000+",
      majorsCount: 150,
      lat: 21.0379,
      lng: 105.7824,
      categories: ["cntt", "kinhte", "luat", "sudp", "nn", "yte"],
      cutoffs: {
        cntt: { 2023: 27.8, 2024: 28.0, 2025: 28.2 },
        ai: { 2023: 28.1, 2024: 28.4, 2025: 28.6 },
        luat: { 2023: 26.5, 2024: 26.8, 2025: 27.0 },
        ngonngu_anh: { 2023: 26.0, 2024: 26.4, 2025: 26.7 }
      }
    },
    {
      id: "hust",
      name: "Đại học Bách khoa Hà Nội",
      shortName: "HUST",
      type: "public",
      city: "Hà Nội",
      region: "north",
      website: "https://hust.edu.vn",
      tuition: 28,
      students: "35.000+",
      majorsCount: 80,
      lat: 21.0057,
      lng: 105.8431,
      categories: ["cntt", "kysu"],
      cutoffs: {
        cntt: { 2023: 28.2, 2024: 28.5, 2025: 28.7 },
        ai: { 2023: 28.4, 2024: 28.7, 2025: 29.0 },
        cokhi: { 2023: 24.7, 2024: 25.0, 2025: 25.4 },
        dientu: { 2023: 26.0, 2024: 26.4, 2025: 26.8 }
      }
    },
    {
      id: "neu",
      name: "Đại học Kinh tế Quốc dân",
      shortName: "NEU",
      type: "public",
      city: "Hà Nội",
      region: "north",
      website: "https://neu.edu.vn",
      tuition: 25,
      students: "25.000+",
      majorsCount: 35,
      lat: 21.0007,
      lng: 105.8421,
      categories: ["kinhte"],
      cutoffs: {
        marketing: { 2023: 27.5, 2024: 27.8, 2025: 28.0 },
        taichinh: { 2023: 27.2, 2024: 27.5, 2025: 27.8 },
        qtkd: { 2023: 26.8, 2024: 27.1, 2025: 27.4 }
      }
    },
    {
      id: "hmu",
      name: "Đại học Y Hà Nội",
      shortName: "HMU",
      type: "public",
      city: "Hà Nội",
      region: "north",
      website: "https://hmu.edu.vn",
      tuition: 28,
      students: "12.000+",
      majorsCount: 12,
      lat: 21.0026,
      lng: 105.8316,
      categories: ["yte"],
      cutoffs: {
        ykhoa: { 2023: 27.7, 2024: 28.0, 2025: 28.2 },
        duoc: { 2023: 25.8, 2024: 26.0, 2025: 26.2 }
      }
    },
    {
      id: "vnu-hcm",
      name: "Đại học Quốc gia TP.HCM",
      shortName: "VNU-HCM",
      type: "public",
      city: "TP.HCM",
      region: "south",
      website: "https://vnuhcm.edu.vn",
      tuition: 26,
      students: "45.000+",
      majorsCount: 120,
      lat: 10.8701,
      lng: 106.8034,
      categories: ["cntt", "kinhte", "kysu", "luat", "nn"],
      cutoffs: {
        cntt: { 2023: 27.4, 2024: 27.8, 2025: 28.0 },
        ai: { 2023: 27.8, 2024: 28.1, 2025: 28.4 },
        marketing: { 2023: 26.0, 2024: 26.3, 2025: 26.6 },
        luat: { 2023: 25.2, 2024: 25.6, 2025: 25.9 }
      }
    },
    {
      id: "uit",
      name: "Đại học Công nghệ Thông tin - ĐHQG TP.HCM",
      shortName: "UIT",
      type: "public",
      city: "TP.HCM",
      region: "south",
      website: "https://uit.edu.vn",
      tuition: 28,
      students: "10.000+",
      majorsCount: 17,
      lat: 10.8706,
      lng: 106.8031,
      categories: ["cntt"],
      cutoffs: {
        cntt: { 2023: 27.0, 2024: 27.5, 2025: 27.8 },
        ai: { 2023: 27.2, 2024: 27.7, 2025: 28.0 },
        attt: { 2023: 26.4, 2024: 26.8, 2025: 27.1 }
      }
    },
    {
      id: "ueh",
      name: "Đại học Kinh tế TP.HCM",
      shortName: "UEH",
      type: "public",
      city: "TP.HCM",
      region: "south",
      website: "https://ueh.edu.vn",
      tuition: 30,
      students: "30.000+",
      majorsCount: 51,
      lat: 10.7627,
      lng: 106.6916,
      categories: ["kinhte", "luat"],
      cutoffs: {
        marketing: { 2023: 26.7, 2024: 27.0, 2025: 27.3 },
        taichinh: { 2023: 26.2, 2024: 26.5, 2025: 26.8 },
        qtkd: { 2023: 25.8, 2024: 26.2, 2025: 26.4 }
      }
    },
    {
      id: "ump",
      name: "Đại học Y Dược TP.HCM",
      shortName: "UMP",
      type: "public",
      city: "TP.HCM",
      region: "south",
      website: "https://ump.edu.vn",
      tuition: 35,
      students: "14.000+",
      majorsCount: 14,
      lat: 10.7557,
      lng: 106.6648,
      categories: ["yte"],
      cutoffs: {
        ykhoa: { 2023: 27.3, 2024: 27.7, 2025: 27.9 },
        duoc: { 2023: 25.5, 2024: 25.8, 2025: 26.1 }
      }
    },
    {
      id: "fpt",
      name: "Đại học FPT",
      shortName: "FPTU",
      type: "private",
      city: "Nhiều cơ sở",
      region: "all",
      website: "https://daihoc.fpt.edu.vn",
      tuition: 58,
      students: "30.000+",
      majorsCount: 25,
      lat: 21.0133,
      lng: 105.5258,
      categories: ["cntt", "kinhte", "nn", "design"],
      cutoffs: {
        cntt: { 2023: 21.0, 2024: 21.0, 2025: 21.5 },
        ai: { 2023: 22.0, 2024: 22.5, 2025: 23.0 },
        marketing: { 2023: 20.0, 2024: 20.5, 2025: 21.0 },
        tkdh: { 2023: 19.5, 2024: 20.0, 2025: 20.5 },
        ngonngu_anh: { 2023: 20.0, 2024: 20.5, 2025: 21.0 }
      }
    },
    {
      id: "duytan",
      name: "Đại học Duy Tân",
      shortName: "DTU",
      type: "private",
      city: "Đà Nẵng",
      region: "central",
      website: "https://duytan.edu.vn",
      tuition: 24,
      students: "20.000+",
      majorsCount: 55,
      lat: 16.0603,
      lng: 108.2114,
      categories: ["cntt", "kinhte", "yte", "nn", "xaydung"],
      cutoffs: {
        cntt: { 2023: 18.5, 2024: 19.0, 2025: 19.5 },
        marketing: { 2023: 18.0, 2024: 18.5, 2025: 19.0 },
        ykhoa: { 2023: 22.5, 2024: 23.0, 2025: 23.5 },
        duoc: { 2023: 21.0, 2024: 21.5, 2025: 22.0 },
        kientruc: { 2023: 18.0, 2024: 18.5, 2025: 19.0 }
      }
    },
    {
      id: "vanlang",
      name: "Đại học Văn Lang",
      shortName: "VLU",
      type: "private",
      city: "TP.HCM",
      region: "south",
      website: "https://vlu.edu.vn",
      tuition: 42,
      students: "28.000+",
      majorsCount: 60,
      lat: 10.8271,
      lng: 106.6948,
      categories: ["kinhte", "design", "nn", "xaydung", "yte"],
      cutoffs: {
        marketing: { 2023: 18.5, 2024: 19.0, 2025: 19.2 },
        tkdh: { 2023: 18.0, 2024: 18.5, 2025: 19.0 },
        kientruc: { 2023: 18.0, 2024: 18.4, 2025: 18.8 },
        duoc: { 2023: 21.0, 2024: 21.4, 2025: 21.8 },
        ngonngu_anh: { 2023: 18.0, 2024: 18.5, 2025: 18.8 }
      }
    }
  ];

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

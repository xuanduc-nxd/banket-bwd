/**
 * Script Seed dữ liệu lên Supabase cho dự án UniMatch
 * Hướng dẫn sử dụng:
 * 1. Đảm bảo đã nhập các key vào file .env.local
 * 2. Chạy lệnh: node scripts/seed-supabase.js
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Đọc cấu hình từ .env.local
const envPath = path.join(__dirname, '../.env.local');
if (!fs.existsSync(envPath)) {
  console.error("❌ Không tìm thấy file .env.local. Vui lòng cấu hình trước.");
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] ? match[2].trim() : '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    }
    env[match[1]] = value;
  }
});

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || SUPABASE_URL.includes("YOUR_SUPABASE_URL_HERE")) {
  console.error("❌ Vui lòng nhập đúng thông tin NEXT_PUBLIC_SUPABASE_URL và SUPABASE_SERVICE_ROLE_KEY trong file .env.local trước.");
  process.exit(1);
}

// Khởi tạo Supabase Client với Service Role Key để bỏ qua các chính sách bảo mật ghi
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    persistSession: false
  }
});

// Hàm mô phỏng đọc file JS
function parseJsFile(filePath, varName) {
  const absolutePath = path.join(__dirname, '..', filePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`❌ Không tìm thấy file dữ liệu: ${filePath}`);
    process.exit(1);
  }
  const content = fs.readFileSync(absolutePath, 'utf8');
  // Chuyển đổi mã JS sang cấu trúc đối tượng Node.js bằng cách mô phỏng các đối tượng browser (window, document)
  try {
    const fn = new Function('window', 'document', `${content}; return ${varName};`);
    const mockDocument = {
      addEventListener: () => {},
      createElement: () => ({ appendChild: () => {}, addEventListener: () => {} }),
      querySelector: () => null,
      querySelectorAll: () => []
    };
    return fn({}, mockDocument);
  } catch (error) {
    console.error(`❌ Lỗi phân tích file ${filePath}:`, error);
    process.exit(1);
  }
}

// Dữ liệu thực tế của 6 trường đại học lớn để demo (Phương án B)
const realCutoffs = {
  hust: {
    cntt: { 2023: 28.29, 2024: 28.53, 2025: 28.85 },
    kysu: { 2023: 25.40, 2024: 25.80, 2025: 26.20 }
  },
  ftu: {
    kinhte: { 2023: 27.60, 2024: 27.80, 2025: 28.10 },
    marketing: { 2023: 27.50, 2024: 27.70, 2025: 27.90 }
  },
  neu: {
    kinhte: { 2023: 26.80, 2024: 27.10, 2025: 27.50 },
    marketing: { 2023: 27.20, 2024: 27.40, 2025: 27.70 }
  },
  vnu: {
    cntt: { 2023: 27.80, 2024: 28.00, 2025: 28.20 },
    luat: { 2023: 25.50, 2024: 25.80, 2025: 26.00 }
  },
  ueh: {
    kinhte: { 2023: 26.30, 2024: 26.60, 2025: 27.00 },
    marketing: { 2023: 26.70, 2024: 27.00, 2025: 27.30 }
  },
  ump: {
    yte: { 2023: 27.30, 2024: 27.50, 2025: 27.80 },
    duoc: { 2023: 25.80, 2024: 26.00, 2025: 26.30 }
  }
};

// Cấu hình toạ độ thực tế từ js/app-data.js
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

// Sửa lỗi gán vùng miền - Nhận diện đa cơ sở và gán vùng là "all" (Bug 2 Fix)
function getRegion(location) {
  if (!location) return "all";
  const locLower = location.toLowerCase();
  if (locLower.includes("&") || locLower.includes("và") || locLower.includes("nhiều cơ sở") || locLower.includes("toàn quốc")) {
    return "all";
  }
  const north = ["hà nội", "thái nguyên", "nghệ an", "vinh"];
  const central = ["đà nẵng", "huế", "khánh hòa", "nha trang", "quảng nam", "thanh hóa"];
  
  if (north.some(n => locLower.includes(n))) return "north";
  if (central.some(c => locLower.includes(c))) return "central";
  return "south";
}

// Logic seeded random
function seededRandom(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = Math.imul(31, hash) + str.charCodeAt(i) | 0;
  return () => { hash = Math.imul(1103515245, hash) + 12345 | 0; return ((hash >>> 16) / 0xFFFF); };
}

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
    if (region === "north") lat = 21.0;
    else if (region === "central") lat = 16.0;
    else lat = 10.5;
  }
  return lat + (rand() - 0.5) * 0.08;
}

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
    if (region === "north") lng = 105.8;
    else if (region === "central") lng = 108.0;
    else lng = 106.5;
  }
  return lng + (rand() - 0.5) * 0.08;
}

async function main() {
  console.log("🚀 Bắt đầu quá trình nạp dữ liệu lên Supabase...");

  // 1. Phân tích dữ liệu gốc
  const rawMajorsData = parseJsFile('js/majors.js', 'majorsData');
  const rawUniversitiesData = parseJsFile('js/universities.js', 'universitiesData');

  console.log(`📊 Đã đọc dữ liệu gốc: ${rawMajorsData.categories.length} danh mục, ${rawMajorsData.majors.length} ngành học, ${rawUniversitiesData.public.length} trường công lập, ${rawUniversitiesData.private.length} trường tư thục.`);

  // 2. Định nghĩa các Categories chuẩn hóa và đổi mã (nông lâm / xây dựng) theo Bug 3 Fix
  const mappedCategories = [
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

  console.log("💾 Đang ghi danh mục (categories) vào Supabase...");
  const { error: catErr } = await supabase.from('categories').upsert(mappedCategories);
  if (catErr) {
    console.error("❌ Lỗi lưu categories:", catErr.message);
    process.exit(1);
  }
  console.log("✅ Ghi danh mục (categories) thành công!");

  // 3. Chuẩn hóa và ghi Majors
  const formattedMajors = rawMajorsData.majors.map(m => {
    // Chuẩn hóa nhóm ngành theo cấu trúc danh mục mới (Bug 3)
    let category = m.category;
    if (category === "nnl") category = "nonglam";
    if (category === "kien_truc") category = "xaydung";

    // Gán tổ hợp môn thi cho từng ngành theo logic js/app-data.js
    let combos = ["A00", "A01", "D01"];
    if (category === "yte") combos = ["B00", "A00", "D07"];
    if (category === "design") combos = ["V00", "H00", "D01"];
    if (category === "luat") combos = ["C00", "D01", "D14"];
    if (category === "nn") combos = ["D01", "D14", "D15"];
    if (category === "sudp") combos = ["C00", "D01", "A00"];

    return {
      id: m.id,
      name: m.name,
      category: category,
      description: m.description || "",
      careers: m.careers || [],
      salary: m.avgSalary || "10-20 triệu/tháng",
      difficulty: m.difficulty || 5,
      employment: parseInt(m.employmentRate) || 90,
      combos: combos
    };
  });

  console.log("💾 Đang ghi ngành học (majors) vào Supabase...");
  const { error: majorErr } = await supabase.from('majors').upsert(formattedMajors);
  if (majorErr) {
    console.error("❌ Lỗi lưu majors:", majorErr.message);
    process.exit(1);
  }
  console.log("✅ Ghi ngành học thành công!");

  // 4. Chuẩn hóa và ghi Universities
  const allUnis = [
    ...rawUniversitiesData.public.map(u => ({ ...u, type: 'public' })),
    ...rawUniversitiesData.private.map(u => ({ ...u, type: 'private' }))
  ];

  const formattedUnis = [];
  const generatedCutoffs = [];
  const seenUniIds = new Set();

  allUnis.forEach(u => {
    const uniId = u.shortName.toLowerCase();
    if (seenUniIds.has(uniId)) {
      console.warn(`⚠️ Bỏ qua dòng dữ liệu trường trùng lặp ID: ${u.shortName} (${uniId})`);
      return;
    }
    seenUniIds.add(uniId);

    const rand = seededRandom(u.shortName);
    const region = getRegion(u.location);

    // Chuẩn hóa danh mục của trường (như nnl -> nonglam, kien_truc -> xaydung)
    const uniCats = (u.categories || []).map(cat => {
      if (cat === 'nnl') return 'nonglam';
      if (cat === 'kien_truc') return 'xaydung';
      return cat;
    });

    formattedUnis.push({
      id: uniId,
      name: u.name,
      short_name: u.shortName,
      type: u.type,
      city: u.location === "TP. Hồ Chí Minh" ? "TP.HCM" : u.location,
      region: region,
      website: u.website || "#",
      tuition: Math.floor(15 + rand() * 25),
      students: u.students || "10,000+",
      majors_count: parseInt(u.majors) || 20,
      lat: parseFloat(getLat(u.shortName, u.location, region, rand).toFixed(4)),
      lng: parseFloat(getLng(u.shortName, u.location, region, rand).toFixed(4)),
      categories: uniCats
    });

    // Tạo điểm chuẩn: Kết hợp phương án A và B
    // Lấy tất cả các ngành thuộc danh mục trường dạy
    const matchingMajors = formattedMajors.filter(m => uniCats.includes(m.category));

    matchingMajors.forEach(m => {
      let score2023, score2024, score2025;

      // Nếu nằm trong danh mục điểm chuẩn thật (Phương án B)
      if (realCutoffs[uniId] && realCutoffs[uniId][m.id]) {
        const schoolRealScores = realCutoffs[uniId][m.id];
        score2023 = schoolRealScores[2023];
        score2024 = schoolRealScores[2024];
        score2025 = schoolRealScores[2025];
      } else {
        // Sinh ngẫu nhiên có quy luật (Phương án A)
        const baseCutoff = 18 + rand() * 8;
        score2023 = parseFloat((baseCutoff).toFixed(1));
        score2024 = parseFloat((baseCutoff + rand() * 0.5 - 0.2).toFixed(1));
        score2025 = parseFloat((baseCutoff + rand() * 1.0 - 0.2).toFixed(1));
      }

      generatedCutoffs.push(
        { university_id: uniId, major_id: m.id, year: 2023, cutoff_score: score2023 },
        { university_id: uniId, major_id: m.id, year: 2024, cutoff_score: score2024 },
        { university_id: uniId, major_id: m.id, year: 2025, cutoff_score: score2025 }
      );
    });
  });

  console.log("💾 Đang ghi trường học (universities) vào Supabase...");
  const { error: uniErr } = await supabase.from('universities').upsert(formattedUnis);
  if (uniErr) {
    console.error("❌ Lỗi lưu universities:", uniErr.message);
    process.exit(1);
  }
  console.log("✅ Ghi trường học thành công!");

  console.log("💾 Đang ghi điểm chuẩn các năm (cutoffs) vào Supabase...");
  // Vì số lượng cutoff lớn, ta chia nhỏ mảng thành nhiều phần nhỏ (chunk) 200 bản ghi để gửi lên nhằm tránh timeout
  const chunkSize = 200;
  for (let i = 0; i < generatedCutoffs.length; i += chunkSize) {
    const chunk = generatedCutoffs.slice(i, i + chunkSize);
    const { error: cutoffErr } = await supabase.from('cutoffs').upsert(chunk);
    if (cutoffErr) {
      console.error(`❌ Lỗi ghi chunk cutoffs (${i} - ${i + chunk.length}):`, cutoffErr.message);
      process.exit(1);
    }
  }
  console.log(`✅ Ghi thành công toàn bộ ${generatedCutoffs.length} bản ghi điểm chuẩn!`);
  console.log("🎉 Hoàn tất quá trình seed dữ liệu mĩ mãn!");
}

main().catch(err => {
  console.error("❌ Đã xảy ra lỗi không mong muốn trong quá trình thực thi:", err);
});

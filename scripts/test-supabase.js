const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Đọc cấu hình từ .env.local
const envPath = path.join(__dirname, '../.env.local');
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

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function test() {
  console.log("🔍 Đang truy vấn thử bảng universities trên Supabase với order...");
  const { data, error } = await supabase.from('universities').select('*').order('name', { ascending: true });
  
  if (error) {
    console.error("❌ Lỗi truy vấn:", error.message);
  } else {
    console.log("✅ Truy vấn thành công! Số lượng dòng lấy thử:", data.length);
    console.log("Dữ liệu dòng đầu tiên:", data[0]);
  }
}

test();

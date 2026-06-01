const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

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
const SUPABASE_SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function check() {
  console.log("🔍 Đang đếm số lượng dòng trong các bảng bằng Service Role Key...");
  
  const { count: uCount, error: uErr } = await supabase.from('universities').select('*', { count: 'exact', head: true });
  const { count: mCount, error: mErr } = await supabase.from('majors').select('*', { count: 'exact', head: true });
  const { count: cCount, error: cErr } = await supabase.from('cutoffs').select('*', { count: 'exact', head: true });
  
  if (uErr) console.error("Lỗi đếm universities:", uErr.message);
  else console.log(`- Bảng universities: ${uCount} dòng`);
  
  if (mErr) console.error("Lỗi đếm majors:", mErr.message);
  else console.log(`- Bảng majors: ${mCount} dòng`);
  
  if (cErr) console.error("Lỗi đếm cutoffs:", cErr.message);
  else console.log(`- Bảng cutoffs: ${cCount} dòng`);
}

check();

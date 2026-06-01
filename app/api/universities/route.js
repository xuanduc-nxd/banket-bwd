import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  console.log("DEBUG - NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("DEBUG - NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Tồn tại" : "Rỗng");
  try {
    const { data: universities, error } = await supabase
      .from('universities')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error("DEBUG - Lỗi Supabase Query:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("DEBUG - Số dòng trường đại học tải được:", universities ? universities.length : 0);
    return NextResponse.json(universities);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

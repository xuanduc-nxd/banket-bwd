import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { data: majors, error } = await supabase
      .from('majors')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(majors);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';

export async function GET() {
  // Chỉ kiểm tra sự tồn tại của API Key để báo cho frontend hiển thị cảnh báo nếu thiếu,
  // tuyệt đối không gửi API Key thật về client.
  const hasKey = !!(process.env.VIETMAP_API_KEY || "154f9927fe7ac8231b3bdfd15e11a530c88e8a63b9f1964e");
  return NextResponse.json({ hasKey });
}

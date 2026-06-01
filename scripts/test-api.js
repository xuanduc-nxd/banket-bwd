async function test() {
  console.log("🔍 Đang gọi thử API http://localhost:3000/api/universities...");
  try {
    const res = await fetch("http://localhost:3000/api/universities");
    console.log("Mã trạng thái phản hồi (Status):", res.status);
    const data = await res.json();
    console.log("Dữ liệu trả về:", data);
  } catch (err) {
    console.error("❌ Không thể kết nối tới server:", err.message);
  }
}

test();

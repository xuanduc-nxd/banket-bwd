# UniMatch

Website tư vấn chọn nguyện vọng đại học — giao diện **Neo-Brutalism** cho Gen-Z.

## Design tokens

| Token | Value |
|-------|--------|
| Canvas | `#F9F6EE` |
| Border | `3px #000000` |
| Mustard (primary) | `#FFD23F` |
| Scholar Blue | `#3A86FF` |
| Sage Green | `#38B000` |
| Shadow | `5px 5px 0 #000` (no blur) |

Fonts: **Space Grotesk** (display), **Inter** (body).

## Tính năng UI

- Hero: `UNIMATCH: HACK SỐ PHẬN, CHỌN ĐÚNG TRƯỜNG.`
- **Aspiration Matrix**: grid 3fr · 5fr · 2fr (30/50/20), 3 khối bất đối xứng
- Thẻ trường: benchmark score, học phí, lý do match

## Bản đồ (VietMap)

Trang bản đồ **không dùng OpenStreetMap**. UniMatch dùng **VietMap** (bản đồ tuân thủ quy định Việt Nam).

1. Đăng ký API key: https://maps.vietmap.vn/console/register  
2. Điền `apiKey` trong `js/map-config.js` (mẫu: `js/map-config.example.js`)

## Chạy

Mở `index.html` trong trình duyệt. Bản đồ cần mạng (VietMap GL JS).

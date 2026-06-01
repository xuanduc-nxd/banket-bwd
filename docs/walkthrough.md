# Hướng dẫn Bàn giao Tích hợp Backend Next.js & Supabase

Dự án **UniMatch** đã được chuyển đổi thành công từ cấu trúc tĩnh sang dự án **Next.js Full-stack** tích hợp cơ sở dữ liệu **Supabase (PostgreSQL)**, đồng thời khắc phục các lỗi nghiệp vụ dữ liệu ban đầu. Dữ liệu đã được nạp (seed) thành công và kết nối trực tiếp đến Supabase theo thời gian thực (live).

---

## 📂 Cấu trúc thư mục dự án (Project Directory Structure)

Dưới đây là sơ đồ cấu trúc các thư mục và file được tạo ra trong dự án **UniMatch**:

```text
BestWebDesign/
├── .env.example
├── .env.local
├── .gitignore
├── next.config.mjs
├── package.json
├── package-lock.json
├── setup.bat
├── supabase-schema.sql
├── index.html
├── README.md
├── app/
│   ├── api/
│   │   ├── debug/
│   │   │   └── route.js
│   │   ├── majors/
│   │   │   └── route.js
│   │   ├── map-key/
│   │   │   └── route.js
│   │   ├── match/
│   │   │   └── route.js
│   │   ├── universities/
│   │   │   └── route.js
│   │   └── vietmap-proxy/
│   │       └── route.js
│   ├── majors/
│   │   └── page.js
│   ├── map/
│   │   └── page.js
│   ├── universities/
│   │   └── page.js
│   ├── layout.js
│   └── page.js
├── components/
│   ├── DynamicBackground.js
│   ├── Footer.js
│   ├── Header.js
│   ├── footer.html
│   └── header.html
├── css/
│   ├── base.css
│   ├── components.css
│   ├── layout.css
│   ├── pages.css
│   ├── responsive.css
│   └── style.css
├── docs/
│   ├── Thiet_ke_de_tai_UniMatch.doc
│   └── walkthrough.md
├── js/
│   ├── app-data.js
│   ├── app.js
│   ├── index-effects.js
│   ├── main.js
│   ├── majors-page.js
│   ├── majors.js
│   ├── map-config.example.js
│   ├── map-config.js
│   ├── map-page.js
│   ├── smart-match.js
│   ├── subject-data.js
│   ├── subject-groups.js
│   ├── three-scene.js
│   ├── universities-page.js
│   └── universities.js
├── lib/
│   └── supabase.js
├── pages/
│   ├── majors.html
│   ├── map.html
│   └── universities.html
└── scripts/
    ├── check-db.js
    ├── seed-supabase.js
    ├── test-api.js
    └── test-supabase.js
```

---

## 🚀 AI Assistant Setup Prompt (for Cursor / Antigravity)

If you are continuing development of this project with Cursor, Antigravity, or another AI coding assistant, copy and paste the following prompt to quickly onboard the AI:

> **System Prompt / Context for AI Assistant:**
>
> You are working on the **UniMatch** project, a Next.js (App Router) full-stack application migrated from a static HTML/CSS/JS prototype.
>
> Key Technical Constraints & Architecture:
>
> 1. **Database Backend**: Powered by Supabase (PostgreSQL). The tables include `categories`, `majors`, `universities`, `cutoffs`, `user_bookmarks`, and `user_drafts`. RLS policies are enabled: public read-only access for master data; strict owner-only access (using `auth.uid()`) for bookmarks and drafts.
> 2. **Authentication & Data Synchronization**:
>    - Uses **Supabase Auth (Google OAuth 2.0)** for single-click sign-in.
>    - The global `Header.js` component tracks the auth state and clears all local storage keys (such as drafts, bookmarks, and comparison states) whenever the `SIGNED_OUT` event is triggered to prevent cross-user state pollution.
>    - `app/page.js` utilizes a synchronizer effect with an `isSyncCompleted` state flag to prevent client-side default states from overwriting database records during login and page mount. It also aborts saves if the form is empty/unset (`combination` is empty).
> 3. **VietMap Map API Secure Proxy (CRITICAL)**:
>    - To keep the client secure and avoid exposing the `VIETMAP_API_KEY` in the browser, all map requests (style stylesheet, map vector tiles, sprites, glyphs) are proxied through the server-side Next.js route `/api/vietmap-proxy?url=...`.
>    - The backend route handler `/api/vietmap-proxy/route.js` appends the secret `VIETMAP_API_KEY` from the server's environment variables to the request and rewrites URLs in `style.json` to flow through the proxy itself.
>    - `/api/map-key` only returns `{ hasKey: boolean }` for warning checks and does NOT expose the key. The frontend map is initialized using `/api/vietmap-proxy?url=style.json` directly.
> 4. **Next.js Fetch Cache Override**: Next.js patches the global `fetch` API. To prevent Next.js from caching Supabase query responses statically, the Supabase client in `lib/supabase.js` is configured with a custom fetch wrapper using `cache: 'no-store'`. Always use this shared client for database interactions.
> 5. **Styling System**: Styled strictly using Vanilla CSS with a Neo-Brutalism theme. Do NOT use Tailwind CSS unless explicitly requested.
>
> Refer to the schema in `supabase-schema.sql` and seeding logic in `scripts/seed-supabase.js` for database details.

---

## 🛠️ Các thay đổi đã thực hiện

1. **Cấu trúc dự án Next.js:**
   - Tạo file [package.json](..../BestWebDesign/package.json) chứa các dependencies (Next.js, React, Supabase SDK).
   - Tạo file [next.config.mjs](..../BestWebDesign/next.config.mjs) để quản lý cấu hình.
   - Tạo cấu hình biến môi trường [.env.local](..../BestWebDesign/.env.local) chứa cấu hình Supabase và VietMap API key.

2. **Khởi tạo Database & Seed Dữ liệu:**
   - Thiết kế file [supabase-schema.sql](..../BestWebDesign/supabase-schema.sql) tạo các bảng `categories`, `majors`, `universities`, `cutoffs` và thiết lập chính sách bảo mật RLS đọc công khai.
   - Viết script [scripts/seed-supabase.js](..../BestWebDesign/scripts/seed-supabase.js) tự động đọc, chuẩn hóa dữ liệu từ file JS cũ (sửa lỗi phân vùng và lệch mã ngành), kết hợp điểm chuẩn thật (Bách Khoa, Ngoại Thương,...) và điểm mô phỏng, nạp trực tiếp lên Supabase.

3. **Hệ thống API Route Handlers:**
   - [app/api/universities/route.js](..../BestWebDesign/app/api/universities/route.js): API lấy toàn bộ danh sách trường từ database phục vụ trang bản đồ/tra cứu.
   - [app/api/majors/route.js](..../BestWebDesign/app/api/majors/route.js): API lấy danh sách ngành học.
   - [app/api/match/route.js](..../BestWebDesign/app/api/match/route.js): API thực hiện thuật toán tính toán độ tương thích nguyện vọng thông minh từ database.
   - [app/api/map-key/route.js](..../BestWebDesign/app/api/map-key/route.js): Bảo mật VietMap API key, cung cấp động từ server.

4. **React- hóa Giao diện (App Router):**
   - [app/layout.js](..../BestWebDesign/app/layout.js): Layout toàn cục nạp CSS Brutalism và [components/DynamicBackground.js](..../BestWebDesign/components/DynamicBackground.js) (hiệu ứng nền).
   - [app/page.js](..../BestWebDesign/app/page.js): Trang chủ với form Smart Match 4 bước, khôi phục bản thảo tự động, và **thanh Tab lọc kết quả mới** sửa lỗi nuốt trường an toàn (Bug 1).
   - [app/majors/page.js](..../BestWebDesign/app/majors/page.js): Trang tra cứu ngành, quiz tư vấn nghề, so sánh, bookmark.
   - [app/universities/page.js](..../BestWebDesign/app/universities/page.js): Trang tra cứu trường, so sánh và lưu yêu thích.
   - [app/map/page.js](..../BestWebDesign/app/map/page.js): Trang bản đồ kết hợp VietMap GL JS hiển thị ghim trường và đồng bộ bộ lọc.

---

## 🔍 Chẩn đoán & Sửa lỗi Bộ nhớ đệm (Next.js Caching Bug)

Trong quá trình tích hợp, đã phát hiện và xử lý thành công lỗi nghiêm trọng: **API Route trả về mảng rỗng `[]` mặc dù Database đã seed đầy đủ dữ liệu.**

### Nguyên nhân

1. Next.js tự động đè lên hàm `globalThis.fetch` toàn cục để tối ưu hóa hiệu năng bằng cách lưu cache dữ liệu.
2. Vì thư viện Supabase JS SDK sử dụng `fetch` toàn cục để gửi request REST tới Supabase PostgREST, các truy vấn API của Supabase (như sắp xếp theo tên `.order('name')`) đã bị Next.js cache lại kết quả rỗng từ lúc database chưa seed dữ liệu.

### Giải pháp khắc phục

Chúng tôi đã cấu hình trực tiếp client Supabase tại [lib/supabase.js](..../BestWebDesign/lib/supabase.js) để buộc sử dụng tùy chọn `cache: 'no-store'` cho mọi HTTP request:

```javascript
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: (url, options) => {
      return fetch(url, {
        ...options,
        cache: 'no-store', // Không lưu cache, luôn truy vấn trực tiếp từ Supabase
      });
    },
  },
});
```

---

## 📦 Lệnh Cài đặt và Khởi tạo dự án (Setup Commands)

Dự án hiện đã tích hợp sẵn các tập lệnh và script hỗ trợ tự động cài đặt nhanh chóng. Vì các file cấu hình chứa API key nhạy cảm (`.env.local`) không được đẩy lên GitHub để bảo mật, thành viên khác khi clone dự án về cần thực hiện cấu hình theo các bước sau:

### Bước 1: Tạo file cấu hình môi trường (.env.local) [Độ khó: Dễ 🟢]

- Tại thư mục gốc của dự án, copy file [.env.example](..../BestWebDesign/.env.example) và đổi tên thành `.env.local`.
- Mở file `.env.local` mới tạo và điền các API key tương ứng của Supabase và VietMap của bạn vào.

### Bước 2: Cài đặt và chạy dự án [Độ khó: Dễ 🟢]

#### Cách 1: Sử dụng file Setup script (Dành cho Windows)

Bạn chỉ cần chạy file script [setup.bat](..../BestWebDesign/setup.bat) ở thư mục gốc của dự án. Script này sẽ:

1. Tự động chạy `npm install` để cài đặt tất cả các thư viện cần thiết.
2. Kiểm tra sự tồn tại của file cấu hình `.env.local`.
3. Tự động chạy script seed để nạp dữ liệu lên Supabase.

#### Cách 2: Sử dụng các câu lệnh NPM (NPM Commands)

Or bạn có thể chạy thủ công bằng các câu lệnh đã cấu hình sẵn trong [package.json](..../BestWebDesign/package.json):

- **Cài đặt thư viện**: `npm run setup` (hoặc `npm install`)
- **Nạp dữ liệu (Seed)**: `npm run seed`
- **Khởi chạy môi trường phát triển**: `npm run dev`

---

## 📋 Kiểm thử và Xác minh thực tế (Verification)

- **Chạy thử nghiệm SQL**: Thực hiện cập nhật tên trường học trực tiếp bằng câu lệnh SQL UPDATE trên database Supabase Console, kết quả thay đổi hiển thị ngay lập tức trên giao diện local (`http://localhost:3000/universities`) sau khi Reload (F5).
- **Các API Handlers**: Toàn bộ API `/api/universities`, `/api/majors`, và `/api/match` đều phản hồi đúng dữ liệu thời gian thực từ Supabase Cloud.

---

## 🛡️ Giai đoạn C: Bảo mật API Key VietMap (Secure Proxy Routing)

Để ngăn chặn việc lộ VietMap API Key ở phía client (bị kiểm tra F12 hoặc bắt gói tin HTTP), chúng tôi đã xây dựng hệ thống proxy trung gian bảo mật tuyệt đối:

### 1. Che giấu API Key qua Proxy API ([app/api/vietmap-proxy/route.js](..../BestWebDesign/app/api/vietmap-proxy/route.js))

- Tạo route handler ở backend đóng vai trò là một proxy an toàn. Mọi request tải tài nguyên bản đồ từ client (stylesheets, tiles vector, sprites, glyphs) sẽ đi qua API này.
- API Key thực sự (`VIETMAP_API_KEY`) được lưu trữ bảo mật dưới dạng biến môi trường trên server (`.env.local`) và chỉ được gắn vào URL khi server thực hiện `fetch` dữ liệu từ VietMap.
- Đối với file cấu hình bản đồ `style.json`, proxy sẽ tự động phân tích và viết lại (rewrite) toàn bộ các đường dẫn tài nguyên gốc của VietMap thành dạng đi qua proxy cục bộ (`/api/vietmap-proxy?url=...`), đồng thời loại bỏ sạch query parameter `apikey` ban đầu.

### 2. Loại bỏ Endpoint nhạy cảm ([app/api/map-key/route.js](..../BestWebDesign/app/api/map-key/route.js))

- Thay đổi API trả về key ban đầu. Hiện tại, API này chỉ trả về trạng thái boolean `{ hasKey: true/false }` để frontend hiển thị cảnh báo nếu chưa cấu hình biến môi trường, tuyệt đối không gửi API Key thật về trình duyệt.

### 3. Tích hợp phía Client ([app/map/page.js](..../BestWebDesign/app/map/page.js))

- Bản đồ trên client sử dụng trực tiếp địa chỉ proxy an toàn làm cấu hình:
  `const styleUrl = "/api/vietmap-proxy?url=" + encodeURIComponent("https://maps.vietmap.vn/maps/styles/tm/style.json");`
- Client hoàn toàn không còn bất kỳ dòng code hay request nào chứa API Key thật, giúp bảo mật tuyệt đối tài khoản VietMap của bạn.

---

## 🔐 Giai đoạn B: Hệ thống Tài khoản & Đồng bộ dữ liệu (Authentication & User Persistence)

Chúng tôi đã thiết lập thành công hệ thống tài khoản và đồng bộ dữ liệu thông qua **Supabase Auth (Google OAuth 2.0)**:

### 1. Tạo bảng và cấu hình RLS trên Supabase [Độ khó: Dễ 🟢]

- Copy toàn bộ nội dung file [supabase-schema.sql](..../BestWebDesign/supabase-schema.sql) và dán vào Supabase SQL Editor, sau đó bấm **Run** để khởi tạo các bảng `user_bookmarks`, `user_drafts` cùng các chính sách bảo mật RLS bảo vệ dữ liệu theo tài khoản.

### 2. Thiết lập Google OAuth 2.0 [Độ khó: Trung bình 🟡]

- **Tại Google Cloud Console**: Tạo Credentials -> OAuth client ID (Web application), thêm Authorised redirect URIs dạng `https://<your-project-ref>.supabase.co/auth/v1/callback`.
- **Tại Supabase Dashboard**: Vào Authentication -> Providers -> Google, bật trạng thái **Enabled**, nhập Client ID và Client Secret lấy từ Google Cloud.
- **Lưu ý cấu hình redirect URL**: Nút đăng nhập trong [components/Header.js](..../BestWebDesign/components/Header.js) được viết động sử dụng `window.location.origin` nên khi chuyển giao cấu hình trên môi trường local khác hoặc khi đưa lên hosting production, việc chuyển hướng sau đăng nhập sẽ tự động chạy chính xác mà không cần chỉnh sửa code.

### 3. Logic đồng bộ hóa dữ liệu (Sync)

- **Đồng bộ hóa Bookmarks**: Tự động gộp (merge) danh sách trường học đã lưu trong `localStorage` với dữ liệu trên database Supabase khi người dùng thực hiện đăng nhập.
- **Đồng bộ hóa Bản nháp (Form Draft)**: Lưu trữ và đồng bộ hóa trạng thái form nhập điểm/bản thảo nguyện vọng lên database. Khi người dùng đăng nhập trên thiết bị khác, dữ liệu sẽ tự động được khôi phục.
- **Khắc phục lỗi Ghi đè/Mất tiến độ khi Đăng nhập lại**:
  - *Vấn đề*: Khi đăng xuất, các state trên màn hình bị xóa sạch. Do React batching hoặc race condition trong quá trình cập nhật trạng thái auth, side-effect lưu dữ liệu (`saveDraftLocalAndDb`) có thể chạy với trạng thái rỗng trước khi state `user` hoàn toàn chuyển sang `null`, dẫn đến việc ghi đè bản nháp rỗng lên database.
  - *Giải pháp*:
    1. Đặt trạng thái đồng bộ hóa `isSyncCompleted` thành `false` ngay khi bắt đầu tiến trình `syncDrafts` để chặn hiệu ứng tự động lưu bản thảo (`saveDraftLocalAndDb`) ghi đè dữ liệu cũ.
    2. Thêm điều kiện kiểm tra `if (!combination) return;` trong `saveDraftLocalAndDb`. Khi form trống hoàn toàn (như lúc vừa Đăng xuất hoặc Reset), hàm sẽ không tự động ghi dữ liệu trống lên local storage hay database, bảo toàn nguyên vẹn bản thảo cũ đã lưu trên mây. Giao diện sau khi Đăng nhập lại sẽ luôn khôi phục thành công tiến độ cũ.

---

## 📋 Kiểm thử và Xác minh Giai đoạn B (Verification) [Độ khó: Dễ 🟢]

- **Kiểm thử Đăng nhập Google**: Nhấp vào nút **Đăng nhập Google** trên Header, tiến hành đăng nhập bằng tài khoản Google của bạn. Kiểm tra xem avatar và tên của bạn có hiển thị đúng trên Header không.
- **Kiểm thử đồng bộ Bookmarks**: Lưu thích trường học khi chưa đăng nhập, sau đó tiến hành đăng nhập Google và kiểm tra xem danh sách đã lưu có được gộp đồng bộ lên bảng `user_bookmarks` của tài khoản đó trong Supabase không.
- **Kiểm thử đồng bộ Bản thảo**: Điền form Smart Match, tiến hành đăng nhập, mở một trình duyệt khác (hoặc ẩn danh) đăng nhập cùng tài khoản Google đó để kiểm tra xem cấu hình form cũ có tự động hiển thị lại đầy đủ không.

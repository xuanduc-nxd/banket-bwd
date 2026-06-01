-- SQL Schema cho dự án UniMatch
-- Truy cập Supabase Dashboard -> SQL Editor -> New Query -> Dán toàn bộ mã này vào và nhấn Run.

-- 1. Xóa các bảng cũ nếu tồn tại (để làm sạch dữ liệu cũ khi tạo lại)
DROP TABLE IF EXISTS cutoffs CASCADE;

DROP TABLE IF EXISTS universities CASCADE;

DROP TABLE IF EXISTS majors CASCADE;

DROP TABLE IF EXISTS categories CASCADE;

-- 2. Bảng danh mục ngành học
CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT NOT NULL
);

-- 3. Bảng ngành học
CREATE TABLE majors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT REFERENCES categories(id) ON DELETE SET NULL,
    description TEXT,
    careers TEXT[],
    salary TEXT,
    difficulty INT,
    employment INT,
    combos TEXT[]
);

-- 4. Bảng trường đại học
CREATE TABLE universities (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    short_name TEXT NOT NULL,
    type TEXT CHECK (type IN ('public', 'private')),
    city TEXT NOT NULL,
    region TEXT CHECK (region IN ('north', 'central', 'south', 'all')),
    website TEXT DEFAULT '#',
    tuition INT,
    students TEXT,
    majors_count INT,
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    categories TEXT[]
);

-- 5. Bảng điểm chuẩn các năm
CREATE TABLE cutoffs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    university_id TEXT REFERENCES universities (id) ON DELETE CASCADE,
    major_id TEXT REFERENCES majors (id) ON DELETE CASCADE,
    year INT NOT NULL,
    cutoff_score DOUBLE PRECISION NOT NULL,
    UNIQUE (university_id, major_id, year)
);

-- Bật tính năng bảo mật hàng (Row Level Security - RLS) cho các bảng (Tùy chọn)
-- Đối với dự án thử nghiệm/đọc dữ liệu công khai, chúng ta cho phép Read công khai:
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

ALTER TABLE majors ENABLE ROW LEVEL SECURITY;

ALTER TABLE universities ENABLE ROW LEVEL SECURITY;

ALTER TABLE cutoffs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on categories" ON categories FOR
SELECT USING (true);

CREATE POLICY "Allow public read access on majors" ON majors FOR
SELECT USING (true);

CREATE POLICY "Allow public read access on universities" ON universities FOR
SELECT USING (true);

CREATE POLICY "Allow public read access on cutoffs" ON cutoffs FOR
SELECT USING (true);

-- Tắt RLS để cho phép Client đọc dữ liệu công khai từ các bảng
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;

ALTER TABLE majors DISABLE ROW LEVEL SECURITY;

ALTER TABLE universities DISABLE ROW LEVEL SECURITY;

ALTER TABLE cutoffs DISABLE ROW LEVEL SECURITY;

-- ==========================================
-- GIAI ĐOẠN B: AUTHENTICATION & USER PERSISTENCE
-- ==========================================

-- 1. Bảng lưu danh sách trường học đã thích (bookmarks) của người dùng
CREATE TABLE IF NOT EXISTS user_bookmarks (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    university_id TEXT NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (user_id, university_id)
);

-- 2. Bảng lưu bản nháp cấu hình nguyện vọng (form draft) của người dùng
CREATE TABLE IF NOT EXISTS user_drafts (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    draft_data JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Kích hoạt Row Level Security (RLS) để bảo vệ dữ liệu người dùng
ALTER TABLE user_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_drafts ENABLE ROW LEVEL SECURITY;

-- 4. Tạo các chính sách (Policies) để người dùng chỉ được quản lý dữ liệu của chính họ
CREATE POLICY "Users can manage their own bookmarks" ON user_bookmarks
    FOR ALL TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own drafts" ON user_drafts
    FOR ALL TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
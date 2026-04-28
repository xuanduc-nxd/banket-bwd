// University Data - All universities in Vietnam with Categories
const universitiesData = {
  public: [
    {
      name: "Đại học Quốc gia Hà Nội",
      shortName: "VNU",
      location: "Hà Nội",
      website: "https://vnu.edu.vn",
      students: "40,000+",
      majors: "150+",
      rank: "Top 1",
      type: "Đại học Quốc gia",
      categories: ["cntt", "kinhte", "yte", "kysu", "luat", "sudp", "nn", "toan"]
    },
    {
      name: "Đại học Quốc gia TP.HCM",
      shortName: "VNU-HCM",
      location: "TP. Hồ Chí Minh",
      website: "https://vnu.edu.vn/hcm",
      students: "45,000+",
      majors: "120+",
      rank: "Top 2",
      type: "Đại học Quốc gia",
      categories: ["cntt", "kinhte", "yte", "kysu", "luat", "sudp", "nn"]
    },
    {
      name: "Đại học Bách Khoa Hà Nội",
      shortName: "HUST",
      location: "Hà Nội",
      website: "https://hust.edu.vn",
      students: "35,000+",
      majors: "80+",
      rank: "Top 3",
      type: "Đại học Bách khoa",
      categories: ["cntt", "kysu", "toan", "co_khi", "dien"]
    },
    {
      name: "Đại học Kinh tế Quốc dân",
      shortName: "NEU",
      location: "Hà Nội",
      website: "https://neu.edu.vn",
      students: "20,000+",
      majors: "30+",
      rank: "Top 4",
      type: "Đại học Kinh tế",
      categories: ["kinhte", "tai_chinh", "kinh_te"]
    },
    {
      name: "Đại học Ngoại Thương",
      shortName: "FTU",
      location: "Hà Nội & TP.HCM",
      website: "https://ftu.edu.vn",
      students: "15,000+",
      majors: "25+",
      rank: "Top 5",
      type: "Đại học Nghiệp vụ",
      categories: ["kinhte", "nn", "marketing", "luat"]
    },
    {
      name: "Đại học Bách Khoa TP.HCM",
      shortName: "HCMUT",
      location: "TP. Hồ Chí Minh",
      website: "https://hcmut.edu.vn",
      students: "30,000+",
      majors: "70+",
      rank: "Top 6",
      type: "Đại học Bách khoa",
      categories: ["cntt", "kysu", "toan", "co_khi"]
    },
    {
      name: "Đại học Kinh tế TP.HCM",
      shortName: "UEH",
      location: "TP. Hồ Chí Minh",
      website: "https://ueh.edu.vn",
      students: "20,000+",
      majors: "28+",
      rank: "Top 7",
      type: "Đại học Kinh tế",
      categories: ["kinhte", "tai_chinh", "marketing"]
    },
    {
      name: "Đại học Sư phạm Hà Nội",
      shortName: "HNUE",
      location: "Hà Nội",
      website: "https://hnue.edu.vn",
      students: "25,000+",
      majors: "40+",
      rank: "Top 8",
      type: "Đại học Sư phạm",
      categories: ["sudp", "giao_duc"]
    },
    {
      name: "Đại học Sư phạm TP.HCM",
      shortName: "HCMUP",
      location: "TP. Hồ Chí Minh",
      website: "https://hcmup.edu.vn",
      students: "22,000+",
      majors: "35+",
      rank: "Top 9",
      type: "Đại học Sư phạm",
      categories: ["sudp", "giao_duc"]
    },
    {
      name: "Đại học Y Hà Nội",
      shortName: "HMU",
      location: "Hà Nội",
      website: "https://hmu.edu.vn",
      students: "12,000+",
      majors: "8+",
      rank: "Top 10",
      type: "Đại học Y",
      categories: ["yte", "duoc", "y_te"]
    },
    {
      name: "Đại học Y dược TP.HCM",
      shortName: "UMP",
      location: "TP. Hồ Chí Minh",
      website: "https://ump.edu.vn",
      students: "14,000+",
      majors: "10+",
      rank: "Top 12",
      type: "Đại học Y",
      categories: ["yte", "duoc", "y_te"]
    },
    {
      name: "Đại học Cần Thơ",
      shortName: "CTU",
      location: "Cần Thơ",
      website: "https://ctu.edu.vn",
      students: "22,000+",
      majors: "60+",
      rank: "Top 10 miền Nam",
      type: "Đại học Đa ngành",
      categories: ["cntt", "kinhte", "kysu", "nnl", "yte"]
    },
    {
      name: "Đại học Đà Nẵng",
      shortName: "UDN",
      location: "Đà Nẵng",
      website: "https://udn.vn",
      students: "20,000+",
      majors: "55+",
      rank: "Top 12 miền Trung",
      type: "Đại học Đa ngành",
      categories: ["cntt", "kinhte", "kysu", "sudp", "nnl"]
    },
    {
      name: "Đại học Bách khoa Đà Nẵng",
      shortName: "DUT",
      location: "Đà Nẵng",
      website: "https://dut.udn.vn",
      students: "16,000+",
      majors: "40+",
      rank: "Top 20 miền Trung",
      type: "Đại học Bách khoa",
      categories: ["cntt", "kysu", "co_khi", "dien"]
    },
    {
      name: "Đại học Sư phạm Đà Nẵng",
      shortName: "DNP",
      location: "Đà Nẵng",
      website: "https://dnuedp.edu.vn",
      students: "12,000+",
      majors: "30+",
      rank: "Top 25 miền Trung",
      type: "Đại học Sư phạm",
      categories: ["sudp", "giao_duc", "nn"]
    },
    {
      name: "Đại học Kinh tế Đà Nẵng",
      shortName: "DUE",
      location: "Đà Nẵng",
      website: "https://due.udn.vn",
      students: "8,000+",
      majors: "15+",
      rank: "Top 30 miền Trung",
      type: "Đại học Kinh tế",
      categories: ["kinhte", "tai_chinh", "marketing"]
    },
    {
      name: "Đại học Ngoại ngữ Đà Nẵng",
      shortName: "DFH",
      location: "Đà Nẵng",
      website: "https://dfh.udn.vn",
      students: "6,000+",
      majors: "12+",
      rank: "Top 35 miền Trung",
      type: "Đại học Ngôn ngữ",
      categories: ["nn", "du_lich", "marketing"]
    },
    {
      name: "Đại học Luật Đà Nẵng",
      shortName: "DUL",
      location: "Đà Nẵng",
      website: "https://dul.udn.vn",
      students: "4,000+",
      majors: "5+",
      rank: "Top 40 miền Trung",
      type: "Đại học Luật",
      categories: ["luat", "phap_ly", "hanh_chinh"]
    },
    {
      name: "Đại học Sư phạm Kỹ thuật Đà Nẵng",
      shortName: "UTE",
      location: "Đà Nẵng",
      website: "https://ute.udn.vn",
      students: "8,000+",
      majors: "20+",
      rank: "Top 30 miền Trung",
      type: "Đại học Sư phạm Kỹ thuật",
      categories: ["sudp", "kysu", "co_khi", "dien", "cntt"]
    },
    {
      name: "Đại học Việt Hàn",
      shortName: "VKU",
      location: "Đà Nẵng",
      website: "https://vku.udn.vn",
      students: "6,000+",
      majors: "18+",
      rank: "Top 35 miền Trung",
      type: "Đại học Việt-Hàn",
      categories: ["cntt", "kinhte", "kien_truc", "design", "kysu"]
    },
    {
      name: "Đại học Sân khấu - Điện ảnh TP.HCM",
      shortName: "DSA",
      location: "TP. Hồ Chí Minh",
      website: "https://dsa.edu.vn",
      students: "2,000+",
      majors: "8+",
      rank: "Top 50",
      type: "Đại học Nghệ thuật",
      categories: ["nangsong", "am_nhac", "my_thuat"]
    },
    {
      name: "Đại học Công nghệ Thông tin TP.HCM",
      shortName: "UIT",
      location: "TP. Hồ Chí Minh",
      website: "https://uit.edu.vn",
      students: "10,000+",
      majors: "12+",
      rank: "Top 10 CNTT",
      type: "Đại học Công nghệ",
      categories: ["cntt", "toan", "kien_truc"]
    },
    {
      name: "Đại học Sư phạm Kỹ thuật TP.HCM",
      shortName: "HCMUTE",
      location: "TP. Hồ Chí Minh",
      website: "https://hcmute.edu.vn",
      students: "15,000+",
      majors: "25+",
      rank: "Top 20",
      type: "Đại học Sư phạm Kỹ thuật",
      categories: ["sudp", "kysu", "co_khi", "dien"]
    },
    {
      name: "Đại học Tài chính - Marketing",
      shortName: "UFM",
      location: "TP. Hồ Chí Minh",
      website: "https://ufm.edu.vn",
      students: "10,000+",
      majors: "15+",
      rank: "Top 25",
      type: "Đại học Tài chính",
      categories: ["tai_chinh", "marketing", "kinhte"]
    },
    {
      name: "Đại học Giao thông Vận tải TP.HCM",
      shortName: "UTT",
      location: "TP. Hồ Chí Minh",
      website: "https://utt.edu.vn",
      students: "8,000+",
      majors: "18+",
      rank: "Top 35",
      type: "Đại học Kỹ thuật",
      categories: ["giao_thong", "kysu", "logistics"]
    },
    {
      name: "Đại học Luật TP.HCM",
      shortName: "ULAW",
      location: "TP. Hồ Chí Minh",
      website: "https://law.ueh.edu.vn",
      students: "6,000+",
      majors: "5+",
      rank: "Top 15 Luật",
      type: "Đại học Luật",
      categories: ["luat", "phap_ly", "hanh_chinh"]
    },
    {
      name: "Đại học Kiến trúc TP.HCM",
      shortName: "UAH",
      location: "TP. Hồ Chí Minh",
      website: "https://uah.edu.vn",
      students: "5,000+",
      majors: "10+",
      rank: "Top 20 Kiến trúc",
      type: "Đại học Kiến trúc",
      categories: ["kien_truc", "xay_dung", "design"]
    },
    {
      name: "Đại học Nông Lâm TP.HCM",
      shortName: "NLU",
      location: "TP. Hồ Chí Minh",
      website: "https://nlu.edu.vn",
      students: "10,000+",
      majors: "25+",
      rank: "Top 25",
      type: "Đại học Nông nghiệp",
      categories: ["nnl", "sinh_vat", "nong_nghiep"]
    },
    {
      name: "Đại học Mỹ thuật TP.HCM",
      shortName: "FAH",
      location: "TP. Hồ Chí Minh",
      website: "https://fah.ueh.edu.vn",
      students: "2,000+",
      majors: "8+",
      rank: "Top 25 Nghệ thuật",
      type: "Đại học Mỹ thuật",
      categories: ["my_thuat", "design", "nangsong"]
    },
    {
      name: "Đại học Mở TP.HCM",
      shortName: "HCMOU",
      location: "TP. Hồ Chí Minh",
      website: "https://ou.edu.vn/hcm",
      students: "15,000+",
      majors: "30+",
      rank: "Top 20 Đa ngành",
      type: "Đại học Đa ngành",
      categories: ["kinhte", "cntt", "luat", "sudp"]
    },
    {
      name: "Đại học Thủ Dầu Một",
      shortName: "TDMU",
      location: "Bình Dương",
      website: "https://tdmu.edu.vn",
      students: "12,000+",
      majors: "25+",
      rank: "Top 25 miền Nam",
      type: "Đại học Đa ngành",
      categories: ["kinhte", "cntt", "kysu"]
    },
    {
      name: "Đại học Tôn Đức Thắng",
      shortName: "TDT",
      location: "TP. Hồ Chí Minh",
      website: "https://tdtu.edu.vn",
      students: "18,000+",
      majors: "40+",
      rank: "Top 15 miền Nam",
      type: "Đại học Tự chủ",
      categories: ["kinhte", "kysu", "cntt", "sudp"]
    },
    {
      name: "Đại học Huế",
      shortName: "HUE",
      location: "Huế",
      website: "https://hueuni.edu.vn",
      students: "15,000+",
      majors: "45+",
      rank: "Top 15 miền Trung",
      type: "Đại học Đa ngành",
      categories: ["kinhte", "sudp", "nnl", "yte"]
    },
    {
      name: "Đại học Vinh",
      shortName: "VNUH",
      location: "Nghệ An",
      website: "https://vinhuni.edu.vn",
      students: "16,000+",
      majors: "50+",
      rank: "Top 20 miền Trung",
      type: "Đại học Đa ngành",
      categories: ["kinhte", "sudp", "nnl", "kysu"]
    },
    {
      name: "Đại học Thái Nguyên",
      shortName: "TNU",
      location: "Thái Nguyên",
      website: "https://tnu.edu.vn",
      students: "14,000+",
      majors: "40+",
      rank: "Top 25 miền Bắc",
      type: "Đại học Đa ngành",
      categories: ["cntt", "kinhte", "kysu", "nnl"]
    },
    {
      name: "Đại học Luật Hà Nội",
      shortName: "HLU",
      location: "Hà Nội",
      website: "https://hlu.edu.vn",
      students: "8,000+",
      majors: "5+",
      rank: "Top 15",
      type: "Đại học Luật",
      categories: ["luat", "phap_ly"]
    },
    {
      name: "Đại học Nông nghiệp Hà Nội",
      shortName: "VNUA",
      location: "Hà Nội",
      website: "https://vnua.edu.vn",
      students: "18,000+",
      majors: "50+",
      rank: "Top 20",
      type: "Đại học Nông nghiệp",
      categories: ["nnl", "sinh_vat", "nong_nghiep"]
    },
    {
      name: "Đại học Công nghiệp TP.HCM",
      shortName: "IUH",
      location: "TP. Hồ Chí Minh",
      website: "https://iuh.edu.vn",
      students: "28,000+",
      majors: "50+",
      rank: "Top 18",
      type: "Đại học Kỹ thuật",
      categories: ["kysu", "co_khi", "dien", "cntt"]
    },
    {
      name: "Đại học Công nghiệp Hà Nội",
      shortName: "HUI",
      location: "Hà Nội",
      website: "https://hui.edu.vn",
      students: "25,000+",
      majors: "45+",
      rank: "Top 22",
      type: "Đại học Kỹ thuật",
      categories: ["kysu", "co_khi", "dien", "cntt"]
    },
    {
      name: "Đại học Ngân hàng TP.HCM",
      shortName: "HUB",
      location: "TP. Hồ Chí Minh",
      website: "https://hub.edu.vn",
      students: "12,000+",
      majors: "15+",
      rank: "Top 25",
      type: "Đại học Tài chính",
      categories: ["tai_chinh", "kinhte", "ngan_hang"]
    },
    {
      name: "Học viện Ngân hàng",
      shortName: "BAV",
      location: "Hà Nội",
      website: "https://bav.edu.vn",
      students: "10,000+",
      majors: "12+",
      rank: "Top 30",
      type: "Đại học Tài chính",
      categories: ["tai_chinh", "kinhte", "ngan_hang"]
    },
    {
      name: "Đại học Kiến trúc Hà Nội",
      shortName: "HAU",
      location: "Hà Nội",
      website: "https://hau.edu.vn",
      students: "6,000+",
      majors: "12+",
      rank: "Top 25",
      type: "Đại học Kiến trúc",
      categories: ["kien_truc", "xay_dung", "thiet_ke"]
    },
    {
      name: "Đại học Xây dựng",
      shortName: "NUCE",
      location: "Hà Nội",
      website: "https://nuce.edu.vn",
      students: "9,000+",
      majors: "18+",
      rank: "Top 28",
      type: "Đại học Xây dựng",
      categories: ["xay_dung", "kysu", "kien_truc"]
    },
    {
      name: "Đại học Giao thông Vận tải",
      shortName: "UTC",
      location: "Hà Nội",
      website: "https://utc.edu.vn",
      students: "12,000+",
      majors: "25+",
      rank: "Top 30",
      type: "Đại học Kỹ thuật",
      categories: ["giao_thong", "kysu", "logistics"]
    },
    {
      name: "Đại học Thủy lợi",
      shortName: "TLU",
      location: "Hà Nội",
      website: "https://tlu.edu.vn",
      students: "10,000+",
      majors: "20+",
      rank: "Top 35",
      type: "Đại học Kỹ thuật",
      categories: ["thuy_loi", "nnl", "xay_dung"]
    },
    {
      name: "Đại học Mỏ - Địa chất",
      shortName: "HUMG",
      location: "Hà Nội",
      website: "https://humg.edu.vn",
      students: "8,000+",
      majors: "15+",
      rank: "Top 40",
      type: "Đại học Kỹ thuật",
      categories: ["mo", "dia_chat", "kysu"]
    },
    {
      name: "Đại học Tài chính - Kế toán",
      shortName: "FTA",
      location: "TP. Hồ Chí Minh",
      website: "https://fta.edu.vn",
      students: "15,000+",
      majors: "12+",
      rank: "Top 30",
      type: "Đại học Tài chính",
      categories: ["tai_chinh", "ke_toan", "kinhte"]
    },
    {
      name: "Đại học Sài Gòn",
      shortName: "CSG",
      location: "TP. Hồ Chí Minh",
      website: "https://csc.edu.vn",
      students: "18,000+",
      majors: "40+",
      rank: "Top 15",
      type: "Đại học Đa ngành",
      categories: ["kinhte", "sudp", "nn", "yte"]
    },
    {
      name: "Học viện Chính sách và Phát triển",
      shortName: "APD",
      location: "Hà Nội",
      website: "https://apd.edu.vn",
      students: "8,000+",
      majors: "15+",
      rank: "Top 40",
      type: "Đại học Nghiệp vụ",
      categories: ["chinhsach", "phattrien", "kinhte"]
    },
    {
      name: "Đại học Thương mại",
      shortName: "TMU",
      location: "Hà Nội",
      website: "https://tmu.edu.vn",
      students: "15,000+",
      majors: "25+",
      rank: "Top 25",
      type: "Đại học Thương mại",
      categories: ["kinhte", "marketing", "quan_tri"]
    },
    {
      name: "Học viện Tài chính",
      shortName: "AOF",
      location: "Hà Nội",
      website: "https://aof.edu.vn",
      students: "12,000+",
      majors: "15+",
      rank: "Top 28",
      type: "Đại học Tài chính",
      categories: ["tai_chinh", "ngan_hang", "kinhte"]
    },
    {
      name: "Đại học Dược Hà Nội",
      shortName: "HUP",
      location: "Hà Nội",
      website: "https://hup.edu.vn",
      students: "6,000+",
      majors: "5+",
      rank: "Top 15 Y Dược",
      type: "Đại học Dược",
      categories: ["duoc", "yte"]
    },
    {
      name: "Học viện Quân Y",
      shortName: "AAM",
      location: "Hà Nội",
      website: "https://hocvienquany.vn",
      students: "5,000+",
      majors: "10+",
      rank: "Top 20 Y Dược",
      type: "Đại học Quân y",
      categories: ["yte", "duoc"]
    },
    {
      name: "Đại học Hà Nội",
      shortName: "HANU",
      location: "Hà Nội",
      website: "https://hanu.edu.vn",
      students: "8,000+",
      majors: "20+",
      rank: "Top 35",
      type: "Đại học Đa ngành",
      categories: ["nn", "kinhte", "cntt"]
    },
    {
      name: "Học viện Báo chí và Tuyên truyền",
      shortName: "AJC",
      location: "Hà Nội",
      website: "https://ajc.edu.vn",
      students: "5,000+",
      majors: "8+",
      rank: "Top 30",
      type: "Đại học Báo chí",
      categories: ["truyen_thong", "marketing", "van_hoa"]
    },
    {
      name: "Học viện Hành chính Quốc gia",
      shortName: "NAPA",
      location: "Hà Nội",
      website: "https://napa.edu.vn",
      students: "4,000+",
      majors: "6+",
      rank: "Top 40",
      type: "Đại học Hành chính",
      categories: ["hanh_chinh", "chinh_tri", "luat"]
    },
    {
      name: "Đại học Nội vụ",
      shortName: "NAV",
      location: "Hà Nội",
      website: "https://nav.edu.vn",
      students: "6,000+",
      majors: "12+",
      rank: "Top 45",
      type: "Đại học Hành chính",
      categories: ["hanh_chinh", "quan_tri", "luat"]
    },
    {
      name: "Đại học Mỹ thuật Công nghiệp",
      shortName: "AIU",
      location: "Hà Nội",
      website: "https://aiu.edu.vn",
      students: "3,000+",
      majors: "8+",
      rank: "Top 30 Nghệ thuật",
      type: "Đại học Mỹ thuật",
      categories: ["design", "my_thuat", "kien_truc"]
    },
    {
      name: "Đại học Văn hóa Hà Nội",
      shortName: "HC",
      location: "Hà Nội",
      website: "https://hc.edu.vn",
      students: "5,000+",
      majors: "10+",
      rank: "Top 50",
      type: "Đại học Văn hóa",
      categories: ["van_hoa", "du_lich", "nn"]
    },
    {
      name: "Học viện Công nghệ Bưu chính Viễn thông",
      shortName: "PTIT",
      location: "Hà Nội",
      website: "https://ptit.edu.vn",
      students: "12,000+",
      majors: "15+",
      rank: "Top 25",
      type: "Đại học Viễn thông",
      categories: ["cntt", "vien_thong", "marketing"]
    }
  ],
  private: [
    {
      name: "Đại học Duy Tân",
      shortName: "DTU",
      location: "Đà Nẵng",
      website: "https://dtu.edu.vn",
      students: "14,000+",
      majors: "40+",
      rank: "Top 1 Tư thục miền Trung",
      type: "Đại học Tư thục",
      categories: ["cntt", "yte", "kysu", "kinhte", "duoc", "design"]
    },
    {
      name: "Đại học Phan Châu Trinh",
      shortName: "PCT",
      location: "Đà Nẵng",
      website: "https://pct.edu.vn",
      students: "4,000+",
      majors: "12+",
      rank: "Top 2 Tư thục miền Trung",
      type: "Đại học Tư thục",
      categories: ["yte", "duoc", "y_te", "kinhte"]
    },
    {
      name: "Đại học Phú Xuân",
      shortName: "PXT",
      location: "Huế",
      website: "https://phuxuan.edu.vn",
      students: "4,000+",
      majors: "12+",
      rank: "Top 3 Tư thục miền Trung",
      type: "Đại học Tư thục",
      categories: ["kinhte", "sudp", "nn"]
    },
    {
      name: "Đại học Đông Á",
      shortName: "DAU",
      location: "Đà Nẵng",
      website: "https://dau.edu.vn",
      students: "6,000+",
      majors: "18+",
      rank: "Top 4 Tư thục miền Trung",
      type: "Đại học Tư thục",
      categories: ["kinhte", "cntt", "kysu", "yte"]
    },
    {
      name: "Đại học Kiến trúc Đà Nẵng",
      shortName: "ADU",
      location: "Đà Nẵng",
      website: "https://adu.edu.vn",
      students: "3,000+",
      majors: "8+",
      rank: "Top 5 Tư thục miền Trung",
      type: "Đại học Tư thục",
      categories: ["kien_truc", "xay_dung", "design"]
    },
    {
      name: "Đại học RMIT Việt Nam",
      shortName: "RMIT",
      location: "TP. Hồ Chí Minh & Hà Nội",
      website: "https://rmit.edu.vn",
      students: "12,000+",
      majors: "30+",
      rank: "Top 1 Tư thục",
      type: "Đại học Quốc tế",
      categories: ["cntt", "kinhte", "marketing", "design", "nn"]
    },
    {
      name: "Đại học Fulbright Việt Nam",
      shortName: "FUV",
      location: "TP. Hồ Chí Minh",
      website: "https://fulbright.edu.vn",
      students: "2,000+",
      majors: "8+",
      rank: "Top 2 Tư thục",
      type: "Đại học Quốc tế",
      categories: ["kinhte", "luat", "chinh_tri"]
    },
    {
      name: "Đại học FPT",
      shortName: "FPTU",
      location: "Hà Nội & TP.HCM & Đà Nẵng",
      website: "https://fpt.edu.vn",
      students: "25,000+",
      majors: "40+",
      rank: "Top 3 Tư thục",
      type: "Đại học Tư thục",
      categories: ["cntt", "marketing", "kinhte", "nn", "design"]
    },
    {
      name: "American University Vietnam",
      shortName: "AUV",
      location: "Đà Nẵng",
      website: "https://auv.edu.vn",
      students: "2,000+",
      majors: "10+",
      rank: "Top 6 Tư thục miền Trung",
      type: "Đại học Quốc tế",
      categories: ["kinhte", "cntt", "quan_tri", "marketing"]
    },
    {
      name: "Đại học VinUni",
      shortName: "VinUni",
      location: "Hà Nội",
      website: "https://vinuni.edu.vn",
      students: "4,000+",
      majors: "15+",
      rank: "Top 1 Tư thục",
      type: "Đại học Quốc tế",
      categories: ["kinhte", "yte", "cntt", "design"]
    },
    {
      name: "British University Vietnam",
      shortName: "BUV",
      location: "Hà Nội",
      website: "https://buv.edu.vn",
      students: "3,000+",
      majors: "12+",
      rank: "Top 2 Tư thục",
      type: "Đại học Quốc tế",
      categories: ["kinhte", "marketing", "quan_tri", "luat"]
    },
    {
      name: "Đại học Thăng Long",
      shortName: "STL",
      location: "Hà Nội",
      website: "https://thanglong.edu.vn",
      students: "8,000+",
      majors: "20+",
      rank: "Top 13 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kinhte", "cntt", "kien_truc"]
    },
    {
      name: "Đại học Phenikaa",
      shortName: "PNU",
      location: "Hà Nội",
      website: "https://phenikaa.edu.vn",
      students: "10,000+",
      majors: "25+",
      rank: "Top 10 Tư thục",
      type: "Đại học Tư thục",
      categories: ["cntt", "kinhte", "kien_truc", "kysu"]
    },
    {
      name: "Đại học CMC",
      shortName: "CMU",
      location: "Hà Nội",
      website: "https://cmc.edu.vn",
      students: "6,000+",
      majors: "15+",
      rank: "Top 18 Tư thục",
      type: "Đại học Tư thục",
      categories: ["cntt", "kinhte", "design"]
    },
    {
      name: "Đại học Đại Nam",
      shortName: "DNU",
      location: "Hà Nội",
      website: "https://dai-nam.edu.vn",
      students: "12,000+",
      majors: "30+",
      rank: "Top 15 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kinhte", "yte", "kysu", "nn"]
    },
    {
      name: "Đại học Phương Đông",
      shortName: "PDU",
      location: "Hà Nội",
      website: "https://phuongdong.edu.vn",
      students: "5,000+",
      majors: "15+",
      rank: "Top 25 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kinhte", "cntt", "nn"]
    },
    {
      name: "Đại học Hòa Bình",
      shortName: "HBU",
      location: "Hà Nội",
      website: "https://hoabinh.edu.vn",
      students: "3,000+",
      majors: "10+",
      rank: "Top 30 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kinhte", "cntt", "sudp"]
    },
    {
      name: "Đại học Thành Đô",
      shortName: "TDU",
      location: "Hà Nội",
      website: "https://tdt.edu.vn",
      students: "4,000+",
      majors: "12+",
      rank: "Top 28 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kinhte", "cntt", "du_lich"]
    },
    {
      name: "Đại học Văn Lang",
      shortName: "VLU",
      location: "TP. Hồ Chí Minh",
      website: "https://vanlanguni.edu.vn",
      students: "15,000+",
      majors: "35+",
      rank: "Top 4 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kinhte", "kysu", "nn", "marketing", "luat", "kien_truc"]
    },
    {
      name: "Trường Đại học Quốc tế Hồng Bàng",
      shortName: "HIU",
      location: "TP. Hồ Chí Minh",
      website: "https://hiu.vn",
      students: "8,000+",
      majors: "25+",
      rank: "Top 5 Tư thục",
      type: "Đại học Tư thục",
      categories: ["yte", "duoc", "y_te", "kinhte"]
    },
    {
      name: "Đại học Y Khoa Phạm Ngọc Thạch",
      shortName: "PNT",
      location: "TP. Hồ Chí Minh",
      website: "https://pnt.edu.vn",
      students: "3,000+",
      majors: "6+",
      rank: "Top 10 Tư thục",
      type: "Đại học Y",
      categories: ["yte", "y_te"]
    },
    {
      name: "Đại học Kinh tế - Luật",
      shortName: "UEL",
      location: "TP. Hồ Chí Minh",
      website: "https://uel.edu.vn",
      students: "12,000+",
      majors: "22+",
      rank: "Top 6 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kinhte", "luat", "tai_chinh", "ngan_hang"]
    },
    {
      name: "Đại học Hoa Sen",
      shortName: "HSU",
      location: "TP. Hồ Chí Minh",
      website: "https://hoasen.edu.vn",
      students: "10,000+",
      majors: "28+",
      rank: "Top 7 Tư thục",
      type: "Đại học Tư thục",
      categories: ["nn", "du_lich", "marketing", "kinhte", "quan_tri"]
    },
    {
      name: "Đại học Gia Định",
      shortName: "GDA",
      location: "TP. Hồ Chí Minh",
      website: "https://gdu.edu.vn",
      students: "8,000+",
      majors: "20+",
      rank: "Top 8 Tư thục",
      type: "Đại học Tư thục",
      categories: ["cntt", "kinhte", "yte", "sudp"]
    },
    {
      name: "Đại học Lạc Hồng",
      shortName: "LHU",
      location: "Đồng Nai",
      website: "https://lhu.edu.vn",
      students: "6,000+",
      majors: "18+",
      rank: "Top 10 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kysu", "cntt", "kinhte", "co_khi"]
    },
    {
      name: "Đại học Nguyễn Trãi",
      shortName: "NTU",
      location: "Hà Nội",
      website: "https://ntru.edu.vn",
      students: "6,000+",
      majors: "18+",
      rank: "Top 12 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kinhte", "cntt", "kysu"]
    },
    {
      name: "Đại học Văn Hiến",
      shortName: "VHU",
      location: "TP. Hồ Chí Minh",
      website: "https://vanhien.edu.vn",
      students: "7,000+",
      majors: "20+",
      rank: "Top 11 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kinhte", "cntt", "luat", "nn"]
    },
    {
      name: "Đại học Công nghệ Sài Gòn",
      shortName: "SCT",
      location: "TP. Hồ Chí Minh",
      website: "https://sct.edu.vn",
      students: "5,000+",
      majors: "15+",
      rank: "Top 15 Tư thục",
      type: "Đại học Tư thục",
      categories: ["cntt", "kien_truc", "design"]
    },
    {
      name: "Đại học Kinh tế - Tài chính TP.HCM",
      shortName: "UEF",
      location: "TP. Hồ Chí Minh",
      website: "https://uef.edu.vn",
      students: "10,000+",
      majors: "20+",
      rank: "Top 8 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kinhte", "tai_chinh", "luat", "cntt"]
    },
    {
      name: "Đại học Ngoại ngữ - Tin học TP.HCM",
      shortName: "HUFLIT",
      location: "TP. Hồ Chí Minh",
      website: "https://huflit.edu.vn",
      students: "6,000+",
      majors: "15+",
      rank: "Top 12 Tư thục",
      type: "Đại học Tư thục",
      categories: ["nn", "cntt", "kinhte"]
    },
    {
      name: "Đại học Nguyễn Tất Thành",
      shortName: "NTT",
      location: "TP. Hồ Chí Minh",
      website: "https://ntt.edu.vn",
      students: "12,000+",
      majors: "30+",
      rank: "Top 6 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kinhte", "yte", "cntt", "kysu"]
    },
    {
      name: "Đại học Quảng Nam",
      shortName: "QNU",
      location: "Quảng Nam",
      website: "https://qnu.edu.vn",
      students: "5,000+",
      majors: "15+",
      rank: "Top 4 Tư thục miền Trung",
      type: "Đại học Tư thục",
      categories: ["kinhte", "nnl", "sudp"]
    },
    {
      name: "Đại học Hùng Vương TP.HCM",
      shortName: "HVU",
      location: "TP. Hồ Chí Minh",
      website: "https://hvu.edu.vn",
      students: "5,000+",
      majors: "15+",
      rank: "Top 14 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kinhte", "nn", "cntt"]
    },
    {
      name: "Đại học Tân Tạo",
      shortName: "TTU",
      location: "Tiền Giang",
      website: "https://tan-tao.edu.vn",
      students: "4,000+",
      majors: "12+",
      rank: "Top 20 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kinhte", "nnl", "kysu"]
    },
    {
      name: "Đại học Võ Trường Toản",
      shortName: "VTT",
      location: "Cần Thơ",
      website: "https://vtruongtoan.edu.vn",
      students: "5,000+",
      majors: "14+",
      rank: "Top 15 Tư thục miền Nam",
      type: "Đại học Tư thục",
      categories: ["yte", "kinhte", "nnl"]
    },
    {
      name: "Đại học Buôn Ma Thuột",
      shortName: "BMTU",
      location: "Đắk Lắk",
      website: "https://bmtu.edu.vn",
      students: "5,000+",
      majors: "15+",
      rank: "Top 20 Tư thục",
      type: "Đại học Tư thục",
      categories: ["nnl", "kinhte", "sudp"]
    },
    {
      name: "Đại học Thái Bình",
      shortName: "TBU",
      location: "Thái Bình",
      website: "https://tbu.edu.vn",
      students: "4,000+",
      majors: "12+",
      rank: "Top 25 Tư thục",
      type: "Đại học Tư thục",
      categories: ["yte", "sudp", "nnl"]
    },
    {
      name: "Đại học Kỹ năng thực hành",
      shortName: "PTU",
      location: "Hà Nội",
      website: "https://ptu.edu.vn",
      students: "3,000+",
      majors: "10+",
      rank: "Top 30 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kysu", "cntt", "kinhte"]
    },
    {
      name: "Đại học Kinh doanh và Công nghệ Hà Nội",
      shortName: "HUTECH",
      location: "Hà Nội",
      website: "https://hutech.edu.vn",
      students: "12,000+",
      majors: "30+",
      rank: "Top 16 Tư thục",
      type: "Đại học Tư thục",
      categories: ["cntt", "kinhte", "kysu", "design"]
    },
    {
      name: "Đại học Công nghệ Đồng Nai",
      shortName: "DNTU",
      location: "Đồng Nai",
      website: "https://dntu.edu.vn",
      students: "8,000+",
      majors: "20+",
      rank: "Top 18 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kysu", "cntt", "kinhte"]
    },
    {
      name: "Đại học Tài chính - Marketing",
      shortName: "FBM",
      location: "TP. Hồ Chí Minh",
      website: "https://fbm.edu.vn",
      students: "6,000+",
      majors: "15+",
      rank: "Top 22 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kinhte", "marketing", "tai_chinh"]
    },
    {
      name: "Đại học Quốc tế Bắc Hà",
      shortName: "BIBA",
      location: "Hà Nội",
      website: "https://baca.edu.vn",
      students: "3,000+",
      majors: "10+",
      rank: "Top 28 Tư thục",
      type: "Đại học Quốc tế",
      categories: ["kinhte", "nn", "cntt"]
    },
    {
      name: "Đại học Văn miến Bắc Ninh",
      shortName: "VBN",
      location: "Bắc Ninh",
      website: "https://vnu.edu.vn/bacninh",
      students: "2,000+",
      majors: "8+",
      rank: "Top 35 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kinhte", "sudp", "cntt"]
    },
    {
      name: "Đại học Phan Thiết",
      shortName: "PTU",
      location: "Bình Thuận",
      website: "https://ptu.edu.vn",
      students: "3,000+",
      majors: "10+",
      rank: "Top 40 Tư thục",
      type: "Đại học Tư thục",
      categories: ["nnl", "du_lich", "kinhte"]
    }
  ]
};

// Search universities by name
function searchUniversities(query) {
  if (!query || query.trim() === '') {
    return { public: universitiesData.public, private: universitiesData.private };
  }
  
  const searchTerm = query.toLowerCase().trim();
  
  const filteredPublic = universitiesData.public.filter(uni => 
    uni.name.toLowerCase().includes(searchTerm) ||
    uni.shortName.toLowerCase().includes(searchTerm) ||
    uni.location.toLowerCase().includes(searchTerm) ||
    uni.type.toLowerCase().includes(searchTerm)
  );
  
  const filteredPrivate = universitiesData.private.filter(uni => 
    uni.name.toLowerCase().includes(searchTerm) ||
    uni.shortName.toLowerCase().includes(searchTerm) ||
    uni.location.toLowerCase().includes(searchTerm) ||
    uni.type.toLowerCase().includes(searchTerm)
  );
  
  return { public: filteredPublic, private: filteredPrivate };
}

// Generate university item HTML
function generateUniversityItem(university, index) {
  return `
    <div class="university-item" data-name="${university.name.toLowerCase()}">
      <div class="university-item-logo">
        <span>${university.shortName}</span>
      </div>
      <div class="university-item-info">
        <div class="university-item-header">
          <h3>${university.name}</h3>
          <span class="university-item-rank">${university.rank}</span>
        </div>
        <div class="university-item-meta">
          <span class="meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            ${university.location}
          </span>
          <span class="meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            ${university.majors} ngành
          </span>
        </div>
      </div>
      <a href="${university.website}" target="_blank" rel="noopener noreferrer" class="university-item-link">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </a>
    </div>
  `;
}

// Render universities list
function renderUniversities(filteredData) {
  const publicList = document.getElementById('publicList');
  const privateList = document.getElementById('privateList');
  const publicCount = document.getElementById('publicCount');
  const privateCount = document.getElementById('privateCount');
  const publicCountMobile = document.getElementById('publicCountMobile');
  const privateCountMobile = document.getElementById('privateCountMobile');
  const noResults = document.getElementById('noResults');
  const totalResults = document.getElementById('totalResults');
  
  const data = filteredData || universitiesData;
  
  // Update counts
  const totalPublic = data.public.length;
  const totalPrivate = data.private.length;
  publicCount.textContent = `${totalPublic} trường`;
  privateCount.textContent = `${totalPrivate} trường`;
  publicCountMobile.textContent = totalPublic;
  privateCountMobile.textContent = totalPrivate;
  
  // Update total results
  if (totalResults) {
    totalResults.textContent = totalPublic + totalPrivate;
  }
  
  // Render lists
  publicList.innerHTML = data.public
    .map((uni, index) => generateUniversityItem(uni, index))
    .join('');
    
  privateList.innerHTML = data.private
    .map((uni, index) => generateUniversityItem(uni, index))
    .join('');
  
  // Show/hide no results message
  const hasResults = totalPublic > 0 || totalPrivate > 0;
  noResults.style.display = hasResults ? 'none' : 'flex';
}

// Search functionality
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClear');
  const clearSearchBtn = document.getElementById('clearSearch');
  
  if (!searchInput) return;
  
  let debounceTimer;
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    
    // Show/hide clear button
    if (searchClear) {
      searchClear.style.display = query ? 'flex' : 'none';
    }
    
    // Debounce search
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const filtered = searchUniversities(query);
      renderUniversities(filtered);
    }, 300);
  });
  
  // Clear search
  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchClear.style.display = 'none';
      renderUniversities();
      searchInput.focus();
    });
  }
  
  // Clear search from no results button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      if (searchClear) searchClear.style.display = 'none';
      renderUniversities();
    });
  }
}

// Mobile tabs functionality
function initMobileTabs() {
  const tabs = document.querySelectorAll('.mobile-tab');
  const publicColumn = document.getElementById('publicColumn');
  const privateColumn = document.getElementById('privateColumn');
  
  if (!tabs.length) return;
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabType = tab.dataset.tab;
      
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show/hide columns based on screen size
      if (window.innerWidth < 992) {
        if (tabType === 'public') {
          publicColumn.style.display = 'block';
          privateColumn.style.display = 'none';
        } else {
          publicColumn.style.display = 'none';
          privateColumn.style.display = 'block';
        }
      }
    });
  });
  
  // Reset on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) {
      publicColumn.style.display = 'block';
      privateColumn.style.display = 'block';
    } else {
      const activeTab = document.querySelector('.mobile-tab.active');
      if (activeTab) {
        activeTab.click();
      }
    }
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  renderUniversities();
  initSearch();
  initMobileTabs();
});

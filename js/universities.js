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
      name: "Đại học FPT",
      shortName: "FPTU",
      location: "Hà Nội & TP.HCM",
      website: "https://fpt.edu.vn",
      students: "25,000+",
      majors: "40+",
      rank: "Top 15",
      type: "Đại học Tư thục",
      categories: ["cntt", "marketing", "kinhte", "nn"]
    }
  ],
  private: [
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
      name: "Đại học Văn Lang",
      shortName: "VLU",
      location: "TP. Hồ Chí Minh",
      website: "https://vanlanguni.edu.vn",
      students: "15,000+",
      majors: "35+",
      rank: "Top 4 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kinhte", "kysu", "nn", "marketing", "luat"]
    },
    {
      name: "Đại học Hoa Sen",
      shortName: "HSU",
      location: "TP. Hồ Chí Minh",
      website: "https://hoasen.edu.vn",
      students: "10,000+",
      majors: "28+",
      rank: "Top 6 Tư thục",
      type: "Đại học Tư thục",
      categories: ["nn", "du_lich", "marketing", "kinhte"]
    },
    {
      name: "Đại học Nguyễn Trãi",
      shortName: "NTU",
      location: "Hà Nội",
      website: "https://ntru.edu.vn",
      students: "6,000+",
      majors: "18+",
      rank: "Top 10 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kinhte", "cntt", "kysu"]
    },
    {
      name: "Đại học Duy Tân",
      shortName: "DTU",
      location: "Đà Nẵng",
      website: "https://dtu.edu.vn",
      students: "14,000+",
      majors: "40+",
      rank: "Top 3 Tư thục miền Trung",
      type: "Đại học Tư thục",
      categories: ["cntt", "yte", "kysu", "kinhte", "duoc"]
    },
    {
      name: "Đại học Kinh tế - Luật",
      shortName: "UEL",
      location: "TP. Hồ Chí Minh",
      website: "https://uel.edu.vn",
      students: "12,000+",
      majors: "22+",
      rank: "Top 7 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kinhte", "luat", "tai_chinh"]
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
      name: "Đại học Gia Định",
      shortName: "GDA",
      location: "TP. Hồ Chí Minh",
      website: "https://gdu.edu.vn",
      students: "8,000+",
      majors: "20+",
      rank: "Top 9 Tư thục",
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
      rank: "Top 11 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kysu", "cntt", "kinhte"]
    },
    {
      name: "Đại học Văn Hiến",
      shortName: "VHU",
      location: "TP. Hồ Chí Minh",
      website: "https://vanhien.edu.vn",
      students: "7,000+",
      majors: "20+",
      rank: "Top 12 Tư thục",
      type: "Đại học Tư thục",
      categories: ["kinhte", "cntt", "luat", "nn"]
    },
    {
      name: "Đại học Phan Châu Trinh",
      shortName: "PCT",
      location: "Đà Nẵng",
      website: "https://pct.edu.vn",
      students: "4,000+",
      majors: "12+",
      rank: "Top 8 Tư thục miền Trung",
      type: "Đại học Tư thục",
      categories: ["yte", "duoc", "y_te", "kinhte"]
    },
    {
      name: "Đại học Thái Bình",
      shortName: "TBU",
      location: "Thái Bình",
      website: "https://tbu.edu.vn",
      students: "4,000+",
      majors: "12+",
      rank: "Top 28 Tư thục",
      type: "Đại học Tư thục",
      categories: ["yte", "sudp", "nnl"]
    },
    {
      name: "Đại học Tôn Đức Thắng",
      shortName: "TDTU",
      location: "TP. Hồ Chí Minh",
      website: "https://tdtu.edu.vn",
      students: "22,000+",
      majors: "45+",
      rank: "Top 14",
      type: "Đại học Công lập",
      categories: ["cntt", "kysu", "kinhte", "yte", "sudp"]
    }
  ]
};

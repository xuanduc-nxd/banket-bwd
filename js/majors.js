// Major Data - All university majors in Vietnam
const majorsData = {
  categories: [
    {
      id: "cntt",
      name: "CNTT & Công nghệ",
      icon: "💻",
      color: "#3b82f6",
      description: "Công nghệ thông tin, phần mềm, AI, An toàn thông tin"
    },
    {
      id: "kinhte",
      name: "Kinh tế & Tài chính",
      icon: "💰",
      color: "#10b981",
      description: "Kinh tế, Tài chính, Ngân hàng, Kế toán, Marketing"
    },
    {
      id: "yte",
      name: "Y Dược & Sức khỏe",
      icon: "🏥",
      color: "#ef4444",
      description: "Y khoa, Dược, Điều dưỡng, Y học cổ truyền"
    },
    {
      id: "kysu",
      name: "Kỹ thuật & Công nghiệp",
      icon: "⚙️",
      color: "#f59e0b",
      description: "Cơ khí, Điện, Tự động hóa, Hàng không"
    },
    {
      id: "sudp",
      name: "Sư phạm & Giáo dục",
      icon: "📚",
      color: "#8b5cf6",
      description: "Sư phạm, Giáo dục mầm non, Quản lý giáo dục"
    },
    {
      id: "luat",
      name: "Luật & Hành chính",
      icon: "⚖️",
      color: "#6366f1",
      description: "Luật, Hành chính, Tư pháp, Chính trị"
    },
    {
      id: "design",
      name: "Nghệ thuật & Thiết kế",
      icon: "🎨",
      color: "#ec4899",
      description: "Thiết kế đồ họa, Nội thất, Mỹ thuật, Thời trang"
    },
    {
      id: "nnl",
      name: "Nông - Lâm - Ngư",
      icon: "🌾",
      color: "#84cc16",
      description: "Nông nghiệp, Lâm nghiệp, Thủy sản, Thú y"
    },
    {
      id: "nn",
      name: "Ngôn ngữ & Du lịch",
      icon: "🌍",
      color: "#06b6d4",
      description: "Ngôn ngữ, Du lịch, Khách sạn, Nhà hàng"
    },
    {
      id: "kien_truc",
      name: "Kiến trúc & Xây dựng",
      icon: "🏗️",
      color: "#78716c",
      description: "Kiến trúc, Xây dựng, Quy hoạch, Kỹ thuật hạ tầng"
    }
  ],

  majors: [
    // CNTT & Công nghệ
    {
      id: "cntt",
      name: "Công nghệ thông tin",
      category: "cntt",
      description: "Học về lập trình, phần mềm, mạng máy tính, cơ sở dữ liệu và các công nghệ hiện đại.",
      subjects: ["Toán rời rạc", "Lập trình", "Cấu trúc dữ liệu", "Mạng máy tính", "Cơ sở dữ liệu", "Trí tuệ nhân tạo"],
      careers: ["Lập trình viên", "Kỹ sư phần mềm", "Quản trị mạng", "Chuyên gia AI", "Data Scientist", "DevOps"],
      avgSalary: "15-35 triệu/tháng",
      employmentRate: "95%",
      difficulty: 7,
      relatedMajors: ["an_toan_thongtin", "khoa_hoc_may_tinh", "httt_mang"]
    },
    {
      id: "an_toan_thongtin",
      name: "An toàn thông tin",
      category: "cntt",
      description: "Bảo vệ hệ thống, dữ liệu và mạng lưới công nghệ khỏi các mối đe dọa từ hacker và malware.",
      subjects: ["Mật mã học", "An ninh mạng", "Phân tích malware", "Ethical Hacking", "Bảo mật ứng dụng"],
      careers: ["Chuyên gia bảo mật", "Ethical Hacker", "Quản trị an ninh", "Security Analyst", "Forensics Expert"],
      avgSalary: "18-40 triệu/tháng",
      employmentRate: "92%",
      difficulty: 8,
      relatedMajors: ["cntt", "httt_mang"]
    },
    {
      id: "khoa_hoc_may_tinh",
      name: "Khoa học máy tính",
      category: "cntt",
      description: "Nghiên cứu sâu về lý thuyết tính toán, thuật toán, AI và máy học.",
      subjects: ["Giải thuật", "AI", "Machine Learning", "Xử lý ngôn ngữ", "Đồ họa máy tính", "Lý thuyết tính toán"],
      careers: ["Nghiên cứu viên", "Kỹ sư AI", "Chuyên gia ML", "Kiến trúc sư phần mềm", "Game Developer"],
      avgSalary: "20-50 triệu/tháng",
      employmentRate: "93%",
      difficulty: 9,
      relatedMajors: ["cntt", "trituenhanh"]
    },
    {
      id: "httt_mang",
      name: "Hệ thống thông tin",
      category: "cntt",
      description: "Thiết kế, xây dựng và quản lý các hệ thống thông tin cho doanh nghiệp.",
      subjects: ["Phân tích thiết kế hệ thống", "Cơ sở dữ liệu", "ERP", "Quản trị dự án IT", "Business Intelligence"],
      careers: ["BA (Business Analyst)", "Quản lý dự án IT", "Quản trị hệ thống", "Tư vấn CNTT", "System Architect"],
      avgSalary: "15-30 triệu/tháng",
      employmentRate: "90%",
      difficulty: 6,
      relatedMajors: ["cntt", "thuong_mai_dientu"]
    },
    {
      id: "trituenhanh",
      name: "Trí tuệ nhân tạo",
      category: "cntt",
      description: "Nghiên cứu và phát triển các hệ thống AI, machine learning, deep learning.",
      subjects: ["Deep Learning", "Xử lý ảnh", "NLP", "Robotics", "Computer Vision", "Neural Networks"],
      careers: ["Kỹ sư AI", "Nhà khoa học dữ liệu", "Chuyên gia ML", "Kỹ sư Robotics", "AI Researcher"],
      avgSalary: "25-60 triệu/tháng",
      employmentRate: "96%",
      difficulty: 9,
      relatedMajors: ["cntt", "khoa_hoc_may_tinh"]
    },
    {
      id: "thuong_mai_dientu",
      name: "Thương mại điện tử",
      category: "cntt",
      description: "Xây dựng và vận hành các nền tảng kinh doanh trực tuyến, marketing số.",
      subjects: ["Marketing số", "Thiết kế web", "Quản lý logistics", "Thanh toán điện tử", "Phân tích hành vi khách hàng"],
      careers: ["E-commerce Manager", "Digital Marketer", "UX Designer", "Product Manager", "Chủ shop online"],
      avgSalary: "12-25 triệu/tháng",
      employmentRate: "88%",
      difficulty: 5,
      relatedMajors: ["cntt", "marketing"]
    },

    // Kinh tế & Tài chính
    {
      id: "kinhte",
      name: "Kinh tế",
      category: "kinhte",
      description: "Nghiên cứu về kinh tế vĩ mô, vi mô, chính sách kinh tế và phát triển.",
      subjects: ["Kinh tế vĩ mô", "Kinh tế vi mô", "Thống kê", "Tài chính", "Quản trị"],
      careers: ["Chuyên viên kinh tế", "Nhà phân tích", "Tư vấn chính sách", "Nghiên cứu viên", "Quản lý doanh nghiệp"],
      avgSalary: "10-25 triệu/tháng",
      employmentRate: "85%",
      difficulty: 7,
      relatedMajors: ["tai_chinh", "quan_tri_kinhdoanh", "marketing"]
    },
    {
      id: "tai_chinh",
      name: "Tài chính - Ngân hàng",
      category: "kinhte",
      description: "Quản lý tài chính, ngân hàng, đầu tư, bảo hiểm và thị trường chứng khoán.",
      subjects: ["Tài chính doanh nghiệp", "Ngân hàng", "Chứng khoán", "Bảo hiểm", "Quản trị rủi ro"],
      careers: ["Chuyên viên ngân hàng", "Nhà phân tích tài chính", "Chuyên viên chứng khoán", "Tư vấn tài chính", "Kiểm toán"],
      avgSalary: "12-30 triệu/tháng",
      employmentRate: "90%",
      difficulty: 7,
      relatedMajors: ["kinhte", "ke_toan", "ngan_hang"]
    },
    {
      id: "ke_toan",
      name: "Kế toán",
      category: "kinhte",
      description: "Ghi nhận, phân tích và báo cáo thông tin tài chính của tổ chức.",
      subjects: ["Kế toán tài chính", "Kế toán quản trị", "Thuế", "Kiểm toán", "Hệ thống thông tin kế toán"],
      careers: ["Kế toán", "Kiểm toán viên", "Chuyên viên thuế", "Tài chính doanh nghiệp", "Tư vấn tài chính"],
      avgSalary: "10-22 triệu/tháng",
      employmentRate: "92%",
      difficulty: 6,
      relatedMajors: ["tai_chinh", "kinhte"]
    },
    {
      id: "ngan_hang",
      name: "Ngân hàng",
      category: "kinhte",
      description: "Hoạt động kinh doanh tiền tệ, tín dụng, thanh toán và dịch vụ tài chính.",
      subjects: ["Nghiệp vụ ngân hàng", "Tín dụng", "Thanh toán quốc tế", "Quản trị rủi ro", "Digital Banking"],
      careers: ["Nhân viên ngân hàng", "Chuyên viên tín dụng", "Quản lý khách hàng", "Chuyên viên FX", "Risk Manager"],
      avgSalary: "12-28 triệu/tháng",
      employmentRate: "88%",
      difficulty: 6,
      relatedMajors: ["tai_chinh", "tai_chinh_cong"]
    },
    {
      id: "marketing",
      name: "Marketing",
      category: "kinhte",
      description: "Nghiên cứu thị trường, xây dựng thương hiệu, quảng cáo và truyền thông.",
      subjects: ["Marketing căn bản", "Hành vi khách hàng", "Quảng cáo", "PR", "Marketing số", "Content Marketing"],
      careers: ["Marketing Manager", "Brand Manager", "Chuyên viên quảng cáo", "Content Creator", "Social Media Manager"],
      avgSalary: "10-25 triệu/tháng",
      employmentRate: "87%",
      difficulty: 5,
      relatedMajors: ["kinhte", "truyen_thong"]
    },
    {
      id: "quan_tri_kinhdoanh",
      name: "Quản trị kinh doanh",
      category: "kinhte",
      description: "Quản lý và điều hành mọi hoạt động kinh doanh của doanh nghiệp.",
      subjects: ["Quản trị marketing", "Quản trị nhân sự", "Tài chính doanh nghiệp", "Vận trù học", "Luật kinh doanh"],
      careers: ["Quản lý", "Giám đốc kinh doanh", "Tư vấn quản lý", "Chuyên viên HR", "Startup Founder"],
      avgSalary: "12-30 triệu/tháng",
      employmentRate: "85%",
      difficulty: 6,
      relatedMajors: ["kinhte", "marketing", "luat_kinhte"]
    },

    // Y Dược & Sức khỏe
    {
      id: "yte",
      name: "Y khoa",
      category: "yte",
      description: "Đào tạo bác sĩ đa khoa, chẩn đoán và điều trị bệnh cho con người.",
      subjects: ["Giải phẫu", "Sinh lý", "Nội khoa", "Ngoại khoa", "Sản khoa", "Nhi khoa", "Dược lý"],
      careers: ["Bác sĩ đa khoa", "Bác sĩ chuyên khoa", "Nghiên cứu y học", "Giảng viên y khoa"],
      avgSalary: "15-50 triệu/tháng",
      employmentRate: "98%",
      difficulty: 10,
      relatedMajors: ["y_te", "duoc", "dieu_duong"]
    },
    {
      id: "duoc",
      name: "Dược học",
      category: "yte",
      description: "Nghiên cứu, sản xuất, phân phối và tư vấn sử dụng thuốc.",
      subjects: ["Hóa dược", "Dược lý", "Dược liệu", "Công nghệ dược", "Bệnh học", "Thực phẩm chức năng"],
      careers: ["Dược sĩ", "Chuyên viên dược lý", "Nhà nghiên cứu", "QA/QC dược", "Đại diện y dược", "Quản lý nhà thuốc"],
      avgSalary: "10-25 triệu/tháng",
      employmentRate: "94%",
      difficulty: 8,
      relatedMajors: ["yte", "hoa_hoc"]
    },
    {
      id: "dieu_duong",
      name: "Điều dưỡng",
      category: "yte",
      description: "Chăm sóc sức khỏe bệnh nhân, hỗ trợ bác sĩ trong điều trị và phục hồi.",
      subjects: ["Chăm sóc cơ bản", "Dược lý", "Chăm sóc nội khoa", "Chăm sóc ngoại khoa", "Cấp cứu", "Y đức"],
      careers: ["Điều dưỡng", "Trưởng khoa điều dưỡng", "Điều dưỡng chuyên khoa", "Giảng viên"],
      avgSalary: "8-18 triệu/tháng",
      employmentRate: "95%",
      difficulty: 7,
      relatedMajors: ["yte", "yte_co_truyen"]
    },
    {
      id: "yte_co_truyen",
      name: "Y học cổ truyền",
      category: "yte",
      description: "Kết hợp y học hiện đại với các phương pháp điều trị truyền thống Việt Nam.",
      subjects: ["Lý luận y học cổ truyền", "Châm cứu", "Bấm huyệt", "Dược liệu Đông y", "Y đức"],
      careers: ["Bác sĩ y học cổ truyền", "Thầy thuốc", "Chuyên gia châm cứu", "Nghiên cứu y dược cổ truyền"],
      avgSalary: "10-25 triệu/tháng",
      employmentRate: "85%",
      difficulty: 7,
      relatedMajors: ["yte", "duoc"]
    },
    {
      id: "y_te_cong_cong",
      name: "Y tế công cộng",
      category: "yte",
      description: "Nghiên cứu và quản lý sức khỏe cộng đồng, phòng chống dịch bệnh.",
      subjects: ["Dịch tễ học", "Y học cộng đồng", "Quản lý y tế", "Chính sách y tế", "Sức khỏe môi trường"],
      careers: ["Chuyên viên y tế công cộng", "Quản lý bệnh viện", "Chuyên gia dịch tễ", "Tư vấn sức khỏe"],
      avgSalary: "10-20 triệu/tháng",
      employmentRate: "88%",
      difficulty: 6,
      relatedMajors: ["yte", "quan_tri_benhvien"]
    },

    // Kỹ thuật & Công nghiệp
    {
      id: "co_khi",
      name: "Cơ khí",
      category: "kysu",
      description: "Thiết kế, chế tạo, vận hành máy móc và thiết bị cơ khí.",
      subjects: ["Sức bền vật liệu", "Nguyên lý máy", "Công nghệ chế tạo", "Thiết kế CAD/CAM", "Động lực học"],
      careers: ["Kỹ sư cơ khí", "Thiết kế máy", "Kỹ sư sản xuất", "Kỹ thuật viên CNC", "Quản lý kỹ thuật"],
      avgSalary: "12-28 triệu/tháng",
      employmentRate: "92%",
      difficulty: 7,
      relatedMajors: ["che_tao_cnc", "ky_thuat_o_to", "co_dien_tu"]
    },
    {
      id: "dien",
      name: "Kỹ thuật điện",
      category: "kysu",
      description: "Thiết kế, vận hành hệ thống điện, điện tử và tự động hóa.",
      subjects: ["Mạch điện", "Hệ thống điện", "Điện tử công suất", "Tự động hóa", "Năng lượng tái tạo"],
      careers: ["Kỹ sư điện", "Kỹ sư tự động hóa", "Thiết kế hệ thống điện", "Kỹ thuật viên điện", "Quản lý năng lượng"],
      avgSalary: "12-30 triệu/tháng",
      employmentRate: "93%",
      difficulty: 7,
      relatedMajors: ["dien_tu", "tu_dong_hoa", "nang_luong"]
    },
    {
      id: "dien_tu",
      name: "Kỹ thuật điện tử",
      category: "kysu",
      description: "Thiết kế, chế tạo và bảo trì các thiết bị điện tử.",
      subjects: ["Mạch điện tử", "Vi xử lý", "Vi mạch", "Tín hiệu số", "Thiết kế PCB"],
      careers: ["Kỹ sư điện tử", "Thiết kế vi mạch", "Kỹ thuật viên bảo trì", "QA/QC điện tử", "Embedded Developer"],
      avgSalary: "12-28 triệu/tháng",
      employmentRate: "90%",
      difficulty: 7,
      relatedMajors: ["dien", "cntt", "vtv"]
    },
    {
      id: "tu_dong_hoa",
      name: "Tự động hóa",
      category: "kysu",
      description: "Ứng dụng điều khiển tự động vào sản xuất công nghiệp.",
      subjects: ["Lý thuyết điều khiển", "PLC", "SCADA", "Robot công nghiệp", "IoT công nghiệp"],
      careers: ["Kỹ sư tự động hóa", "Lập trình PLC", "Kỹ sư robot", "Integrator hệ thống", "Project Engineer"],
      avgSalary: "15-35 triệu/tháng",
      employmentRate: "94%",
      difficulty: 8,
      relatedMajors: ["dien", "cntt", "co_khi"]
    },
    {
      id: "che_tao_cnc",
      name: "Công nghệ gia công CNC",
      category: "kysu",
      description: "Vận hành và lập trình máy CNC để gia công chính xác các chi tiết.",
      subjects: ["Lập trình CNC", "Gia công áp lực", "Vật liệu", "CAD/CAM", "Đo lường"],
      careers: ["Lập trình viên CNC", "Kỹ thuật viên CNC", "Thiết kế khuôn mẫu", "Quality Controller"],
      avgSalary: "10-22 triệu/tháng",
      employmentRate: "91%",
      difficulty: 6,
      relatedMajors: ["co_khi", "ky_thuat_o_to"]
    },
    {
      id: "nhkhoa_hangkhong",
      name: "Nhiệt - Lạnh & Hàng không",
      category: "kysu",
      description: "Thiết kế hệ thống điều hòa, lạnh công nghiệp và công nghệ hàng không vũ trụ.",
      subjects: ["Nhiệt động lực học", "Hệ thống lạnh", "Khí động lực", "Vật liệu hàng không", "An toàn bay"],
      careers: ["Kỹ sư nhiệt-lạnh", "Kỹ sư hàng không", "Thiết kế HVAC", "Kỹ thuật bảo trì máy bay"],
      avgSalary: "15-40 triệu/tháng",
      employmentRate: "85%",
      difficulty: 8,
      relatedMajors: ["dien", "co_khi", "xay_dung"]
    },

    // Sư phạm & Giáo dục
    {
      id: "su_pham_toan",
      name: "Sư phạm Toán",
      category: "sudp",
      description: "Đào tạo giáo viên Toán học cho các cấp học từ THCS đến THPT.",
      subjects: ["Toán cao cấp", "Phương pháp giảng dạy", "Tâm lý học giáo dục", "Sư phạm Toán", "Giáo dục STEM"],
      careers: ["Giáo viên Toán", "Giáo viên STEM", "Quản lý giáo dục", "Tổ trưởng bộ môn", "Giáo viên luyện thi"],
      avgSalary: "8-18 triệu/tháng",
      employmentRate: "90%",
      difficulty: 6,
      relatedMajors: ["su_pham_ly", "su_pham_hoa", "toan_ung_dung"]
    },
    {
      id: "su_pham_ly",
      name: "Sư phạm Vật lý",
      category: "sudp",
      description: "Đào tạo giáo viên Vật lý với kiến thức chuyên sâu và kỹ năng sư phạm.",
      subjects: ["Vật lý đại cương", "Vật lý hiện đại", "Phương pháp giảng dạy", "TN Vật lý", "Giáo dục STEM"],
      careers: ["Giáo viên Vật lý", "Giáo viên STEM", "Chuyên viên thiết bị", "Quản lý phòng thí nghiệm"],
      avgSalary: "8-18 triệu/tháng",
      employmentRate: "88%",
      difficulty: 7,
      relatedMajors: ["su_pham_toan", "su_pham_hoa", "ky_thuat_o_to"]
    },
    {
      id: "su_pham_hoa",
      name: "Sư phạm Hóa học",
      category: "sudp",
      description: "Đào tạo giáo viên Hóa học với kỹ năng thí nghiệm và giảng dạy.",
      subjects: ["Hóa hữu cơ", "Hóa vô cơ", "Hóa lý", "Phương pháp giảng dạy", "TN Hóa học"],
      careers: ["Giáo viên Hóa", "Chuyên viên phòng thí nghiệm", "QA/QC", "Nghiên cứu viên"],
      avgSalary: "8-18 triệu/tháng",
      employmentRate: "87%",
      difficulty: 7,
      relatedMajors: ["su_pham_sinh", "duoc", "cnhh"]
    },
    {
      id: "su_pham_sinh",
      name: "Sư phạm Sinh học",
      category: "sudp",
      description: "Đào tạo giáo viên Sinh học với kiến thức về sinh học đời sống và vi sinh.",
      subjects: ["Sinh học tế bào", "Sinh học phân tử", "Sinh thái học", "Phương pháp giảng dạy", "Giáo dục STEM"],
      careers: ["Giáo viên Sinh", "Chuyên viên môi trường", "Kỹ thuật viên y tế", "Nghiên cứu sinh học"],
      avgSalary: "8-18 triệu/tháng",
      employmentRate: "86%",
      difficulty: 6,
      relatedMajors: ["su_pham_hoa", "nong_nghiep", "yte"]
    },
    {
      id: "giao_duc_mam_non",
      name: "Giáo dục mầm non",
      category: "sudp",
      description: "Chăm sóc và giáo dục trẻ em từ 0-6 tuổi, phát triển toàn diện.",
      subjects: ["Tâm lý trẻ em", "Phương pháp dạy trẻ", "Vệ sinh sức khỏe", "Âm nhạc trẻ", "Mĩ thuật trẻ"],
      careers: ["Cô giáo mầm non", "Hiệu trưởng trường mầm non", "Chuyên gia giáo dục sớm", "Tư vấn phát triển trẻ"],
      avgSalary: "6-15 triệu/tháng",
      employmentRate: "93%",
      difficulty: 5,
      relatedMajors: ["tinh_than_hoa", "giao_duc_dac_biet"]
    },
    {
      id: "quan_ly_giao_duc",
      name: "Quản lý giáo dục",
      category: "sudp",
      description: "Đào tạo nhà quản lý, lãnh đạo trong các cơ sở giáo dục.",
      subjects: ["Quản lý giáo dục", "Tâm lý học quản lý", "Chính sách giáo dục", "Lãnh đạo giáo dục", "Đánh giá giáo dục"],
      careers: ["Hiệu trưởng", "Quản lý giáo dục", "Chuyên viên Bộ GD", "Tư vấn giáo dục", "Nghiên cứu chính sách"],
      avgSalary: "12-30 triệu/tháng",
      employmentRate: "82%",
      difficulty: 7,
      relatedMajors: ["sudp", "quan_tri"]
    },

    // Luật & Hành chính
    {
      id: "luat",
      name: "Luật",
      category: "luat",
      description: "Nghiên cứu hệ thống pháp luật, tư vấn pháp lý và hoạt động tố tụng.",
      subjects: ["Luật dân sự", "Luật hình sự", "Luật hành chính", "Luật thương mại", "Luật quốc tế", "Tố tụng hình sự"],
      careers: ["Luật sư", "Thẩm phán", "Kiểm sát viên", "Công chứng viên", "Tư vấn pháp lý doanh nghiệp"],
      avgSalary: "15-50 triệu/tháng",
      employmentRate: "85%",
      difficulty: 8,
      relatedMajors: ["luat_kinhte", "luat_quoc_te", "hanh_chinh"]
    },
    {
      id: "luat_kinhte",
      name: "Luật Kinh tế",
      category: "luat",
      description: "Áp dụng pháp luật trong hoạt động kinh doanh, thương mại và đầu tư.",
      subjects: ["Luật thương mại", "Luật đầu tư", "Luật sở hữu trí tuệ", "Luật cạnh tranh", "Tài chính doanh nghiệp"],
      careers: ["Tư vấn doanh nghiệp", "Luật sư doanh nghiệp", "Chuyên viên pháp chế", "Giám đốc pháp lý"],
      avgSalary: "18-50 triệu/tháng",
      employmentRate: "90%",
      difficulty: 8,
      relatedMajors: ["luat", "kinhte", "quan_tri_kinhdoanh"]
    },
    {
      id: "hanh_chinh",
      name: "Hành chính học",
      category: "luat",
      description: "Quản lý nhà nước, hành chính công và dịch vụ công.",
      subjects: ["Khoa học hành chính", "Luật hành chính", "Quản lý công", "Chính sách công", "Hành vi tổ chức"],
      careers: ["Công chức", "Viên chức nhà nước", "Chuyên viên hành chính", "Quản lý nhà nước", "Chính trị gia"],
      avgSalary: "10-25 triệu/tháng",
      employmentRate: "80%",
      difficulty: 6,
      relatedMajors: ["luat", "chinh_tri_hoc", "quan_tri_cong"]
    },

    // Nghệ thuật & Thiết kế
    {
      id: "thiet_ke_do_hoa",
      name: "Thiết kế đồ họa",
      category: "design",
      description: "Sáng tạo hình ảnh, logo, banner, UI/UX cho các sản phẩm truyền thông.",
      subjects: ["Thiết kế số", "Typography", "Màu sắc", "UI/UX", "Branding", "Motion Graphics"],
      careers: ["Graphic Designer", "UI/UX Designer", "Art Director", "Brand Designer", "Illustrator"],
      avgSalary: "10-25 triệu/tháng",
      employmentRate: "85%",
      difficulty: 6,
      relatedMajors: ["thiet_ke_noi_that", "my_thuat", "truyen_thong"]
    },
    {
      id: "thiet_ke_noi_that",
      name: "Thiết kế nội thất",
      category: "design",
      description: "Thiết kế không gian sống và làm việc, từ căn hộ đến văn phòng.",
      subjects: ["Kiến trúc nội thất", "Vật liệu", "Chiếu sáng", "Đồ gỗ", "AutoCAD", "SketchUp"],
      careers: ["Interior Designer", "Project Manager xây dựng", "Showroom Manager", "Trang trí nội thất"],
      avgSalary: "12-30 triệu/tháng",
      employmentRate: "83%",
      difficulty: 6,
      relatedMajors: ["kien_truc", "thiet_ke_do_hoa", "kien_truc_noi_that"]
    },
    {
      id: "my_thuat",
      name: "Mỹ thuật",
      category: "design",
      description: "Sáng tạo nghệ thuật, hội họa, điêu khắc và các hình thức nghệ thuật truyền thống.",
      subjects: ["Hội họa", "Điêu khắc", "Lịch sử nghệ thuật", "Bố cục", "Màu sắc", "Vẽ kỹ thuật"],
      careers: ["Họa sĩ", "Nhà điêu khắc", "Giáo viên mỹ thuật", "Bảo tồn di sản", "Nghệ nhân"],
      avgSalary: "8-20 triệu/tháng",
      employmentRate: "70%",
      difficulty: 7,
      relatedMajors: ["thiet_ke_do_hoa", "nghe_thuat_the_chat", "lich_su_nghe_thuat"]
    },
    {
      id: "thoi_trang",
      name: "Thời trang",
      category: "design",
      description: "Thiết kế, sản xuất và kinh doanh sản phẩm thời trang.",
      subjects: ["Thiết kế thời trang", "May công nghiệp", "Lịch sử thời trang", "Marketing thời trang", "Textile"],
      careers: ["Fashion Designer", "Stylist", "Quản lý thời trang", "Buyer", "Pattern Maker"],
      avgSalary: "10-25 triệu/tháng",
      employmentRate: "80%",
      difficulty: 6,
      relatedMajors: ["thiet_ke_do_hoa", "cong_nghe_may", "marketing"]
    },
    {
      id: "nghe_thuat_so",
      name: "Nghệ thuật số",
      category: "design",
      description: "Sáng tạo nghệ thuật kỹ thuật số, game art, animation và VFX.",
      subjects: ["Digital Art", "3D Modeling", "Animation", "Game Art", "VFX", "Character Design"],
      careers: ["2D/3D Artist", "Animator", "Game Artist", "VFX Artist", "Concept Artist"],
      avgSalary: "12-30 triệu/tháng",
      employmentRate: "85%",
      difficulty: 7,
      relatedMajors: ["thiet_ke_do_hoa", "truyen_hinh", "cntt"]
    },

    // Nông - Lâm - Ngư
    {
      id: "nong_nghiep",
      name: "Nông nghiệp",
      category: "nnl",
      description: "Kỹ thuật trồng trọt, chăn nuôi, bảo vệ thực vật và nông sản.",
      subjects: ["Trồng trọt", "Chăn nuôi", "Bảo vệ thực vật", "Thổ nhưỡng", "Công nghệ sau thu hoạch"],
      careers: ["Kỹ sư nông nghiệp", "Quản lý trang trại", "Chuyên viên BVTV", "Kinh doanh nông sản", "Nghiên cứu"],
      avgSalary: "8-18 triệu/tháng",
      employmentRate: "85%",
      difficulty: 6,
      relatedMajors: ["lam_nghiep", "thu_y", "sinh_vat"]
    },
    {
      id: "thu_y",
      name: "Thú y",
      category: "nnl",
      description: "Phòng và điều trị bệnh cho động vật, kiểm soát an toàn thực phẩm.",
      subjects: ["Giải phẫu động vật", "Bệnh lý", "Dược lý thú y", "Thực phẩm động vật", "Dịch tễ học"],
      careers: ["Bác sĩ thú y", "Chuyên viên kiểm dịch", "Quản lý trang trại chăn nuôi", "NV thực phẩm"],
      avgSalary: "10-22 triệu/tháng",
      employmentRate: "88%",
      difficulty: 7,
      relatedMajors: ["nong_nghiep", "yte", "an_toan_thuc_pham"]
    },
    {
      id: "lam_nghiep",
      name: "Lâm nghiệp",
      category: "nnl",
      description: "Quản lý, bảo vệ và phát triển rừng, tài nguyên môi trường.",
      subjects: ["Sinh thái rừng", "Lâm sinh", "Bảo tồn đa dạng sinh học", "Quản lý TNTN", "Lâm nghiệp xã hội"],
      careers: ["Kỹ sư lâm nghiệp", "Quản lý rừng", "Chuyên viên môi trường", "Kiểm lâm", "Du lịch sinh thái"],
      avgSalary: "8-18 triệu/tháng",
      employmentRate: "82%",
      difficulty: 6,
      relatedMajors: ["nong_nghiep", "quan_ly_tnmt", "sinh_vat"]
    },
    {
      id: "thuy_san",
      name: "Thủy sản",
      category: "nnl",
      description: "Nuôi trồng và đánh bắt thủy sản, quản lý nguồn lợi biển.",
      subjects: ["Nuôi trồng thủy sản", "Công nghệ chế biến", "Quản lý nguồn lợi", "Môi trường nước", "Di truyền thủy sản"],
      careers: ["Kỹ sư thủy sản", "Quản lý trang trại tôm/cá", "Chế biến thủy sản", "Kiểm ngư", "Xuất khẩu thủy sản"],
      avgSalary: "10-22 triệu/tháng",
      employmentRate: "86%",
      difficulty: 6,
      relatedMajors: ["nong_nghiep", "moi_truong", "sinh_vat"]
    },
    {
      id: "an_toan_thuc_pham",
      name: "An toàn thực phẩm",
      category: "nnl",
      description: "Kiểm soát chất lượng, an toàn vệ sinh trong sản xuất và chế biến thực phẩm.",
      subjects: ["VSAT thực phẩm", "Công nghệ thực phẩm", "Vi sinh", "Hóa thực phẩm", "Hệ thống quản lý chất lượng"],
      careers: ["Chuyên viên ATVSTP", "QA/QC thực phẩm", "Kiểm định viên", "Quản lý NS bảo hộ lao động"],
      avgSalary: "10-20 triệu/tháng",
      employmentRate: "90%",
      difficulty: 6,
      relatedMajors: ["cong_nghe_tp", "nong_nghiep", "duoc"]
    },

    // Ngôn ngữ & Du lịch
    {
      id: "tieng_anh",
      name: "Ngôn ngữ Anh",
      category: "nn",
      description: "Nghiên cứu và sử dụng thành thạo tiếng Anh, văn hóa Anglo-Saxon.",
      subjects: ["Tiếng Anh giao tiếp", "Ngữ pháp", "Dịch thuật", "Văn học Anh-Mỹ", "Ngôn ngữ học"],
      careers: ["Biên phiên dịch", "Giáo viên tiếng Anh", "Chuyên viên ngoại giao", "Du lịch quốc tế", "Content Creator"],
      avgSalary: "10-25 triệu/tháng",
      employmentRate: "88%",
      difficulty: 6,
      relatedMajors: ["tieng_trung", "tieng_nhat", "du_lich"]
    },
    {
      id: "tieng_trung",
      name: "Ngôn ngữ Trung Quốc",
      category: "nn",
      description: "Học tiếng Trung, văn hóa và giao thương với Trung Quốc.",
      subjects: ["Tiếng Trung giao tiếp", "Hán văn", "Dịch thuật TQ", "Kinh tế Trung Quốc", "Văn hóa Đông Á"],
      careers: ["Biên phiên dịch", "Kinh doanh với TQ", "Hướng dẫn du lịch", "Ngoại giao", "Giáo viên"],
      avgSalary: "12-30 triệu/tháng",
      employmentRate: "90%",
      difficulty: 7,
      relatedMajors: ["tieng_anh", "tieng_nhat", "kinhte"]
    },
    {
      id: "tieng_nhat",
      name: "Ngôn ngữ Nhật Bản",
      category: "nn",
      description: "Học tiếng Nhật, văn hóa và cơ hội làm việc tại Nhật Bản.",
      subjects: ["Tiếng Nhật N5-N1", "Kanji", "Văn hóa Nhật Bản", "Biên phiên dịch", "Kinh doanh Nhật"],
      careers: ["Biên phiên dịch", "Kỹ sư IT tại Nhật", "Giáo viên tiếng Nhật", "HR cho công ty Nhật", "Du lịch Nhật Bản"],
      avgSalary: "15-35 triệu/tháng",
      employmentRate: "92%",
      difficulty: 8,
      relatedMajors: ["tieng_anh", "cntt", "du_lich"]
    },
    {
      id: "du_lich",
      name: "Du lịch",
      category: "nn",
      description: "Tổ chức, điều hành và quản lý các hoạt động du lịch.",
      subjects: ["Quản trị du lịch", "Hướng dẫn du lịch", "Marketing du lịch", "Địa lý du lịch", "Văn hóa ẩm thực"],
      careers: ["Hướng dẫn viên", "Điều hành tour", "Quản lý khách sạn", "Lữ hành", "Tư vấn du lịch"],
      avgSalary: "8-20 triệu/tháng",
      employmentRate: "85%",
      difficulty: 5,
      relatedMajors: ["khach_san", "nha_hang", "marketing"]
    },
    {
      id: "khach_san",
      name: "Quản trị khách sạn",
      category: "nn",
      description: "Quản lý vận hành khách sạn, resort, các cơ sở lưu trú cao cấp.",
      subjects: ["Quản trị khách sạn", "Front Office", "Housekeeping", "F&B", "Event Management", "Revenue Management"],
      careers: ["Quản lý khách sạn", "Lễ tân cao cấp", "Event Manager", "Revenue Manager", "Hotel Consultant"],
      avgSalary: "10-25 triệu/tháng",
      employmentRate: "87%",
      difficulty: 5,
      relatedMajors: ["du_lich", "nha_hang", "quan_tri_kinhdoanh"]
    },
    {
      id: "nha_hang",
      name: "Quản trị nhà hàng",
      category: "nn",
      description: "Tổ chức, điều hành và quản lý hoạt động kinh doanh ẩm thực.",
      subjects: ["Quản trị F&B", "Ẩm thực học", "Pha chế", "Quản lý bếp", "Marketing ẩm thực", "NS bảo hộ lao động"],
      careers: ["Quản lý nhà hàng", "Bar Manager", "Head Chef", "F&B Manager", "Chủ quán kinh doanh"],
      avgSalary: "10-25 triệu/tháng",
      employmentRate: "88%",
      difficulty: 5,
      relatedMajors: ["khach_san", "du_lich", "quan_tri_kinhdoanh"]
    },

    // Kiến trúc & Xây dựng
    {
      id: "kien_truc",
      name: "Kiến trúc",
      category: "kien_truc",
      description: "Thiết kế các công trình xây dựng từ nhà ở đến công trình công cộng.",
      subjects: ["Thiết kế kiến trúc", "Lịch sử kiến trúc", "Cấu tạo kiến trúc", "Kết cấu", "AutoCAD", "SketchUp", "Revit"],
      careers: ["Kiến trúc sư", "Thiết kế cảnh quan", "Quản lý dự án xây dựng", "Tư vấn bất động sản"],
      avgSalary: "15-40 triệu/tháng",
      employmentRate: "85%",
      difficulty: 8,
      relatedMajors: ["kien_truc_noi_that", "thiet_ke_noi_that", "xay_dung"]
    },
    {
      id: "xay_dung",
      name: "Kỹ thuật xây dựng",
      category: "kien_truc",
      description: "Thiết kế, thi công và quản lý các công trình xây dựng dân dụng và công nghiệp.",
      subjects: ["Kết cấu xây dựng", "Vật liệu xây dựng", "Thi công", "Dự toán", "AutoCAD", "Quản lý dự án"],
      careers: ["Kỹ sư xây dựng", "Giám sát thi công", "Chỉ huy trưởng", "Quản lý dự án", "Kinh doanh VLXD"],
      avgSalary: "12-30 triệu/tháng",
      employmentRate: "92%",
      difficulty: 7,
      relatedMajors: ["kien_truc", "quan_ly_xay_dung", "co_khi"]
    },
    {
      id: "quan_ly_xay_dung",
      name: "Quản lý xây dựng",
      category: "kien_truc",
      description: "Quản lý chất lượng, tiến độ và chi phí các dự án xây dựng.",
      subjects: ["Quản lý dự án", "Kinh tế xây dựng", "Luật xây dựng", "An toàn lao động", "Đấu thầu"],
      careers: ["Quản lý dự án", "Chỉ huy trưởng", "Giám đốc thi công", "Tư vấn quản lý", "Chuyên viên đấu thầu"],
      avgSalary: "18-40 triệu/tháng",
      employmentRate: "90%",
      difficulty: 7,
      relatedMajors: ["xay_dung", "quan_tri_kinhdoanh", "kinhte"]
    },
    {
      id: "ket_cau",
      name: "Kỹ thuật kết cấu",
      category: "kien_truc",
      description: "Tính toán, thiết kế kết cấu cho các công trình xây dựng.",
      subjects: ["Sức bền vật liệu", "Kết cấu BTCT", "Kết cấu thép", "Nền móng", "SAP2000", "ETABS"],
      careers: ["Kỹ sư kết cấu", "Thiết kế kết cấu", "Kiểm định công trình", "Tư vấn kỹ thuật"],
      avgSalary: "15-35 triệu/tháng",
      employmentRate: "88%",
      difficulty: 8,
      relatedMajors: ["xay_dung", "kien_truc", "co_khi"]
    }
  ],

  // Quiz questions for career guidance
  quizQuestions: [
    {
      id: 1,
      question: "Bạn thích làm việc với đối tượng nào nhất?",
      options: [
        { text: "Máy tính và công nghệ", scores: { cntt: 3, kysu: 1 } },
        { text: "Con người và giao tiếp", scores: { kinhte: 2, nn: 2, sudp: 2 } },
        { text: "Con số và dữ liệu", scores: { kinhte: 3, tai_chinh: 2 } },
        { text: "Thiên nhiên và sinh vật", scores: { nnl: 3, yte: 1 } },
        { text: "Sáng tạo và nghệ thuật", scores: { design: 3, nn: 1 } }
      ]
    },
    {
      id: 2,
      question: "Môn học nào bạn giỏi hoặc yêu thích nhất?",
      options: [
        { text: "Toán học", scores: { cntt: 2, kysu: 2, kinhte: 1 } },
        { text: "Vật lý, Hóa học", scores: { kysu: 3, yte: 1 } },
        { text: "Ngữ văn, Ngoại ngữ", scores: { nn: 3, sudp: 1, design: 1 } },
        { text: "Sinh học", scores: { yte: 3, nnl: 2 } },
        { text: "Mỹ thuật, Âm nhạc", scores: { design: 3, nn: 1 } }
      ]
    },
    {
      id: 3,
      question: "Bạn muốn làm việc trong môi trường nào?",
      options: [
        { text: "Văn phòng công ty, doanh nghiệp", scores: { kinhte: 2, cntt: 1 } },
        { text: "Nhà máy, công trường", scores: { kysu: 2, kien_truc: 1 } },
        { text: "Bệnh viện, phòng khám", scores: { yte: 3 } },
        { text: "Trường học, trung tâm giáo dục", scores: { sudp: 3 } },
        { text: "Studio, không gian sáng tạo", scores: { design: 3 } }
      ]
    },
    {
      id: 4,
      question: "Mức lương khởi điểm quan trọng như thế nào với bạn?",
      options: [
        { text: "Rất quan trọng, cần lương cao ngay", scores: { cntt: 2, yte: 2, kysu: 1 } },
        { text: "Quan trọng nhưng không phải ưu tiên số 1", scores: { kinhte: 2, kien_truc: 1 } },
        { text: "Có thể chấp nhận lương thấp để học hỏi", scores: { sudp: 2, nn: 1, design: 1 } }
      ]
    },
    {
      id: 5,
      question: "Bạn thấy mình là người có tính cách như thế nào?",
      options: [
        { text: "Logic, phân tích, yêu thích giải quyết vấn đề", scores: { cntt: 3, kysu: 2 } },
        { text: "Năng động, giao tiếp tốt, thích thuyết phục", scores: { kinhte: 3, nn: 1 } },
        { text: "Nhẫn nại, cẩn thận, yêu thích chăm sóc người khác", scores: { yte: 3, sudp: 2 } },
        { text: "Sáng tạo, bay bổng, thích cái đẹp", scores: { design: 3, nn: 1 } },
        { text: "Thực tế, khéo léo, thích làm việc tay", scores: { kysu: 3, kien_truc: 2 } }
      ]
    }
  ],

  // Top rankings
  rankings: {
    highestSalary: ["cntt", "yte", "kien_truc", "khoa_hoc_may_tinh", "luat"],
    easiestJob: ["su_pham_toan", "ke_toan", "dieu_duong", "marketing", "du_lich"],
    lowestCutoff: ["su_pham_sinh", "nong_nghiep", "lam_nghiep", "giao_duc_mam_non", "thuy_san"],
    hotTrending: ["trituenhanh", "an_toan_thongtin", "dien_tu", "du_lich", "thiet_ke_do_hoa"]
  }
};

// Get major by ID
function getMajorById(id) {
  return majorsData.majors.find(m => m.id === id);
}

// Get majors by category
function getMajorsByCategory(categoryId) {
  return majorsData.majors.filter(m => m.category === categoryId);
}

// Get category by ID
function getCategoryById(id) {
  return majorsData.categories.find(c => c.id === id);
}

// Search majors
function searchMajors(query) {
  if (!query || query.trim() === '') return majorsData.majors;
  
  const searchTerm = query.toLowerCase().trim();
  return majorsData.majors.filter(m => 
    m.name.toLowerCase().includes(searchTerm) ||
    m.description.toLowerCase().includes(searchTerm) ||
    m.careers.some(c => c.toLowerCase().includes(searchTerm))
  );
}

// Filter majors by multiple criteria
function filterMajors(filters) {
  let result = [...majorsData.majors];
  
  if (filters.category) {
    result = result.filter(m => m.category === filters.category);
  }
  
  if (filters.minSalary) {
    const salaryMap = {
      low: [0, 10],
      medium: [10, 18],
      high: [18, 30],
      veryhigh: [30, 100]
    };
    const range = salaryMap[filters.minSalary];
    if (range) {
      result = result.filter(m => {
        const salary = parseInt(m.avgSalary.match(/\d+/)[0]);
        return salary >= range[0] && salary < range[1];
      });
    }
  }
  
  if (filters.difficulty) {
    result = result.filter(m => m.difficulty <= filters.difficulty);
  }
  
  if (filters.employmentRate) {
    result = result.filter(m => parseInt(m.employmentRate) >= filters.employmentRate);
  }
  
  return result;
}

// Get related majors
function getRelatedMajors(majorId) {
  const major = getMajorById(majorId);
  if (!major || !major.relatedMajors) return [];
  
  return major.relatedMajors.map(id => getMajorById(id)).filter(Boolean);
}

// Calculate quiz results
function calculateQuizResults(answers) {
  const scores = {};
  
  answers.forEach((answerIndex, questionIndex) => {
    const question = majorsData.quizQuestions[questionIndex];
    if (question && question.options[answerIndex]) {
      const optionScores = question.options[answerIndex].scores;
      Object.keys(optionScores).forEach(cat => {
        scores[cat] = (scores[cat] || 0) + optionScores[cat];
      });
    }
  });
  
  // Convert scores to sorted array
  const sortedCategories = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([cat]) => cat);
  
  return sortedCategories;
}

// Get recommended majors from quiz
function getRecommendedMajors(answers) {
  const topCategories = calculateQuizResults(answers);
  const recommendations = [];
  
  topCategories.slice(0, 3).forEach(cat => {
    const catMajors = getMajorsByCategory(cat);
    if (catMajors.length > 0) {
      // Pick top 2 from each category
      recommendations.push(...catMajors.slice(0, 2));
    }
  });
  
  return recommendations.slice(0, 6);
}

// Get top majors by ranking type
function getTopMajors(type, limit = 5) {
  const rankingIds = majorsData.rankings[type];
  if (!rankingIds) return [];
  
  return rankingIds.slice(0, limit).map(id => getMajorById(id)).filter(Boolean);
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = majorsData;
}

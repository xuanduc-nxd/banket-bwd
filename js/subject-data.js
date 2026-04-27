// Complete Subject Combinations Data for Vietnamese University Entrance Exams
const subjectCombinations = {
  // Khối A - Toán, Lý, Hóa (Math, Physics, Chemistry)
  A: {
    name: "Khối A",
    subjects: ["Toán", "Lý", "Hóa"],
    combinations: {
      "A00": { subjects: ["Toán", "Vật lý", "Hóa học"] },
      "A01": { subjects: ["Toán", "Vật lý", "Tiếng Anh"] },
      "A02": { subjects: ["Toán", "Vật lý", "Sinh học"] },
      "A03": { subjects: ["Toán", "Vật lý", "Lịch sử"] },
      "A04": { subjects: ["Toán", "Vật lý", "Địa lý"] },
      "A05": { subjects: ["Toán", "Hóa học", "Sinh học"] },
      "A06": { subjects: ["Toán", "Sinh học", "Lịch sử"] },
      "A07": { subjects: ["Toán", "Hóa học", "Lịch sử"] },
      "A08": { subjects: ["Toán", "Sinh học", "Địa lý"] },
      "A09": { subjects: ["Toán", "Hóa học", "Địa lý"] },
      "A10": { subjects: ["Toán", "Vật lý", "GDCD"] },
      "A11": { subjects: ["Toán", "Hóa học", "GDCD"] },
      "A12": { subjects: ["Toán", "Sinh học", "GDCD"] },
      "A13": { subjects: ["Toán", "Vật lý", "Ngữ văn"] },
      "A14": { subjects: ["Toán", "Lịch sử", "Địa lý"] },
      "A15": { subjects: ["Toán", "Lịch sử", "GDCD"] },
      "A16": { subjects: ["Toán", "Địa lý", "GDCD"] },
      "A17": { subjects: ["Toán", "Lý", "Sinh học"] },
      "A18": { subjects: ["Toán", "Hóa", "Ngữ văn"] },
      "A19": { subjects: ["Toán", "Địa lý", "Ngữ văn"] }
    }
  },

  // Khối B - Toán, Hóa, Sinh (Math, Chemistry, Biology)
  B: {
    name: "Khối B",
    subjects: ["Toán", "Hóa", "Sinh"],
    combinations: {
      "B00": { subjects: ["Toán", "Hóa học", "Sinh học"] },
      "B01": { subjects: ["Toán", "Lịch sử", "Địa lý"] },
      "B02": { subjects: ["Toán", "Sinh học", "Lịch sử"] },
      "B03": { subjects: ["Toán", "Sinh học", "Ngữ văn"] },
      "B04": { subjects: ["Toán", "Sinh học", "GDCD"] },
      "B05": { subjects: ["Toán", "Hóa học", "Ngữ văn"] },
      "B08": { subjects: ["Toán", "Hóa học", "Địa lý"] }
    }
  },

  // Khối C - Văn, Sử, Địa (Literature, History, Geography)
  C: {
    name: "Khối C",
    subjects: ["Văn", "Sử", "Địa"],
    combinations: {
      "C00": { subjects: ["Ngữ văn", "Lịch sử", "Địa lý"] },
      "C01": { subjects: ["Ngữ văn", "Toán học", "Vật lý"] },
      "C02": { subjects: ["Ngữ văn", "Toán học", "Hóa học"] },
      "C03": { subjects: ["Ngữ văn", "Toán học", "Tiếng Anh"] },
      "C04": { subjects: ["Ngữ văn", "Toán học", "Ngữ văn"] },
      "C05": { subjects: ["Ngữ văn", "Vật lý", "Hóa học"] },
      "C06": { subjects: ["Ngữ văn", "Vật lý", "Sinh học"] },
      "C07": { subjects: ["Ngữ văn", "Vật lý", "Lịch sử"] },
      "C08": { subjects: ["Ngữ văn", "Hóa học", "Sinh học"] },
      "C09": { subjects: ["Ngữ văn", "Lịch sử", "Tiếng Anh"] },
      "C10": { subjects: ["Ngữ văn", "Địa lý", "Tiếng Anh"] },
      "C12": { subjects: ["Ngữ văn", "Lịch sử", "GDCD"] },
      "C13": { subjects: ["Ngữ văn", "Địa lý", "GDCD"] },
      "C14": { subjects: ["Ngữ văn", "Ngữ văn", "GDCD"] },
      "C15": { subjects: ["Ngữ văn", "Toán học", "Lịch sử"] },
      "C16": { subjects: ["Ngữ văn", "Toán học", "Địa lý"] },
      "C17": { subjects: ["Ngữ văn", "Toán học", "GDCD"] },
      "C18": { subjects: ["Ngữ văn", "Vật lý", "Địa lý"] },
      "C19": { subjects: ["Ngữ văn", "Hóa học", "Lịch sử"] },
      "C20": { subjects: ["Ngữ văn", "Hóa học", "Địa lý"] }
    }
  },

  // Khối D - Toán, Văn, Anh và các tổ hợp khác (Math, Literature, English variants)
  D: {
    name: "Khối D",
    subjects: ["Toán", "Văn", "Anh"],
    combinations: {
      "D01": { subjects: ["Toán", "Ngữ văn", "Tiếng Anh"] },
      "D02": { subjects: ["Toán", "Ngữ văn", "Tiếng Nga"] },
      "D03": { subjects: ["Toán", "Ngữ văn", "Tiếng Pháp"] },
      "D04": { subjects: ["Toán", "Ngữ văn", "Tiếng Trung"] },
      "D05": { subjects: ["Toán", "Ngữ văn", "Tiếng Đức"] },
      "D06": { subjects: ["Toán", "Ngữ văn", "Tiếng Nhật"] },
      "D07": { subjects: ["Toán", "Hóa học", "Tiếng Anh"] },
      "D08": { subjects: ["Toán", "Sinh học", "Tiếng Anh"] },
      "D09": { subjects: ["Toán", "Lịch sử", "Tiếng Anh"] },
      "D10": { subjects: ["Toán", "Địa lý", "Tiếng Anh"] },
      "D11": { subjects: ["Toán", "Vật lý", "Tiếng Anh"] },
      "D12": { subjects: ["Toán", "Lý", "Tiếng Pháp"] },
      "D13": { subjects: ["Toán", "Hóa", "Tiếng Pháp"] },
      "D14": { subjects: ["Toán", "Sinh", "Tiếng Pháp"] },
      "D15": { subjects: ["Toán", "Vật lý", "Tiếng Trung"] },
      "D16": { subjects: ["Toán", "Hóa học", "Tiếng Trung"] },
      "D17": { subjects: ["Toán", "Vật lý", "Tiếng Nhật"] },
      "D18": { subjects: ["Toán", "Hóa học", "Tiếng Nhật"] },
      "D19": { subjects: ["Toán", "Vật lý", "Tiếng Đức"] },
      "D21": { subjects: ["Toán", "Hóa học", "Tiếng Đức"] },
      "D22": { subjects: ["Toán", "Sinh học", "Tiếng Trung"] },
      "D23": { subjects: ["Toán", "Lịch sử", "Tiếng Pháp"] },
      "D24": { subjects: ["Toán", "Địa lý", "Tiếng Pháp"] },
      "D25": { subjects: ["Toán", "Lịch sử", "Tiếng Trung"] },
      "D26": { subjects: ["Toán", "Địa lý", "Tiếng Trung"] },
      "D27": { subjects: ["Toán", "Lịch sử", "Tiếng Nhật"] },
      "D28": { subjects: ["Toán", "Địa lý", "Tiếng Nhật"] },
      "D29": { subjects: ["Toán", "Lịch sử", "Tiếng Đức"] },
      "D30": { subjects: ["Toán", "Địa lý", "Tiếng Đức"] },
      "D31": { subjects: ["Toán", "Vật lý", "Tiếng Nga"] },
      "D32": { subjects: ["Toán", "Hóa học", "Tiếng Nga"] },
      "D33": { subjects: ["Toán", "Sinh học", "Tiếng Nga"] },
      "D34": { subjects: ["Toán", "Lịch sử", "Tiếng Nga"] },
      "D35": { subjects: ["Toán", "Địa lý", "Tiếng Nga"] },
      "D36": { subjects: ["Toán", "GDCD", "Tiếng Anh"] },
      "D37": { subjects: ["Toán", "Ngữ văn", "Ngữ văn"] },
      "D38": { subjects: ["Toán", "Vật lý", "Ngữ văn"] },
      "D39": { subjects: ["Toán", "Hóa học", "Ngữ văn"] },
      "D40": { subjects: ["Toán", "Sinh học", "Ngữ văn"] },
      "D41": { subjects: ["Toán", "Lịch sử", "Ngữ văn"] },
      "D42": { subjects: ["Toán", "Địa lý", "Ngữ văn"] },
      "D43": { subjects: ["Toán", "GDCD", "Tiếng Pháp"] },
      "D44": { subjects: ["Toán", "GDCD", "Tiếng Trung"] },
      "D45": { subjects: ["Toán", "GDCD", "Tiếng Nhật"] },
      "D46": { subjects: ["Toán", "GDCD", "Tiếng Đức"] },
      "D47": { subjects: ["Toán", "GDCD", "Tiếng Nga"] },
      "D48": { subjects: ["Toán", "Ngữ văn", "Lịch sử"] },
      "D49": { subjects: ["Toán", "Ngữ văn", "Địa lý"] },
      "D50": { subjects: ["Toán", "Ngữ văn", "GDCD"] },
      "D51": { subjects: ["Toán", "Vật lý", "Lịch sử"] },
      "D52": { subjects: ["Toán", "Vật lý", "Địa lý"] },
      "D53": { subjects: ["Toán", "Vật lý", "GDCD"] },
      "D54": { subjects: ["Toán", "Hóa học", "Lịch sử"] },
      "D55": { subjects: ["Toán", "Hóa học", "Địa lý"] },
      "D56": { subjects: ["Toán", "Sinh học", "Lịch sử"] },
      "D57": { subjects: ["Toán", "Sinh học", "Địa lý"] },
      "D58": { subjects: ["Toán", "Sinh học", "GDCD"] },
      "D59": { subjects: ["Toán", "Lịch sử", "Địa lý"] },
      "D60": { subjects: ["Toán", "Lịch sử", "GDCD"] },
      "D61": { subjects: ["Toán", "Địa lý", "GDCD"] },
      "D62": { subjects: ["Toán", "Ngữ văn", "Sinh học"] },
      "D63": { subjects: ["Toán", "Ngữ văn", "Vật lý"] },
      "D64": { subjects: ["Toán", "Ngữ văn", "Hóa học"] },
      "D65": { subjects: ["Toán", "Ngữ văn", "Lịch sử"] },
      "D66": { subjects: ["Toán", "Ngữ văn", "Địa lý"] },
      "D67": { subjects: ["Toán", "Ngữ văn", "GDCD"] },
      "D68": { subjects: ["Toán", "Ngữ văn", "Kinh tế"] },
      "D69": { subjects: ["Toán", "Ngữ văn", "Tin học"] },
      "D70": { subjects: ["Toán", "Ngữ văn", "Công dân"] },
      "D71": { subjects: ["Toán", "Ngữ văn", "Giáo dục"] },
      "D72": { subjects: ["Toán", "Ngữ văn", "Pháp luật"] },
      "D73": { subjects: ["Toán", "Ngữ văn", "Mỹ thuật"] },
      "D74": { subjects: ["Toán", "Ngữ văn", "Âm nhạc"] },
      "D75": { subjects: ["Toán", "Ngữ văn", "Thể dục"] },
      "D76": { subjects: ["Toán", "Ngữ văn", "Tiếng Anh (IELTS)"] },
      "D77": { subjects: ["Toán", "Ngữ văn", "Tiếng Anh (TOEFL)"] },
      "D78": { subjects: ["Toán", "Ngữ văn", "Tiếng Anh (SAT)"] },
      "D79": { subjects: ["Toán", "Ngữ văn", "Lịch sử (nâng cao)"] },
      "D80": { subjects: ["Toán", "Ngữ văn", "Địa lý (nâng cao)"] },
      "D81": { subjects: ["Toán", "Vật lý", "Hóa học"] },
      "D82": { subjects: ["Toán", "Vật lý", "Sinh học"] },
      "D83": { subjects: ["Toán", "Vật lý", "Kinh tế"] },
      "D84": { subjects: ["Toán", "Hóa học", "Kinh tế"] },
      "D85": { subjects: ["Toán", "Sinh học", "Kinh tế"] },
      "D86": { subjects: ["Toán", "Tin học", "Tiếng Anh"] },
      "D87": { subjects: ["Toán", "Tin học", "Ngữ văn"] },
      "D88": { subjects: ["Toán", "Tin học", "Vật lý"] },
      "D89": { subjects: ["Toán", "Tin học", "Hóa học"] },
      "D90": { subjects: ["Toán", "Tin học", "Sinh học"] },
      "D91": { subjects: ["Toán", "Tiếng Anh", "GDCD"] },
      "D92": { subjects: ["Toán", "Tiếng Trung", "GDCD"] },
      "D93": { subjects: ["Toán", "Tiếng Nhật", "GDCD"] },
      "D94": { subjects: ["Toán", "Tiếng Hàn", "GDCD"] },
      "D95": { subjects: ["Toán", "Tiếng Pháp", "GDCD"] },
      "D96": { subjects: ["Toán", "Tiếng Đức", "GDCD"] }
    }
  },

  // Khối M - Năng khiếu Âm nhạc (Music Talent)
  M: {
    name: "Khối M",
    subjects: ["Âm nhạc"],
    combinations: {
      "M00": { subjects: ["Âm nhạc", "Ngữ văn", "Tiếng Anh"] },
      "M01": { subjects: ["Âm nhạc", "Ngữ văn", "Lịch sử"] },
      "M02": { subjects: ["Âm nhạc", "Toán", "Tiếng Anh"] },
      "M03": { subjects: ["Âm nhạc", "Hình họa", "Khảo sát"] },
      "M04": { subjects: ["Âm nhạc", "Ngữ văn"] },
      "M05": { subjects: ["Âm nhạc", "Tiếng Anh"] },
      "M06": { subjects: ["Âm nhạc", "Thẩm mỹ"] },
      "M07": { subjects: ["Âm nhạc", "Piano"] },
      "M08": { subjects: ["Âm nhạc", "Guitar"] },
      "M09": { subjects: ["Âm nhạc", "Violin"] },
      "M10": { subjects: ["Âm nhạc", "Organ"] }
    }
  },

  // Khối N - Năng khiếu Thẩm mỹ (Fine Arts Talent)
  N: {
    name: "Khối N",
    subjects: ["Mỹ thuật"],
    combinations: {
      "N00": { subjects: ["Mỹ thuật", "Ngữ văn", "Tiếng Anh"] },
      "N01": { subjects: ["Mỹ thuật", "Toán", "Vật lý"] },
      "N02": { subjects: ["Mỹ thuật", "Toán", "Ngữ văn"] },
      "N03": { subjects: ["Mỹ thuật", "Hình họa", "Khảo sát"] },
      "N04": { subjects: ["Mỹ thuật", "Thiết kế"] },
      "N05": { subjects: ["Mỹ thuật", "Trang trí"] },
      "N06": { subjects: ["Mỹ thuật", "Đồ họa"] },
      "N07": { subjects: ["Mỹ thuật", "Kiến trúc"] },
      "N08": { subjects: ["Mỹ thuật", "Công nghiệp"] },
      "N09": { subjects: ["Mỹ thuật", "May"] },
      "N10": { subjects: ["Mỹ thuật", "Nữ công"] }
    }
  },

  // Khối H - Năng khiếu Mỹ thuật (Art Talent)
  H: {
    name: "Khối H",
    subjects: ["Mỹ thuật"],
    combinations: {
      "H00": { subjects: ["Mỹ thuật", "Ngữ văn", "Tiếng Anh"] },
      "H01": { subjects: ["Mỹ thuật", "Toán", "Vật lý"] },
      "H02": { subjects: ["Mỹ thuật", "Toán", "Ngữ văn"] },
      "H03": { subjects: ["Mỹ thuật", "Hình họa", "Khảo sát"] },
      "H04": { subjects: ["Mỹ thuật", "Lịch sử"] },
      "H05": { subjects: ["Mỹ thuật", "Địa lý"] },
      "H06": { subjects: ["Mỹ thuật", "GDCD"] },
      "H07": { subjects: ["Mỹ thuật", "Tiếng Anh"] }
    }
  },

  // Khối S - Năng khiếu Thể thao (Sports Talent)
  S: {
    name: "Khối S",
    subjects: ["Thể thao"],
    combinations: {
      "S00": { subjects: ["Thể thao", "Ngữ văn", "Tiếng Anh"] },
      "S01": { subjects: ["Thể thao", "Toán", "Vật lý"] },
      "S02": { subjects: ["Thể thao", "Sinh học", "Hóa học"] },
      "S03": { subjects: ["Thể dục", "Ngữ văn", "Lịch sử"] },
      "S04": { subjects: ["Thể dục", "Sinh học"] },
      "S05": { subjects: ["Bơi lội", "Ngữ văn", "Tiếng Anh"] },
      "S06": { subjects: ["Bơi lội", "Sinh học", "Hóa học"] },
      "S07": { subjects: ["Bóng đá", "Ngữ văn", "Tiếng Anh"] },
      "S08": { subjects: ["Bóng đá", "Sinh học"] },
      "S09": { subjects: ["Cầu lông", "Ngữ văn", "Tiếng Anh"] }
    }
  },

  // Khối T - Toán, Tin học (Math, Informatics)
  T: {
    name: "Khối T",
    subjects: ["Toán", "Tin học"],
    combinations: {
      "T00": { subjects: ["Toán", "Ngữ văn", "Tin học"] },
      "T01": { subjects: ["Toán", "Vật lý", "Tin học"] },
      "T02": { subjects: ["Toán", "Hóa học", "Tin học"] },
      "T03": { subjects: ["Toán", "Sinh học", "Tin học"] },
      "T04": { subjects: ["Tin học", "Ngữ văn", "Tiếng Anh"] },
      "T05": { subjects: ["Tin học", "Toán", "Tiếng Anh"] }
    }
  },

  // Khối V - Chuyên ngành Kỹ thuật (Engineering)
  V: {
    name: "Khối V",
    subjects: ["Toán", "Vật lý", "Hóa học"],
    combinations: {
      "V00": { subjects: ["Toán", "Vật lý", "Hóa học"] },
      "V01": { subjects: ["Toán", "Vật lý", "Ngữ văn"] },
      "V02": { subjects: ["Toán", "Hóa học", "Ngữ văn"] },
      "V03": { subjects: ["Toán", "Vật lý", "Tiếng Anh"] },
      "V04": { subjects: ["Toán", "Hóa học", "Tiếng Anh"] },
      "V05": { subjects: ["Toán", "Vật lý", "Địa lý"] },
      "V06": { subjects: ["Toán", "Hóa học", "Địa lý"] },
      "V07": { subjects: ["Toán", "Vật lý", "Sinh học"] },
      "V08": { subjects: ["Toán", "Hóa học", "Sinh học"] },
      "V09": { subjects: ["Toán", "Vật lý", "GDCD"] },
      "V10": { subjects: ["Toán", "Hóa học", "GDCD"] },
      "V11": { subjects: ["Toán", "Vật lý", "Lịch sử"] },
      "V12": { subjects: ["Toán", "Hóa học", "Lịch sử"] }
    }
  },

  // Khối R - Báo chí, Truyền thông (Journalism, Media)
  R: {
    name: "Khối R",
    subjects: ["Ngữ văn", "Tiếng Anh"],
    combinations: {
      "R00": { subjects: ["Ngữ văn", "Lịch sử", "Tiếng Anh"] },
      "R01": { subjects: ["Ngữ văn", "Địa lý", "Tiếng Anh"] },
      "R02": { subjects: ["Ngữ văn", "GDCD", "Tiếng Anh"] },
      "R03": { subjects: ["Ngữ văn", "Lịch sử", "Địa lý"] },
      "R04": { subjects: ["Ngữ văn", "Lịch sử", "GDCD"] },
      "R05": { subjects: ["Ngữ văn", "Địa lý", "GDCD"] },
      "R06": { subjects: ["Ngữ văn", "Toán", "Tiếng Anh"] },
      "R07": { subjects: ["Ngữ văn", "Vật lý", "Tiếng Anh"] },
      "R08": { subjects: ["Ngữ văn", "Hóa học", "Tiếng Anh"] },
      "R09": { subjects: ["Ngữ văn", "Sinh học", "Tiếng Anh"] }
    }
  },

  // Khối K - Nông - Lâm - Ngư (Agriculture, Forestry, Fishery)
  K: {
    name: "Khối K",
    subjects: ["Toán", "Hóa học", "Sinh học"],
    combinations: {
      "K00": { subjects: ["Toán", "Sinh học", "Hóa học"] },
      "K01": { subjects: ["Toán", "Vật lý", "Hóa học"] },
      "K02": { subjects: ["Toán", "Sinh học", "Ngữ văn"] },
      "K03": { subjects: ["Toán", "Hóa học", "Ngữ văn"] },
      "K04": { subjects: ["Toán", "Sinh học", "Tiếng Anh"] },
      "K05": { subjects: ["Toán", "Hóa học", "Tiếng Anh"] },
      "K06": { subjects: ["Toán", "Sinh học", "Lịch sử"] },
      "K07": { subjects: ["Toán", "Hóa học", "Lịch sử"] },
      "K08": { subjects: ["Toán", "Sinh học", "Địa lý"] },
      "K09": { subjects: ["Toán", "Hóa học", "Địa lý"] },
      "K10": { subjects: ["Toán", "Sinh học", "GDCD"] },
      "K11": { subjects: ["Toán", "Hóa học", "GDCD"] },
      "K12": { subjects: ["Sinh học", "Hóa học", "Ngữ văn"] },
      "K13": { subjects: ["Sinh học", "Hóa học", "Tiếng Anh"] },
      "K14": { subjects: ["Sinh học", "Hóa học", "Địa lý"] }
    }
  }
};

// Get all combinations for a group
function getCombinationsForGroup(group) {
  if (group === 'other') {
    // Combine all other groups
    const otherCombinations = {};
    ['M', 'N', 'H', 'S', 'T', 'V', 'R', 'K'].forEach(g => {
      if (subjectCombinations[g]) {
        Object.assign(otherCombinations, subjectCombinations[g].combinations);
      }
    });
    return otherCombinations;
  }
  return subjectCombinations[group]?.combinations || {};
}

// Get subjects for a specific combination
function getSubjectsForCombination(code) {
  for (const group in subjectCombinations) {
    if (subjectCombinations[group].combinations[code]) {
      return subjectCombinations[group].combinations[code].subjects;
    }
  }
  return [];
}

// Get group name
function getGroupName(group) {
  if (group === 'other') return 'Khối khác';
  return subjectCombinations[group]?.name || "";
}

// Get all groups
function getAllGroups() {
  return Object.keys(subjectCombinations);
}

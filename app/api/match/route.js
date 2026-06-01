import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

// Định nghĩa phân loại rủi ro nguyện vọng
function classify(delta) {
  if (delta >= 2) return { id: "safe", label: "An toàn" };
  if (delta >= -1) return { id: "fit", label: "Phù hợp" };
  return { id: "reach", label: "Thử thách" };
}

export async function POST(request) {
  try {
    const profile = await request.json();
    const { combination, scores, interests = [], region = 'all', maxTuition = 0, schoolType = 'all' } = profile;

    const totalScore = Object.values(scores).reduce((sum, value) => sum + Number(value || 0), 0);

    // 1. Lấy toàn bộ danh sách điểm chuẩn liên kết với trường và ngành học
    const { data: cutoffsData, error } = await supabase
      .from('cutoffs')
      .select(`
        year,
        cutoff_score,
        university_id,
        major_id,
        university:universities (
          id, name, short_name, type, city, region, website, tuition, lat, lng
        ),
        major:majors (
          id, name, category, combos, description
        )
      `);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 2. Nhóm dữ liệu điểm chuẩn theo cặp (Trường - Ngành) để tính toán điểm qua các năm
    const groupedPairs = {};
    cutoffsData.forEach(item => {
      if (!item.university || !item.major) return;
      const key = `${item.university_id}-${item.major_id}`;
      if (!groupedPairs[key]) {
        groupedPairs[key] = {
          university: item.university,
          major: item.major,
          cutoffs: {}
        };
      }
      groupedPairs[key].cutoffs[item.year] = item.cutoff_score;
    });

    // 3. Thực hiện lọc và tính toán điểm tương thích (Matching Score)
    const matches = [];

    Object.values(groupedPairs).forEach(pair => {
      const { university, major, cutoffs } = pair;

      // Lọc theo tổ hợp môn thi
      if (!major.combos || !major.combos.includes(combination)) return;

      // Lọc theo khu vực ưu tiên
      if (region !== "all" && university.region !== "all" && university.region !== region) return;

      // Lọc theo loại trường (Công lập/Tư thục)
      if (schoolType !== "all" && university.type !== schoolType) return;

      // Lọc theo học phí tối đa
      if (maxTuition > 0 && university.tuition > maxTuition) return;

      // Lấy điểm chuẩn gần nhất có sẵn (ưu tiên 2025 -> 2024 -> 2023)
      const cutoff = cutoffs[2025] || cutoffs[2024] || cutoffs[2023];
      if (cutoff === undefined) return;

      const delta = totalScore - cutoff;
      const risk = classify(delta);

      // Tính xu hướng biến động điểm chuẩn
      const change = (cutoffs[2025] || 0) - (cutoffs[2023] || 0);
      const trend = change >= 1 ? "Tăng" : change <= -0.5 ? "Giảm" : "Ổn định";

      // Tính điểm số tương thích (Matching Score)
      const trendPenalty = trend === "Tăng" ? -4 : trend === "Giảm" ? 5 : 2;
      let matchScore = 58 + delta * 8;

      // categoryMatchBonus
      const categoryMatchBonus = interests.includes(major.category) ? 22 : 0;
      matchScore += categoryMatchBonus;

      // regionBonus
      let regionBonusVal = 8;
      if (region && region !== "all") {
        regionBonusVal = university.region === region ? 12 : -4;
      }
      matchScore += regionBonusVal;

      // tuitionBonus
      let tuitionBonusVal = 6;
      if (maxTuition > 0) {
        if (university.tuition <= maxTuition) {
          tuitionBonusVal = 12;
        } else {
          const over = university.tuition - maxTuition;
          tuitionBonusVal = Math.max(-12, 4 - over * 0.8);
        }
      }
      matchScore += tuitionBonusVal;
      matchScore += trendPenalty;
      matchScore = Math.max(1, Math.min(99, Math.round(matchScore)));

      // Tạo chuỗi lý giải so khớp
      const diffText = delta >= 0
        ? `cao hơn điểm tham khảo ${delta.toFixed(1)} điểm`
        : `thấp hơn điểm tham khảo ${Math.abs(delta).toFixed(1)} điểm`;
      const regionLabelText = region === "all"
        ? "không giới hạn khu vực"
        : `ưu tiên khu vực ${region === 'north' ? 'miền Bắc' : region === 'central' ? 'miền Trung' : 'miền Nam'}`;

      const reason = `Điểm của bạn ${diffText}, ngành học này thuộc lĩnh vực bạn quan tâm, trường ở ${university.city}, ${regionLabelText}. Xu hướng điểm chuẩn 3 năm qua: ${trend.toLowerCase()}.`;

      matches.push({
        id: `${university.id}-${major.id}`,
        university,
        major,
        cutoff,
        cutoffs,
        delta,
        risk,
        trend,
        score: matchScore,
        reason
      });
    });

    // 4. Sắp xếp theo thứ tự điểm tương thích giảm dần, sau đó là độ lệch điểm giảm dần
    // Trả về top 40 kết quả để giao diện có thể phân chia vào các nhóm an toàn (safe), phù hợp (fit), thử thách (reach)
    const sortedMatches = matches
      .sort((a, b) => b.score - a.score || b.delta - a.delta)
      .slice(0, 40);

    return NextResponse.json({
      profile,
      totalScore,
      matches: sortedMatches
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

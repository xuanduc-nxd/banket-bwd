(function () {
  "use strict";

  const DATA = window.UniMatchData;
  const UI = window.UniMatch;
  let selectedCategory = "all";
  let compare = [];
  let quizIndex = 0;
  let quizScores = {};

  const questions = [
    {
      text: "Bạn thích kiểu công việc nào nhất?",
      options: [
        { text: "Phân tích, lập trình, làm việc với dữ liệu", scores: { cntt: 3, kysu: 1 } },
        { text: "Giao tiếp, kinh doanh, xây dựng thương hiệu", scores: { kinhte: 3, nn: 1 } },
        { text: "Chăm sóc con người và sức khỏe", scores: { yte: 3, sudp: 1 } },
        { text: "Sáng tạo hình ảnh, không gian, sản phẩm", scores: { design: 3, xaydung: 2 } }
      ]
    },
    {
      text: "Môn học hoặc năng lực nào bạn tự tin hơn?",
      options: [
        { text: "Toán, Tin học, tư duy logic", scores: { cntt: 3, kysu: 2 } },
        { text: "Văn, Ngoại ngữ, giao tiếp", scores: { nn: 3, luat: 2 } },
        { text: "Sinh, Hóa, kiến thức sức khỏe", scores: { yte: 3, nonglam: 2 } },
        { text: "Mỹ thuật, thiết kế, quan sát", scores: { design: 3, xaydung: 2 } }
      ]
    },
    {
      text: "Bạn ưu tiên điều gì sau khi tốt nghiệp?",
      options: [
        { text: "Thu nhập cao và thị trường tăng trưởng", scores: { cntt: 3, yte: 2, kinhte: 1 } },
        { text: "Công việc ổn định, có ý nghĩa xã hội", scores: { sudp: 3, yte: 2, luat: 1 } },
        { text: "Môi trường năng động, nhiều cơ hội kinh doanh", scores: { kinhte: 3, nn: 1 } },
        { text: "Tạo sản phẩm hữu hình, công trình hoặc thiết kế", scores: { kysu: 2, xaydung: 3, design: 2 } }
      ]
    }
  ];

  function renderCategories() {
    const box = UI.$("#categoryChips");
    box.innerHTML = `<button class="chip is-active" data-category="all">Tất cả</button>` + DATA.categories
      .map((cat) => `<button class="chip" data-category="${cat.id}">${cat.name}</button>`)
      .join("");

    UI.$all("[data-category]", box).forEach((button) => {
      button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;
        UI.$all("[data-category]", box).forEach((item) => item.classList.toggle("is-active", item === button));
        renderMajors();
      });
    });
  }

  function renderMajors() {
    const query = UI.$("#search").value.trim().toLowerCase();
    const difficulty = Number(UI.$("#difficulty").value || 10);
    const list = DATA.majors.filter((major) => {
      const text = `${major.name} ${major.description} ${major.careers.join(" ")}`.toLowerCase();
      if (query && !text.includes(query)) return false;
      if (selectedCategory !== "all" && major.category !== selectedCategory) return false;
      if (major.difficulty > difficulty) return false;
      return true;
    });

    UI.$("#majorCount").textContent = `${list.length} ngành`;
    UI.$("#majorsGrid").innerHTML = list.length ? list.map((major) => majorCard(major)).join("") : `<div class="empty-state">Không tìm thấy ngành phù hợp.</div>`;
    UI.$all("[data-compare]").forEach((button) => button.addEventListener("click", () => addCompare(button.dataset.compare)));
  }

  function majorCard(major) {
    const cat = DATA.getCategory(major.category);
    return `
      <article class="major-card">
        <div class="card-top">
          <span class="pill" style="color:${cat.color};background:#f8fafc">${cat.name}</span>
          <span class="pill">Độ khó ${major.difficulty}/10</span>
        </div>
        <div class="card-body">
          <h3>${major.name}</h3>
          <p>${major.description}</p>
          <div class="meta-row">
            <span class="pill">Lương: ${major.salary}</span>
            <span class="pill">Việc làm: ${major.employment}%</span>
            <span class="pill">${major.combos.join(", ")}</span>
          </div>
          <p><strong>Nghề nghiệp:</strong> ${major.careers.join(", ")}</p>
        </div>
        <div class="card-actions">
          <button class="mini-btn" data-compare="${major.id}">So sánh</button>
        </div>
      </article>
    `;
  }

  function addCompare(id) {
    if (compare.includes(id)) {
      UI.toast("Ngành này đã có trong danh sách so sánh.");
      return;
    }
    if (compare.length >= 3) {
      UI.toast("Chỉ so sánh tối đa 3 ngành để bảng dễ đọc.");
      return;
    }
    compare.push(id);
    renderCompare();
  }

  function renderCompare() {
    const dock = UI.$("#compareDock");
    const items = UI.$("#compareItems");
    dock.classList.toggle("is-visible", compare.length > 0);
    items.innerHTML = compare.map((id) => `<span class="pill">${DATA.getMajor(id).name}</span>`).join("");
  }

  function openCompare() {
    if (compare.length < 2) {
      UI.toast("Cần ít nhất 2 ngành để so sánh.");
      return;
    }
    const majors = compare.map((id) => DATA.getMajor(id)).filter(Boolean);
    UI.$("#modalBody").innerHTML = `
      <table class="compare-table">
        <tr><th>Tiêu chí</th>${majors.map((m) => `<th>${m.name}</th>`).join("")}</tr>
        <tr><td>Nhóm ngành</td>${majors.map((m) => `<td>${DATA.getCategory(m.category).name}</td>`).join("")}</tr>
        <tr><td>Mức lương</td>${majors.map((m) => `<td>${m.salary}</td>`).join("")}</tr>
        <tr><td>Tỷ lệ việc làm</td>${majors.map((m) => `<td>${m.employment}%</td>`).join("")}</tr>
        <tr><td>Độ khó</td>${majors.map((m) => `<td>${m.difficulty}/10</td>`).join("")}</tr>
        <tr><td>Tổ hợp</td>${majors.map((m) => `<td>${m.combos.join(", ")}</td>`).join("")}</tr>
        <tr><td>Nghề nghiệp</td>${majors.map((m) => `<td>${m.careers.join(", ")}</td>`).join("")}</tr>
      </table>
    `;
    UI.$("#compareModal").classList.add("is-open");
  }

  function renderQuiz() {
    const box = UI.$("#quizBox");
    const question = questions[quizIndex];

    if (!question) {
      const results = Object.entries(quizScores).sort((a, b) => b[1] - a[1]).slice(0, 3);
      box.innerHTML = `
        <h3>Kết quả định hướng</h3>
        <p>Ba nhóm ngành nổi bật nhất theo câu trả lời của bạn:</p>
        <div class="meta-row">
          ${results.map(([id, score]) => `<span class="pill">${DATA.getCategory(id)?.name || id}: ${score} điểm</span>`).join("")}
        </div>
        <div class="row-actions">
          <button class="btn-secondary" id="applyQuiz">Lọc theo nhóm mạnh nhất</button>
          <button class="btn-ghost" id="restartQuiz">Làm lại</button>
        </div>
      `;
      UI.$("#applyQuiz").addEventListener("click", () => {
        selectedCategory = results[0]?.[0] || "all";
        renderCategories();
        UI.$all("[data-category]").forEach((item) => {
          item.classList.toggle("is-active", item.dataset.category === selectedCategory);
        });
        renderMajors();
      });
      UI.$("#restartQuiz").addEventListener("click", () => {
        quizIndex = 0;
        quizScores = {};
        renderQuiz();
      });
      return;
    }

    box.innerHTML = `
      <h3>Câu ${quizIndex + 1}/${questions.length}</h3>
      <p>${question.text}</p>
      <div class="quiz-options">
        ${question.options.map((option, index) => `<button class="quiz-option" data-answer="${index}">${option.text}</button>`).join("")}
      </div>
    `;

    UI.$all("[data-answer]", box).forEach((button) => {
      button.addEventListener("click", () => {
        const option = question.options[Number(button.dataset.answer)];
        Object.entries(option.scores).forEach(([id, score]) => {
          quizScores[id] = (quizScores[id] || 0) + score;
        });
        quizIndex += 1;
        renderQuiz();
      });
    });
  }

  function renderTrends() {
    const trends = [
      { title: "AI và dữ liệu", text: "Nhu cầu nhân lực tăng nhanh, phù hợp học sinh mạnh Toán - Tin.", tag: "Hot" },
      { title: "An toàn thông tin", text: "Doanh nghiệp số hóa kéo theo nhu cầu bảo mật hệ thống.", tag: "Tăng trưởng" },
      { title: "Kinh tế số", text: "Marketing số, thương mại điện tử và phân tích kinh doanh tiếp tục mở rộng.", tag: "Ổn định cao" }
    ];
    UI.$("#trendGrid").innerHTML = trends.map((item) => `
      <article class="tool-card trend-card">
        <span class="pill fit">${item.tag}</span>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </article>
    `).join("");
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderCategories();
    renderMajors();
    renderQuiz();
    renderTrends();

    UI.$("#search").addEventListener("input", renderMajors);
    UI.$("#difficulty").addEventListener("input", renderMajors);
    UI.$("#clearCompare").addEventListener("click", () => {
      compare = [];
      renderCompare();
    });
    UI.$("#openCompare").addEventListener("click", openCompare);
    UI.$("#closeModal").addEventListener("click", () => UI.$("#compareModal").classList.remove("is-open"));
    UI.$("#compareModal").addEventListener("click", (event) => {
      if (event.target.id === "compareModal") event.currentTarget.classList.remove("is-open");
    });
  });
})();

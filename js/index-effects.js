/**
 * index-effects.js
 * Chứa các hiệu ứng hình ảnh và chuyển động đặc thù cho trang chủ UniMatch
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Khởi tạo AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000, // Thời gian hoàn thành một hiệu ứng (1000ms = 1 giây)
      once: false,    // false: Hiệu ứng sẽ chạy lại mỗi khi bạn cuộn qua lại phần tử đó.
      offset: 100,    // Khoảng cách (pixel) tính từ dưới màn hình lên đến phần tử trước khi kích hoạt hiệu ứng
    });
  }

  // 2. Khởi tạo hiệu ứng Quả cầu (Vanta.js Globe)
  if (typeof VANTA !== 'undefined' && document.querySelector("#vanta-canvas")) {
    VANTA.GLOBE({
      el: "#vanta-canvas",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x3f41f4,
      color2: 0xdedede,
      size: 0.90,
      backgroundColor: 0xf2f2f7
    });
  }

  // 3. Hiệu ứng gõ chữ (Typed.js)
  if (typeof Typed !== 'undefined' && document.querySelector("#typing")) {
    new Typed("#typing", {
      strings: [
        '"an toàn hơn, rõ ràng hơn."',
        '"điểm chuẩn không còn là ẩn số."',
        '"lựa chọn có cơ sở hơn."'
      ],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 1000,
      loop: true
    });
  }

  // 4. Hiệu ứng chữ lượn sóng (SplitType & GSAP)
  if (typeof SplitType !== 'undefined' && typeof gsap !== 'undefined' && document.querySelector(".glith-wavev")) {
    const text = new SplitType(".glith-wavev", { types: "chars" });

    // Hiệu ứng wave liên tục
    gsap.to(text.chars, {
      y: -10,
      x: 5,
      rotation: 2,
      duration: 0.6,
      ease: "sine.inOut",
      stagger: {
        each: 0.05,
        repeat: -1,
        yoyo: true
      }
    });

    // Hiệu ứng nhấp nháy nhẹ
    gsap.to(".glith-wavev", {
      opacity: 0.8,
      duration: 0.08,
      repeat: -1,
      yoyo: true
    });
  }

  // 5. Hiệu ứng Hover cho các thẻ card (GSAP)
  if (typeof gsap !== 'undefined') {
    document.querySelectorAll(".tool-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          boxShadow: "0 0 20px cyan, 0 0 0px blue",
          duration: 0.2
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          boxShadow: "0 0 0 transparent",
          duration: 0.1
        });
      });
    });
  }
});

// Multi-step Form Logic
function initMatchForm() {
  const form = document.getElementById("matchForm");
  if (!form) return;

  const steps = form.querySelectorAll(".form-step");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");
  const scoreInputs = document.getElementById("scoreInputs");
  const selectedGroupName = document.getElementById("selectedGroupName");
  
  let currentStep = 1;
  const totalSteps = steps.length;

  // Subject Group Tabs Logic
  const groupTabs = document.querySelectorAll(".group-tab");
  const subjectDropdowns = document.querySelectorAll(".subject-dropdown");

  groupTabs.forEach(tab => {
    tab.addEventListener("click", function() {
      const group = this.dataset.group;
      
      // Update active tab
      groupTabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      
      // Show corresponding dropdown
      subjectDropdowns.forEach(dropdown => {
        dropdown.classList.remove("active");
        if (dropdown.dataset.group === group) {
          dropdown.classList.add("active");
        }
      });
    });
  });

  function updateStepDisplay() {
    steps.forEach((step, index) => {
      step.classList.toggle("active", index + 1 === currentStep);
    });

    prevBtn.disabled = currentStep === 1;
    
    if (currentStep === totalSteps) {
      nextBtn.style.display = "none";
      submitBtn.style.display = "inline-flex";
    } else {
      nextBtn.style.display = "inline-flex";
      submitBtn.style.display = "none";
    }
  }

  function validateStep(step) {
    if (step === 1) {
      const selectedGroup = form.querySelector('input[name="subject_group"]:checked');
      return !!selectedGroup;
    }
    if (step === 2) {
      const inputs = scoreInputs.querySelectorAll('input[type="number"]');
      let valid = true;
      inputs.forEach(input => {
        const value = parseFloat(input.value);
        if (isNaN(value) || value < 0 || value > 10) {
          valid = false;
          input.parentElement.classList.add("error");
        } else {
          input.parentElement.classList.remove("error");
        }
      });
      return valid;
    }
    if (step === 3) {
      const selectedInterests = form.querySelectorAll('input[name="interests"]:checked');
      return selectedInterests.length > 0;
    }
    return true;
  }

  function generateScoreInputs() {
    const selectedGroup = form.querySelector('input[name="subject_group"]:checked');
    if (!selectedGroup) return;

    const subjects = JSON.parse(selectedGroup.dataset.subjects || "[]");
    const groupCode = selectedGroup.value;
    
    selectedGroupName.textContent = `${groupCode} (${subjects.join(", ")})`;

    scoreInputs.innerHTML = subjects.map((subject, index) => `
      <div class="score-input">
        <label for="score_${index}">Nhập điểm môn ${subject}</label>
        <input 
          type="number" 
          id="score_${index}" 
          name="score_${index}"
          min="0" 
          max="10" 
          step="0.01" 
          placeholder="0.00"
          required
        >
      </div>
    `).join("");

    // Add input animation
    scoreInputs.querySelectorAll("input").forEach(input => {
      input.addEventListener("focus", function() {
        this.parentElement.classList.add("focused");
      });
      input.addEventListener("blur", function() {
        this.parentElement.classList.remove("focused");
        validateScoreInput(this);
      });
    });
  }

  function validateScoreInput(input) {
    const value = parseFloat(input.value);
    const wrapper = input.parentElement;
    
    if (isNaN(value) || value < 0 || value > 10) {
      wrapper.classList.add("error");
      return false;
    }
    wrapper.classList.remove("error");
    return true;
  }

  // Event Listeners
  nextBtn.addEventListener("click", () => {
    if (validateStep(currentStep)) {
      if (currentStep === 1) {
        generateScoreInputs();
      }
      currentStep++;
      updateStepDisplay();
      animateStepTransition("next");
    } else {
      showValidationError();
    }
  });

  prevBtn.addEventListener("click", () => {
    currentStep--;
    updateStepDisplay();
    animateStepTransition("prev");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (validateStep(3)) {
      submitForm();
    } else {
      showValidationError();
    }
  });

  // Subject option selection animation
  const subjectOptions = form.querySelectorAll(".subject-option input");
  subjectOptions.forEach(option => {
    option.addEventListener("change", function() {
      if (this.checked) {
        // Remove checked from other options in same dropdown
        const parentDropdown = this.closest(".subject-dropdown");
        parentDropdown.querySelectorAll(".subject-option input").forEach(opt => {
          if (opt !== this) {
            opt.checked = false;
            opt.closest(".subject-option").classList.remove("selected");
          }
        });
        
        this.closest(".subject-option").classList.add("selected");
        // Animate the option
        this.closest(".subject-option").style.transform = "scale(1.05)";
        setTimeout(() => {
          this.closest(".subject-option").style.transform = "";
        }, 200);
      }
    });
  });

  // Interest selection animation
  const interestOptions = form.querySelectorAll(".interest-option input");
  interestOptions.forEach(option => {
    option.addEventListener("change", function() {
      if (this.checked) {
        this.closest(".interest-option").classList.add("selected");
      } else {
        this.closest(".interest-option").classList.remove("selected");
      }
    });
  });

  updateStepDisplay();
}

function animateStepTransition(direction) {
  const activeStep = document.querySelector(".form-step.active");
  if (!activeStep) return;

  activeStep.style.animation = "none";
  activeStep.offsetHeight; // Trigger reflow
  activeStep.style.animation = direction === "next" 
    ? "slideInRight 0.4s ease" 
    : "slideInLeft 0.4s ease";
}

function showValidationError() {
  const form = document.getElementById("matchForm");
  
  // Add shake animation
  form.style.animation = "shake 0.5s ease";
  setTimeout(() => {
    form.style.animation = "";
  }, 500);

  // Highlight error fields
  const errorFields = form.querySelectorAll(".score-input.error");
  
  // Visual feedback for interests
  if (currentStep === 3) {
    const interestsGrid = document.getElementById("interestsGrid");
    interestsGrid.style.border = "2px dashed var(--color-accent)";
    setTimeout(() => {
      interestsGrid.style.border = "";
    }, 2000);
  }
}

// Form submission
function submitForm() {
  const form = document.getElementById("matchForm");
  const formData = new FormData(form);
  
  const data = {
    subjectGroup: formData.get("subject_group"),
    scores: [],
    interests: []
  };

  // Collect scores
  const scoreInputs = document.querySelectorAll("#scoreInputs input");
  scoreInputs.forEach(input => {
    data.scores.push(parseFloat(input.value));
  });

  // Collect interests
  const checkedInterests = form.querySelectorAll('input[name="interests"]:checked');
  checkedInterests.forEach(checkbox => {
    data.interests.push(checkbox.value);
  });

  // Show success animation
  showSuccessAnimation();

  // Log data (in real app, this would be sent to server)
  console.log("Form submitted:", data);
}

function showSuccessAnimation() {
  const submitBtn = document.getElementById("submitBtn");
  
  submitBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="check-icon">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    Đang tìm kiếm...
  `;
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      Tìm thấy! Chuyển trang...
    `;
    
    // Redirect after showing success
    setTimeout(() => {
      window.location.href = "./pages/suggestions.html";
    }, 1000);
  }, 2000);
}

// ========== STAGGER SCROLL ANIMATIONS ==========
function initStaggerAnimations() {
  const staggerContainers = document.querySelectorAll('[data-stagger]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const container = entry.target;
        const items = container.querySelectorAll('[data-stagger-item]');
        const baseDelay = parseInt(container.dataset.stagger) || 100;
        
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('stagger-animated');
          }, index * baseDelay);
        });
        
        observer.unobserve(container);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });
  
  staggerContainers.forEach(container => {
    observer.observe(container);
  });
}

// ========== HOVER 3D EFFECT ==========
function init3DHover() {
  const cards3D = document.querySelectorAll('.card-3d');
  
  cards3D.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

// ========== PARALLAX EFFECT ==========
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const offset = scrollY * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  });
}

// ========== NUMBER COUNTING ANIMATION ==========
function animateNumber(element, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function
    const easeOutExpo = 1 - Math.pow(2, -10 * progress);
    const current = Math.floor(easeOutExpo * target);
    
    element.textContent = current.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target.toLocaleString();
    }
  }
  
  requestAnimationFrame(update);
}

function initNumberAnimations() {
  const counters = document.querySelectorAll('[data-count]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const duration = parseInt(el.dataset.duration) || 2000;
        
        animateNumber(el, target, duration);
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.5
  });
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// ========== RIPPLE EFFECT ==========
function initRippleEffect() {
  const buttons = document.querySelectorAll('.btn-ripple');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// ========== FLOATING ANIMATION ==========
function initFloatingAnimation() {
  const floatingElements = document.querySelectorAll('.floating');
  
  floatingElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.5}s`;
  });
}

// ========== PROGRESS BAR ANIMATION ==========
function initProgressBars() {
  const progressBars = document.querySelectorAll('[data-progress]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const progress = bar.dataset.progress;
        
        setTimeout(() => {
          bar.style.width = progress + '%';
        }, 100);
        
        observer.unobserve(bar);
      }
    });
  }, {
    threshold: 0.5
  });
  
  progressBars.forEach(bar => {
    observer.observe(bar);
  });
}

// ========== TYPEWRITER EFFECT ==========
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

function initTypewriter() {
  const typewriters = document.querySelectorAll('[data-typewriter]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.dataset.typewriter;
        const speed = parseInt(el.dataset.speed) || 50;
        
        typeWriter(el, text, speed);
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.5
  });
  
  typewriters.forEach(el => {
    observer.observe(el);
  });
}

// ========== MORPHING SHAPE ANIMATION ==========
function initMorphingShapes() {
  const shapes = document.querySelectorAll('.morphing-shape');
  
  shapes.forEach(shape => {
    const colors = JSON.parse(shape.dataset.colors || '["#0077b6", "#00b4d8"]');
    let colorIndex = 0;
    
    setInterval(() => {
      colorIndex = (colorIndex + 1) % colors.length;
      shape.style.background = colors[colorIndex];
    }, 3000);
  });
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
  // Get all elements with data-animate attribute
  const animatedElements = document.querySelectorAll("[data-animate]");
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Get delay from data-delay attribute or use default
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => {
          entry.target.classList.add("animated");
        }, delay);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

// Counter Animation for Statistics
function initCounterAnimation() {
  const counters = document.querySelectorAll(".stat-number");
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const current = Math.floor(easeOutQuart * target);
          
          counter.textContent = current.toLocaleString();
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString();
          }
        }
        
        requestAnimationFrame(updateCounter);
        observer.unobserve(counter);
      }
    });
  }, {
    threshold: 0.5
  });
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}

// Mobile Navigation Toggle
function initNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }
}

// ========== STAGGER ANIMATION STYLES ==========
const staggerStyle = document.createElement("style");
staggerStyle.textContent = `
  /* Stagger Animation */
  [data-stagger-item] {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  [data-stagger-item].stagger-animated {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* 3D Card Effect */
  .card-3d {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    transform-style: preserve-3d;
  }
  
  /* Parallax */
  [data-parallax] {
    will-change: transform;
  }
  
  /* Progress Bar Animation */
  [data-progress] {
    width: 0;
    transition: width 1s ease-out;
  }
  
  /* Ripple Effect */
  .ripple-effect {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: translate(-50%, -50%) scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: translate(-50%, -50%) scale(4);
      opacity: 0;
    }
  }
  
  /* Floating Animation */
  .floating {
    animation: float 3s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  /* Morphing Shape */
  .morphing-shape {
    transition: background 1s ease;
  }
  
  /* Glitch Effect for hover */
  .glitch:hover {
    animation: glitch 0.3s ease infinite;
  }
  
  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }
  
  /* Glow Pulse */
  .glow-pulse {
    animation: glowPulse 2s ease-in-out infinite;
  }
  
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 5px rgba(0, 119, 182, 0.3); }
    50% { box-shadow: 0 0 20px rgba(0, 119, 182, 0.6); }
  }
  
  /* Shimmer Loading */
  .shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  /* Spin Animation */
  .spin-slow {
    animation: spinSlow 8s linear infinite;
  }
  
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  /* Bounce In */
  .bounce-in {
    animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  
  @keyframes bounceIn {
    0% { transform: scale(0); opacity: 0; }
    60% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }
  
  /* Fade Scale */
  .fade-scale {
    transition: all 0.4s ease;
  }
  
  .fade-scale:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }
  
  /* Slide Up on Scroll */
  .slide-up {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.6s ease;
  }
  
  .slide-up.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Cursor Trail */
  .cursor-trail {
    position: fixed;
    width: 8px;
    height: 8px;
    background: var(--color-primary);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  body:hover .cursor-trail {
    opacity: 0.5;
  }
`;

// Add stagger styles to head
document.head.appendChild(staggerStyle);

// Add dynamic styles
const style = document.createElement("style");
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .score-input.error input {
    border-color: #ef4444 !important;
    background: #fef2f2 !important;
  }
  
  .score-input.focused {
    transform: scale(1.02);
  }
  
  .check-icon {
    animation: checkmark 0.5s ease forwards;
  }
  
  @keyframes checkmark {
    0% { transform: scale(0); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }

  .subject-option.selected .option-content {
    animation: selectPop 0.3s ease;
  }

  @keyframes selectPop {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1.05); }
  }
  
  /* Scroll animation base styles */
  [data-animate] {
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  [data-animate="fadeInUp"] {
    transform: translateY(40px);
  }
  
  [data-animate="fadeInDown"] {
    transform: translateY(-30px);
  }
  
  [data-animate="fadeInLeft"] {
    transform: translateX(-40px);
  }
  
  [data-animate="fadeInRight"] {
    transform: translateX(40px);
  }
  
  [data-animate="fadeIn"] {
    transform: scale(0.95);
  }
  
  [data-animate].animated {
    opacity: 1;
    transform: translateY(0) translateX(0) scale(1);
  }
  
  /* Number counting animation */
  .counting {
    transition: color 0.3s ease;
  }
`;
document.head.appendChild(style);

// Initialize everything on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initMatchForm();
  initScrollAnimations();
  initStaggerAnimations();
  initSmoothScroll();
  initNavigation();
  initCounterAnimation();
  initNumberAnimations();
  initProgressBars();
  initTypewriter();
  initFloatingAnimation();
  initRippleEffect();
});

// Re-initialize on page load
if (document.readyState === "complete" || document.readyState === "interactive") {
  setTimeout(() => {
    initMatchForm();
    initScrollAnimations();
    initStaggerAnimations();
    initSmoothScroll();
    initNavigation();
    initCounterAnimation();
    initNumberAnimations();
    initProgressBars();
    initTypewriter();
    initFloatingAnimation();
    initRippleEffect();
  }, 100);
}

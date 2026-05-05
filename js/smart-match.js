// Smart Match Application Logic
(function() {
  'use strict';

  // State management
  const state = {
    currentStep: 1,
    selectedGroup: null,
    selectedCombination: null,
    scores: {},
    interests: []
  };

  // LocalStorage keys
  const STORAGE_KEY_FORM = 'unimatch_form_state';
  const STORAGE_KEY_CONSULTATION = 'unimatch_consultation';

  // DOM Elements
  const form = document.getElementById('smartMatchForm');
  const stepIndicator = document.querySelector('.step-indicator');
  const steps = document.querySelectorAll('.form-step');
  const subjectGroupBtns = document.querySelectorAll('.subject-group-btn');
  const combinationSelectWrapper = document.getElementById('combinationSelectWrapper');
  const combinationSelect = document.getElementById('combinationSelect');
  const scoreInputsGrid = document.getElementById('scoreInputsGrid');
  const resultsList = document.getElementById('resultsList');
  const resultsSummary = document.getElementById('resultsSummary');

  // Navigation buttons
  const step1Next = document.getElementById('step1Next');
  const step2Prev = document.getElementById('step2Prev');
  const step2Next = document.getElementById('step2Next');
  const step3Prev = document.getElementById('step3Prev');
  const searchBtn = document.getElementById('searchBtn');
  const restartBtn = document.getElementById('restartBtn');

  // Initialize
  function init() {
    setupSubjectGroupSelection();
    setupNavigation();
    setupInterestSelection();
    setupRestart();
    
    // Check for saved state and restore if exists
    restoreFormState();
  }

  // Save form state to localStorage
  function saveFormState() {
    const formState = {
      selectedGroup: state.selectedGroup,
      selectedCombination: state.selectedCombination,
      scores: state.scores,
      interests: state.interests,
      currentStep: state.currentStep,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY_FORM, JSON.stringify(formState));
  }

  // Restore form state from localStorage
  function restoreFormState() {
    const stored = localStorage.getItem(STORAGE_KEY_FORM);
    const consultation = localStorage.getItem(STORAGE_KEY_CONSULTATION);
    
    if (consultation) {
      // User has completed consultation before, show results page
      try {
        const consultationData = JSON.parse(consultation);
        // Go to step 4 (results) directly
        state.currentStep = 4;
        state.selectedCombination = consultationData.combination;
        state.scores = consultationData.scores || {};
        state.interests = consultationData.interests || [];
        
        // Update summary display
        document.getElementById('summaryCombination').textContent = consultationData.combination || '--';
        document.getElementById('summaryScore').textContent = consultationData.totalScore ? consultationData.totalScore.toFixed(2) : '--';
        document.getElementById('summaryInterests').textContent = (consultationData.interests?.length || 0) + ' lĩnh vực';
        
        // Restore results display
        displaySavedResults(consultationData);
        
        // Update step indicator
        updateStepIndicator(4);
        
        // Show step 4, hide others
        steps.forEach(s => {
          const stepNum = parseInt(s.dataset.step);
          if (stepNum === 4) {
            s.classList.add('active');
            s.style.display = 'block';
          } else {
            s.classList.remove('active');
            s.style.display = 'none';
          }
        });
        
        return;
      } catch (e) {
        console.error('Error restoring consultation:', e);
      }
    }
    
    if (stored) {
      try {
        const formState = JSON.parse(stored);
        state.selectedGroup = formState.selectedGroup;
        state.selectedCombination = formState.selectedCombination;
        state.scores = formState.scores || {};
        state.interests = formState.interests || [];
        
        // Restore group selection
        if (state.selectedGroup) {
          subjectGroupBtns.forEach(btn => {
            if (btn.dataset.group === state.selectedGroup) {
              btn.classList.add('selected');
            }
          });
          
          // Show combination dropdown
          const groupCombinations = getCombinationsForGroup(state.selectedGroup);
          populateCombinationDropdown(groupCombinations);
          combinationSelectWrapper.style.display = 'block';
          step1Next.disabled = false;
        }
        
        // Restore combination selection
        if (state.selectedCombination) {
          combinationSelect.value = state.selectedCombination;
          
          // Generate score inputs and restore scores
          setTimeout(() => {
            generateScoreInputs(true); // pass true to indicate restoring
            updateTotalScore();
            step2Next.disabled = false;
          }, 100);
        }
        
        // Restore interests
        state.interests.forEach(interest => {
          const input = document.querySelector(`input[name="interests"][value="${interest}"]`);
          if (input) {
            input.checked = true;
            input.closest('.interest-card').classList.add('selected');
          }
        });
        
        // Go to the saved step
        if (state.currentStep > 1) {
          updateStepIndicator(state.currentStep);
          steps.forEach(s => {
            const stepNum = parseInt(s.dataset.step);
            if (stepNum === state.currentStep) {
              s.classList.add('active');
              s.style.display = 'block';
            } else {
              s.classList.remove('active');
              s.style.display = 'none';
            }
          });
        }
      } catch (e) {
        console.error('Error restoring form state:', e);
      }
    }
  }

  // Update step indicator
  function updateStepIndicator(step) {
    const stepItems = stepIndicator.querySelectorAll('.step-item');
    stepItems.forEach((item, index) => {
      if (index + 1 <= step) {
        item.classList.add('active');
        if (index + 1 < step) item.classList.add('completed');
      } else {
        item.classList.remove('active', 'completed');
      }
    });

    const stepLines = stepIndicator.querySelectorAll('.step-line');
    stepLines.forEach((line, index) => {
      if (index + 1 < step) {
        line.classList.add('completed');
      } else {
        line.classList.remove('completed');
      }
    });
  }

  // Display saved results from consultation data
  function displaySavedResults(consultationData) {
    resultsList.innerHTML = '';
    
    // Get the matched universities based on saved data
    const totalScore = consultationData.totalScore || 0;
    const matchedUniversities = matchUniversities(totalScore, consultationData.combination, consultationData.interests);
    
    matchedUniversities.forEach((uni, index) => {
      const isPublic = universitiesData.public.some(u => u.shortName === uni.shortName);
      const typeClass = isPublic ? 'type-public' : 'type-private';
      
      const resultCard = document.createElement('div');
      resultCard.className = 'result-card';
      resultCard.style.animationDelay = `${index * 100}ms`;
      
      resultCard.innerHTML = `
        <div class="result-rank">#${index + 1}</div>
        <div class="result-logo ${typeClass}">
          <span>${uni.shortName}</span>
        </div>
        <div class="result-info">
          <h4>${uni.name}</h4>
          <p class="result-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            ${uni.location}
          </p>
          <div class="result-meta">
            <span>${uni.majors} ngành</span>
            <span>${uni.students} SV</span>
          </div>
        </div>
        <div class="result-match">
          <div class="match-percentage">${uni.matchScore}%</div>
          <div class="match-label">Phù hợp</div>
          <div class="match-chance ${uni.chance === 'Rất cao' ? 'high' : uni.chance === 'Cao' ? 'good' : uni.chance === 'Trung bình' ? 'medium' : 'low'}">
            Cơ hội: ${uni.chance}
          </div>
        </div>
        <a href="${uni.website}" target="_blank" rel="noopener noreferrer" class="result-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      `;
      
      resultsList.appendChild(resultCard);
      
      setTimeout(() => {
        resultCard.classList.add('visible');
      }, index * 100);
    });
  }

  // Subject Group Selection
  function setupSubjectGroupSelection() {
    subjectGroupBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove selection from all
        subjectGroupBtns.forEach(b => b.classList.remove('selected'));
        // Add selection to clicked
        btn.classList.add('selected');
        
        // Get selected group
        state.selectedGroup = btn.dataset.group;
        const groupCombinations = getCombinationsForGroup(state.selectedGroup);
        
        // Populate combination dropdown
        populateCombinationDropdown(groupCombinations);
        combinationSelectWrapper.style.display = 'block';
        
        // Enable next button
        step1Next.disabled = false;
        
        // Animate
        animateSelection(btn);
        
        // Save state
        saveFormState();
      });
    });

    // Combination select change
    combinationSelect.addEventListener('change', () => {
      state.selectedCombination = combinationSelect.value;
      if (state.selectedCombination) {
        generateScoreInputs();
        step2Next.disabled = false;
      }
      // Save state
      saveFormState();
    });
  }

  // Populate combination dropdown
  function populateCombinationDropdown(combinations) {
    combinationSelect.innerHTML = '<option value="">-- Chọn tổ hợp môn --</option>';
    
    for (const [code, data] of Object.entries(combinations)) {
      const option = document.createElement('option');
      option.value = code;
      option.textContent = `${code} (${data.subjects.join(', ')})`;
      combinationSelect.appendChild(option);
    }
  }

  // Generate score inputs based on selected combination
  function generateScoreInputs(restoreMode = false) {
    const subjects = getSubjectsForCombination(state.selectedCombination);
    const selectedCombinationEl = document.getElementById('selectedCombination');
    
    selectedCombinationEl.textContent = state.selectedCombination;
    scoreInputsGrid.innerHTML = '';

    subjects.forEach((subject, index) => {
      const inputWrapper = document.createElement('div');
      inputWrapper.className = 'score-input-wrapper';
      
      // Get saved score if available
      const savedScore = restoreMode && state.scores[subject] ? state.scores[subject] : '';
      
      inputWrapper.innerHTML = `
        <label for="score_${index}">
          <span class="subject-label">${subject}</span>
          <span class="score-hint">0 - 10 điểm</span>
        </label>
        <input 
          type="number" 
          id="score_${index}" 
          class="score-input"
          min="0" 
          max="10" 
          step="0.01"
          placeholder="0.00"
          value="${savedScore}"
          data-subject="${subject}"
        >
        <div class="score-slider">
          <input 
            type="range" 
            min="0" 
            max="10" 
            step="0.25" 
            value="${savedScore || 5}"
            class="slider"
            data-target="score_${index}"
          >
        </div>
      `;
      scoreInputsGrid.appendChild(inputWrapper);

      // Input events
      const input = inputWrapper.querySelector('.score-input');
      const slider = inputWrapper.querySelector('.slider');

      input.addEventListener('input', (e) => {
        validateScore(e.target);
        slider.value = e.target.value;
        updateTotalScore();
        saveFormState();
      });

      slider.addEventListener('input', (e) => {
        input.value = e.target.value;
        validateScore(input);
        updateTotalScore();
        saveFormState();
      });

      // Animate input appearance
      inputWrapper.style.opacity = '0';
      inputWrapper.style.transform = 'translateY(20px)';
      setTimeout(() => {
        inputWrapper.style.transition = 'all 0.3s ease';
        inputWrapper.style.opacity = '1';
        inputWrapper.style.transform = 'translateY(0)';
      }, index * 100);
    });

    // Initial validation
    setTimeout(updateTotalScore, 300);
  }

  // Validate score input
  function validateScore(input) {
    const value = parseFloat(input.value);
    const wrapper = input.closest('.score-input-wrapper');
    
    if (isNaN(value) || value < 0 || value > 10) {
      wrapper.classList.add('error');
      wrapper.classList.remove('valid');
    } else {
      wrapper.classList.remove('error');
      wrapper.classList.add('valid');
    }
  }

  // Update total score display
  function updateTotalScore() {
    const inputs = scoreInputsGrid.querySelectorAll('.score-input');
    let total = 0;
    let validCount = 0;

    inputs.forEach(input => {
      const value = parseFloat(input.value);
      if (!isNaN(value) && value >= 0 && value <= 10) {
        total += value;
        validCount++;
      }
    });

    state.scores = {};
    inputs.forEach(input => {
      state.scores[input.dataset.subject] = parseFloat(input.value) || 0;
    });

    // Enable/disable next button based on all fields filled
    const allFilled = inputs.length > 0 && Array.from(inputs).every(input => {
      const value = parseFloat(input.value);
      return !isNaN(value) && value >= 0 && value <= 10;
    });
    
    step2Next.disabled = !allFilled;
  }

  // Animate selection
  function animateSelection(element) {
    element.style.transform = 'scale(1.05)';
    setTimeout(() => {
      element.style.transform = '';
    }, 200);
  }

  // Navigation setup
  function setupNavigation() {
    step1Next.addEventListener('click', () => {
      if (validateStep1()) {
        state.currentStep = 2;
        goToStep(2);
        saveFormState();
      }
    });

    step2Prev.addEventListener('click', () => {
      state.currentStep = 1;
      goToStep(1);
      saveFormState();
    });
    step2Next.addEventListener('click', () => {
      state.currentStep = 3;
      goToStep(3);
      saveFormState();
    });

    step3Prev.addEventListener('click', () => {
      state.currentStep = 2;
      goToStep(2);
      saveFormState();
    });

    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (validateStep3()) {
        performMatching();
        state.currentStep = 4;
        goToStep(4);
        saveFormState();
      }
    });
  }

  // Validate Step 1
  function validateStep1() {
    return state.selectedCombination !== null && state.selectedCombination !== '';
  }

  // Validate Step 3
  function validateStep3() {
    const checkedInterests = document.querySelectorAll('input[name="interests"]:checked');
    return checkedInterests.length > 0;
  }

  // Go to step
  function goToStep(step) {
    state.currentStep = step;

    // Update step indicator
    updateStepIndicator(step);

    // Show/hide steps
    steps.forEach(s => {
      const stepNum = parseInt(s.dataset.step);
      if (stepNum === step) {
        s.classList.add('active');
        s.style.display = 'block';
        s.style.animation = 'fadeIn 0.4s ease';
      } else {
        s.classList.remove('active');
        s.style.display = 'none';
      }
    });

    // Scroll to form
    document.querySelector('.match-form-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Interest selection setup
  function setupInterestSelection() {
    const interestCards = document.querySelectorAll('.interest-card input');
    
    interestCards.forEach(input => {
      input.addEventListener('change', () => {
        const card = input.closest('.interest-card');
        
        if (input.checked) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
        
        // Update state and save
        state.interests = Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(i => i.value);
        saveFormState();
      });
    });
  }

  // Perform matching algorithm
  function performMatching() {
    // Collect interests
    const checkedInterests = document.querySelectorAll('input[name="interests"]:checked');
    state.interests = Array.from(checkedInterests).map(i => i.value);

    // Calculate total score
    const totalScore = Object.values(state.scores).reduce((sum, score) => sum + (score || 0), 0);

    // Update summary
    document.getElementById('summaryCombination').textContent = state.selectedCombination;
    document.getElementById('summaryScore').textContent = totalScore.toFixed(2);
    document.getElementById('summaryInterests').textContent = state.interests.length + ' lĩnh vực';

    // Match universities
    const matchedUniversities = matchUniversities(totalScore, state.selectedCombination, state.interests);

    // Display results
    displayResults(matchedUniversities);
  }

  // University matching algorithm
  function matchUniversities(totalScore, combination, interests) {
    const allUniversities = [...universitiesData.public, ...universitiesData.private];
    
    // Score cutoffs by combination type
    const cutoffs = {
      // Khối A, B, V, K - STEM focused
      A: { high: 27, medium: 24, low: 21 },
      B: { high: 27, medium: 24, low: 21 },
      V: { high: 27, medium: 24, low: 21 },
      K: { high: 27, medium: 24, low: 21 },
      // Khối C - Social sciences
      C: { high: 25, medium: 22, low: 19 },
      // Khối D - Languages
      D: { high: 26, medium: 23, low: 20 },
      // Khối T - IT
      T: { high: 27, medium: 24, low: 21 },
      // Khối M, N, H, S - Arts/Sports
      M: { high: 24, medium: 21, low: 18 },
      N: { high: 24, medium: 21, low: 18 },
      H: { high: 24, medium: 21, low: 18 },
      S: { high: 24, medium: 21, low: 18 },
      // Khối R - Media
      R: { high: 25, medium: 22, low: 19 }
    };

    // Interest to category mapping
    const interestCategories = {
      cntt: ['cntt', 'kysu', 'toan'],
      kinhte: ['kinhte', 'tai_chinh', 'kinh_te'],
      yte: ['yte', 'duoc', 'y_te'],
      kysu: ['kysu', 'xay_dung', 'co_khi'],
      marketing: ['marketing', 'truyen_thong', 'bao_chi'],
      luat: ['luat', 'phap_ly', 'hanh_chinh'],
      sudp: ['sudp', 'giao_duc', 'su_pham'],
      nn: ['nn', 'du_lich', 'khach_san'],
      nnl: ['nnl', 'an_ninh', 'quan_su'],
      nangsong: ['nangsong', 'my_thuat', 'am_nhac']
    };

    // Get group letter from combination code
    const groupLetter = combination.charAt(0);
    const groupCutoffs = cutoffs[groupLetter] || cutoffs.A;

    // Score universities
    const scoredUniversities = allUniversities.map(uni => {
      let score = 0;
      
      // Calculate match score based on user's total score vs typical cutoffs
      if (totalScore >= groupCutoffs.high) {
        score = 100; // Perfect match for top schools
      } else if (totalScore >= groupCutoffs.medium) {
        score = 75; // Good match for medium schools
      } else if (totalScore >= groupCutoffs.low) {
        score = 50; // Possible match
      } else {
        score = 25; // Reach schools
      }

      // Add variety based on interests (bonus points)
      if (interests.length > 0) {
        const uniCategories = uni.categories || [];
        interests.forEach(interest => {
          const relatedCategories = interestCategories[interest] || [];
          if (uniCategories.some(cat => relatedCategories.includes(cat))) {
            score += 10;
          }
        });
      }

      // Cap at 100
      score = Math.min(score, 100);

      // Calculate chance based on score difference from typical cutoff
      let chance = 'Cao';
      if (totalScore >= groupCutoffs.high) {
        chance = 'Rất cao';
      } else if (totalScore >= groupCutoffs.medium) {
        chance = 'Cao';
      } else if (totalScore >= groupCutoffs.low) {
        chance = 'Trung bình';
      } else {
        chance = 'Khó';
      }

      return {
        ...uni,
        matchScore: score,
        chance: chance,
        // Generate estimated cutoff based on score
        estimatedCutoff: Math.max(15, Math.round(totalScore - Math.random() * 5))
      };
    });

    // Sort by match score and take top 10
    return scoredUniversities
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10);
  }

  // Display results
  function displayResults(universities) {
    resultsList.innerHTML = '';

    universities.forEach((uni, index) => {
      const isPublic = universitiesData.public.some(u => u.shortName === uni.shortName);
      const typeClass = isPublic ? 'type-public' : 'type-private';
      
      const resultCard = document.createElement('div');
      resultCard.className = 'result-card';
      resultCard.style.animationDelay = `${index * 100}ms`;
      
      resultCard.innerHTML = `
        <div class="result-rank">#${index + 1}</div>
        <div class="result-logo ${typeClass}">
          <span>${uni.shortName}</span>
        </div>
        <div class="result-info">
          <h4>${uni.name}</h4>
          <p class="result-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            ${uni.location}
          </p>
          <div class="result-meta">
            <span>${uni.majors} ngành</span>
            <span>${uni.students} SV</span>
          </div>
        </div>
        <div class="result-match">
          <div class="match-percentage">${uni.matchScore}%</div>
          <div class="match-label">Phù hợp</div>
          <div class="match-chance ${uni.chance === 'Rất cao' ? 'high' : uni.chance === 'Cao' ? 'good' : uni.chance === 'Trung bình' ? 'medium' : 'low'}">
            Cơ hội: ${uni.chance}
          </div>
        </div>
        <a href="${uni.website}" target="_blank" rel="noopener noreferrer" class="result-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      `;
      
      resultsList.appendChild(resultCard);

      // Animate card appearance
      setTimeout(() => {
        resultCard.classList.add('visible');
      }, index * 100);
    });

    // Save consultation results to localStorage for use in map page
    saveConsultationResults(universities);
  }

  // Save consultation results to localStorage
  function saveConsultationResults(universities) {
    // Save full university data with order preserved
    const fullUniversityData = universities.map(uni => ({
      shortName: uni.shortName,
      name: uni.name,
      type: universitiesData.public.some(u => u.shortName === uni.shortName) ? 'public' : 'private',
      matchScore: uni.matchScore,
      chance: uni.chance
    }));
    
    const consultationData = {
      timestamp: new Date().toISOString(),
      combination: state.selectedCombination,
      totalScore: Object.values(state.scores).reduce((sum, score) => sum + (score || 0), 0),
      interests: state.interests,
      scores: state.scores,
      // Save full ordered list of recommended universities
      recommendedUniversities: fullUniversityData
    };
    
    localStorage.setItem(STORAGE_KEY_CONSULTATION, JSON.stringify(consultationData));
  }

  // Setup restart
  function setupRestart() {
    restartBtn.addEventListener('click', () => {
      // Clear localStorage
      localStorage.removeItem(STORAGE_KEY_FORM);
      localStorage.removeItem(STORAGE_KEY_CONSULTATION);
      
      // Also clear map recommendations by dispatching event
      window.dispatchEvent(new CustomEvent('unimatch_restart_consultation'));

      // Reset state
      state.currentStep = 1;
      state.selectedGroup = null;
      state.selectedCombination = null;
      state.scores = {};
      state.interests = [];

      // Reset form
      subjectGroupBtns.forEach(b => b.classList.remove('selected'));
      combinationSelectWrapper.style.display = 'none';
      combinationSelect.innerHTML = '<option value="">-- Chọn tổ hợp môn --</option>';
      step1Next.disabled = true;
      step2Next.disabled = true;

      // Reset interests
      document.querySelectorAll('input[name="interests"]').forEach(input => {
        input.checked = false;
        input.closest('.interest-card').classList.remove('selected');
      });

      // Go to step 1
      goToStep(1);
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

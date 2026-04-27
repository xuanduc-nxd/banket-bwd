// Subject Groups Accordion
function initSubjectGroups() {
  const groupItems = document.querySelectorAll('.subject-group-item');
  
  groupItems.forEach(item => {
    const header = item.querySelector('.group-header');
    const details = item.querySelector('.group-details');
    const arrow = item.querySelector('.group-arrow');
    
    if (!header || !details) return;
    
    header.addEventListener('click', () => {
      // Close other open items
      groupItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherDetails = otherItem.querySelector('.group-details');
          const otherArrow = otherItem.querySelector('.group-arrow');
          if (otherDetails) {
            otherDetails.style.maxHeight = '0';
          }
          if (otherArrow) {
            otherArrow.classList.remove('rotated');
          }
        }
      });
      
      // Toggle current item
      const isOpen = item.classList.contains('active');
      
      if (isOpen) {
        item.classList.remove('active');
        details.style.maxHeight = '0';
        arrow.classList.remove('rotated');
      } else {
        item.classList.add('active');
        details.style.maxHeight = details.scrollHeight + 'px';
        arrow.classList.add('rotated');
      }
    });
    
    // Add hover effect to subject items
    const subjectItems = item.querySelectorAll('.subject-item');
    subjectItems.forEach(subject => {
      subject.addEventListener('click', () => {
        // Remove selected from all
        subjectItems.forEach(s => s.classList.remove('selected'));
        // Add selected to clicked
        subject.classList.add('selected');
        
        // Get subject code
        const code = subject.dataset.code;
        const subjects = subject.querySelector('.subject-subjects').textContent;
        
        console.log('Selected:', code, '-', subjects);
      });
    });
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initSubjectGroups);

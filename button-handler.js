document.addEventListener("DOMContentLoaded", function () {
  // --- Expand/Collapse Functionality ---
  const expandButtons = document.querySelectorAll('.expand-btn');
  
  expandButtons.forEach(button => {
    const content = button.nextElementSibling;
    
    // Hide content initially
    content.style.display = 'none';

    // Style the button
    button.style.cursor = 'pointer';
    button.style.border = 'none';
    button.style.background = 'transparent';
    button.style.color = '#aaa';
    button.style.fontWeight = '600';
    button.style.marginBottom = '5px';

    // Toggle functionality
    button.addEventListener('click', () => {
      const isVisible = content.style.display === 'block';
      content.style.display = isVisible ? 'none' : 'block';
      button.textContent = isVisible ? '▶ Show Details' : '▼ Hide Details';
    });
  });

  // --- Smooth Scroll for Anchor Links ---
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // --- Expand/Collapse Functionality with Accessibility ---
  const expandButtons = document.querySelectorAll('.expand-btn');

  expandButtons.forEach(button => {
    const content = button.nextElementSibling;

    // Initial Setup
    content.style.overflow = 'hidden';
    content.style.maxHeight = '0';
    content.style.transition = 'max-height 0.4s ease';
    content.setAttribute('aria-hidden', 'true');

    button.setAttribute('aria-expanded', 'false');
    button.style.cursor = 'pointer';
    button.style.border = 'none';
    button.style.background = 'transparent';
    button.style.color = '#aaa';
    button.style.fontWeight = '600';
    button.style.marginBottom = '5px';
    button.textContent = '▶ Show Details';

    // Toggle Logic
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        content.style.maxHeight = '0';
        content.setAttribute('aria-hidden', 'true');
        button.setAttribute('aria-expanded', 'false');
        button.textContent = '▶ Show Details';
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.setAttribute('aria-hidden', 'false');
        button.setAttribute('aria-expanded', 'true');
        button.textContent = '▼ Hide Details';
      }
    });
  });

  // --- Smooth Scroll for Anchor Links ---
  const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');

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

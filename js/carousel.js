document.addEventListener('DOMContentLoaded', () => {
  const carouselContainer = document.querySelector('.carousel-container');
  const carouselItems = document.querySelectorAll('.carousel-item');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  const dotsContainer = document.querySelector('.carousel-dots');

  let currentIndex = 0;
  let autoScrollInterval = null;
  let dots = [];

  // === Create navigation dots ===
  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';

    carouselItems.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.dataset.index = index;
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`); // Accessibility
      dotsContainer.appendChild(dot);
    });

    dots = dotsContainer.querySelectorAll('.dot');
    highlightDot(currentIndex);
  }

  // === Highlight active dot ===
  function highlightDot(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
  }

  // === Move to a specific slide ===
  function goToSlide(index) {
    currentIndex = (index + carouselItems.length) % carouselItems.length;
    const offset = -currentIndex * 100;
    carouselContainer.style.transform = `translateX(${offset}%)`;
    highlightDot(currentIndex);
  }

  // === Navigation functions ===
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // === Auto-scroll logic ===
  function startAutoScroll() {
    stopAutoScroll(); // Prevent multiple intervals
    autoScrollInterval = setInterval(nextSlide, 6000);
  }

  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }
  }

  function resetAutoScroll() {
    stopAutoScroll();
    startAutoScroll();
  }

  // === Event Listeners ===
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      resetAutoScroll();
      nextSlide();
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      resetAutoScroll();
      prevSlide();
    });
  }

  if (dotsContainer) {
    dotsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('dot')) {
        const index = parseInt(e.target.dataset.index, 10);
        resetAutoScroll();
        goToSlide(index);
      }
    });
  }

  // === Initialize carousel ===
  createDots();
  goToSlide(0);
  startAutoScroll();

  // === Resize recalibration ===
  let resizeTimeout;
  window.addEventListener('resize', () => {
    carouselContainer.style.transition = 'none';
    goToSlide(currentIndex);
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      carouselContainer.style.transition = 'transform 0.5s ease';
    }, 100);
  });

  // === Optional: Swipe support for mobile (commented for now) ===
  /*
  let startX = 0;
  carouselContainer.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  carouselContainer.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
    resetAutoScroll();
  });
  */
});

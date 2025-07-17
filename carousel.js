document.addEventListener('DOMContentLoaded', () => {
  const carouselContainer = document.querySelector('.carousel-container');
  const carouselItems = document.querySelectorAll('.carousel-item');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  let currentIndex = 0;
  let autoScrollInterval;
  let dots = [];

  // Create dot indicators
  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';

    carouselItems.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.dataset.index = index;
      dotsContainer.appendChild(dot);
    });

    dots = dotsContainer.querySelectorAll('.dot');
    highlightDot(currentIndex);
  }

  function highlightDot(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
  }

  function goToSlide(index) {
    currentIndex = (index + carouselItems.length) % carouselItems.length;
    const offset = -currentIndex * 100;
    carouselContainer.style.transform = `translateX(${offset}%)`;
    highlightDot(currentIndex);
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoScroll() {
    autoScrollInterval = setInterval(nextSlide, 6000);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  function resetAutoScroll() {
    stopAutoScroll();
    startAutoScroll();
  }

  // Event listeners
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

  // Initialize carousel
  createDots();
  goToSlide(0);
  startAutoScroll();

  // Recalculate position on resize
  window.addEventListener('resize', () => {
    carouselContainer.style.transition = 'none';
    goToSlide(currentIndex);
    setTimeout(() => {
      carouselContainer.style.transition = 'transform 0.5s ease';
    }, 10);
  });
});

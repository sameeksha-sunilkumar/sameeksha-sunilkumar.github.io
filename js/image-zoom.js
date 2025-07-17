document.addEventListener('DOMContentLoaded', function() {
  // Target all images inside .image or .gallery containers
  const images = document.querySelectorAll('.image img, .gallery img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');

  // Close the lightbox
  const closeLightbox = () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = ''; // Restore scroll
    lightboxImg.src = '';
  };

  // Setup image click zoom
  images.forEach(img => {
    img.classList.add('zoomable');
    img.style.cursor = 'zoom-in';

    img.addEventListener('click', function () {
      lightboxImg.src = this.src;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Lock scroll
    });
  });

  // Click close button
  closeBtn.addEventListener('click', closeLightbox);

  // Click outside image
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // ESC to close
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      closeLightbox();
    }
  });
});

class Carousel {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    this.track = this.container.querySelector('.carousel-track');
    this.slides = Array.from(this.track.children);
    this.totalSlides = this.slides.length;
    this.currentIndex = 0;
    this.speed = options.speed || 400;

    this.prevBtn = this.container.querySelector('.btn--prev');
    this.nextBtn = this.container.querySelector('.btn--next');

    this.attachEventListeners();
    this.showSlide(this.currentIndex, false); // Initial slide without animation
  }

  attachEventListeners() {
    this.prevBtn?.addEventListener('click', () => this.scrollPrev());
    this.nextBtn?.addEventListener('click', () => this.scrollNext());
    this.addTouchSupport();
    window.addEventListener('resize', () => this.showSlide(this.currentIndex, false)); // Re-center on resize
  }

  addTouchSupport() {
    let startX = 0;
    this.container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    this.container.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (diff > 50) this.scrollNext();
      else if (diff < -50) this.scrollPrev();
    });
  }

  scrollNext() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.showSlide(this.currentIndex);
  }

  scrollPrev() {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.showSlide(this.currentIndex);
  }

  showSlide(index, smooth = true) {
    const slide = this.slides[index];
    const trackRect = this.track.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();

    const scrollOffset = slide.offsetLeft - (trackRect.width / 2) + (slideRect.width / 2);

    this.track.scrollTo({
      left: scrollOffset,
      behavior: smooth ? 'smooth' : 'auto',
    });

    // Update selected class
    this.slides.forEach((slideEl, i) => {
      slideEl.classList.toggle('is-selected', i === index);
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Carousel('.carousel__viewport', { speed: 400 });
});

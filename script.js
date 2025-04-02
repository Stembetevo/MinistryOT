    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const totalSlides = slides.length;
    
    function updateSlider() {
      document.getElementById('sliderContainer').style.transform = `translateX(-${currentSlide * 100}%)`;
      
      // Update dots
      document.querySelectorAll('.slider-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }
    
    function slideChange(direction) {
      currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
      updateSlider();
    }
    
    function goToSlide(slideIndex) {
      currentSlide = slideIndex;
      updateSlider();
    }
    
    // Auto-slide functionality
    let slideInterval = setInterval(() => {
      slideChange(1);
    }, 5000);
    
    // Pause auto-slide when hovering over the slider
    document.querySelector('.success-slider').addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    // Resume auto-slide when mouse leaves the slider
    document.querySelector('.success-slider').addEventListener('mouseleave', () => {
      slideInterval = setInterval(() => {
        slideChange(1);
      }, 5000);
    });

    document.addEventListener('DOMContentLoaded', () => {
      const slider = document.querySelector('.slider');
      const slides = document.querySelectorAll('.slide');
      const dots = document.querySelectorAll('.slider-dot');
      const slideWidth = slides[0].clientWidth;
      let currentIndex = 0;
      let autoSlideInterval;
      
      // Initialize the automatic sliding
      startAutoSlide();
      
      // Set up the dot navigation
      dots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
              currentIndex = index;
              updateSlider();
              resetAutoSlideInterval();
          });
      });
      
      function updateSlider() {
          slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
          
          // Update active dot
          dots.forEach((dot, index) => {
              if (index === currentIndex) {
                  dot.classList.add('active');
              } else {
                  dot.classList.remove('active');
              }
          });
      }
      
      function nextSlide() {
          currentIndex = (currentIndex + 1) % slides.length;
          updateSlider();
      }
      
      function startAutoSlide() {
          autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
      }
      
      function resetAutoSlideInterval() {
          clearInterval(autoSlideInterval);
          startAutoSlide();
      }
      
      // Handle window resize
      window.addEventListener('resize', () => {
          // Recalculate slide width after resize
          const newSlideWidth = slides[0].clientWidth;
          
          // Update slider position
          slider.style.transform = `translateX(-${currentIndex * newSlideWidth}px)`;
      });
  });
// Interior Cabin Cleaning Page Specific JavaScript
document.addEventListener("DOMContentLoaded", () => {
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll(
      ".process-item, .specialized-area, .choose-cabin-item, .related-item",
    )
  
    function checkIfInView() {
      animateElements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
        const elementVisible = 150
  
        if (elementPosition < windowHeight - elementVisible) {
          element.classList.add("animate-in")
        }
      })
    }
  
    // Add animation class
    const style = document.createElement("style")
    style.textContent = `
      .process-item, .specialized-area, .choose-cabin-item, .related-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .animate-in {
        opacity: 1;
        transform: translateY(0);
      }
      
      .process-item:nth-child(2), .choose-cabin-item:nth-child(2), .related-item:nth-child(2) {
        transition-delay: 0.2s;
      }
      
      .process-item:nth-child(3), .choose-cabin-item:nth-child(3), .related-item:nth-child(3) {
        transition-delay: 0.4s;
      }
      
      .process-item:nth-child(4), .choose-cabin-item:nth-child(4) {
        transition-delay: 0.6s;
      }
      
      .process-item:nth-child(5), .choose-cabin-item:nth-child(5) {
        transition-delay: 0.8s;
      }
      
      .process-item:nth-child(6) {
        transition-delay: 1s;
      }
      
      .process-item:nth-child(7) {
        transition-delay: 1.2s;
      }
      
      .specialized-area:nth-child(2) {
        transition-delay: 0.3s;
      }
      
      .specialized-area:nth-child(3) {
        transition-delay: 0.6s;
      }
      
      .specialized-area:nth-child(4) {
        transition-delay: 0.9s;
      }
    `
    document.head.appendChild(style)
  
    // Check elements on load and scroll
    window.addEventListener("scroll", checkIfInView)
    window.addEventListener("load", checkIfInView)
    checkIfInView()
  
    // Before & After Gallery
    const beforeAfterToggle = document.getElementById("before-after-toggle")
    const toggleSwitch = beforeAfterToggle.querySelector(".toggle-switch")
    const toggleTexts = beforeAfterToggle.querySelectorAll(".toggle-text")
    const beforeImages = document.querySelectorAll(".image-container.before")
    const afterImages = document.querySelectorAll(".image-container.after")
  
    beforeAfterToggle.addEventListener("click", () => {
      toggleSwitch.classList.toggle("active")
      toggleTexts.forEach((text) => text.classList.toggle("active"))
  
      beforeImages.forEach((img) => img.classList.toggle("active"))
      afterImages.forEach((img) => img.classList.toggle("active"))
    })
  
    // Gallery Slider
    const gallerySlides = document.querySelectorAll(".gallery-slide")
    const galleryDots = document.querySelectorAll(".gallery-dot")
    const galleryPrev = document.querySelector(".gallery-prev")
    const galleryNext = document.querySelector(".gallery-next")
    let currentGallerySlide = 0
  
    function showGallerySlide(index) {
      gallerySlides.forEach((slide) => slide.classList.remove("active"))
      galleryDots.forEach((dot) => dot.classList.remove("active"))
  
      gallerySlides[index].classList.add("active")
      galleryDots[index].classList.add("active")
      currentGallerySlide = index
    }
  
    galleryDots.forEach((dot, index) => {
      dot.addEventListener("click", () => showGallerySlide(index))
    })
  
    galleryPrev.addEventListener("click", () => {
      const newIndex = (currentGallerySlide - 1 + gallerySlides.length) % gallerySlides.length
      showGallerySlide(newIndex)
    })
  
    galleryNext.addEventListener("click", () => {
      const newIndex = (currentGallerySlide + 1) % gallerySlides.length
      showGallerySlide(newIndex)
    })
  
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (!targetElement) return
  
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
  
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      })
    })
  
    // Book now button functionality
    const bookButtons = document.querySelectorAll(".btn-primary")
    bookButtons.forEach((button) => {
      if (button.textContent.includes("Book")) {
        button.addEventListener("click", () => {
          window.location.href = "bookings.html"
        })
      }
    })
  })
  
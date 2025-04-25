// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  const preloader = document.querySelector(".preloader")
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hidden")
    }, 500)
  })

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")

  menuToggle.addEventListener("click", function () {
    this.classList.toggle("active")
    mobileMenu.classList.toggle("active")
    document.body.classList.toggle("no-scroll")
  })

  // Close mobile menu when clicking on a link
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active")
      mobileMenu.classList.remove("active")
      document.body.classList.remove("no-scroll")
    })
  })

  // Sticky Header
  const header = document.querySelector(".header")
  const headerHeight = header.offsetHeight

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (!targetElement) return

      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    })
  })

  // Active Navigation Link on Scroll
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  function highlightNavLink() {
    const scrollPosition = window.scrollY + headerHeight + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", highlightNavLink)

  // Services Tabs
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabPanels = document.querySelectorAll(".tab-panel")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabId = this.dataset.tab

      // Remove active class from all buttons and panels
      tabBtns.forEach((btn) => btn.classList.remove("active"))
      tabPanels.forEach((panel) => panel.classList.remove("active"))

      // Add active class to clicked button and corresponding panel
      this.classList.add("active")
      document.getElementById(tabId).classList.add("active")
    })
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

  // Before/After Toggle
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

  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const testimonialDots = document.querySelectorAll(".testimonial-dot")
  const testimonialPrev = document.querySelector(".testimonial-prev")
  const testimonialNext = document.querySelector(".testimonial-next")
  let currentTestimonialSlide = 0

  function showTestimonialSlide(index) {
    testimonialSlides.forEach((slide) => slide.classList.remove("active"))
    testimonialDots.forEach((dot) => dot.classList.remove("active"))

    testimonialSlides[index].classList.add("active")
    testimonialDots[index].classList.add("active")
    currentTestimonialSlide = index
  }

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", () => showTestimonialSlide(index))
  })

  testimonialPrev.addEventListener("click", () => {
    const newIndex = (currentTestimonialSlide - 1 + testimonialSlides.length) % testimonialSlides.length
    showTestimonialSlide(newIndex)
  })

  testimonialNext.addEventListener("click", () => {
    const newIndex = (currentTestimonialSlide + 1) % testimonialSlides.length
    showTestimonialSlide(newIndex)
  })

  // Auto-rotate testimonials
  setInterval(() => {
    const newIndex = (currentTestimonialSlide + 1) % testimonialSlides.length
    showTestimonialSlide(newIndex)
  }, 5000)

  // Stats Counter Animation
  const statNumbers = document.querySelectorAll(".stat-number")
  let statsAnimated = false

  function animateStats() {
    if (statsAnimated) return

    const statsSection = document.querySelector(".stats")
    const statsSectionTop = statsSection.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (statsSectionTop < windowHeight * 0.75) {
      statsAnimated = true

      statNumbers.forEach((stat) => {
        const targetValue = Number.parseInt(stat.dataset.count)
        let currentValue = 0
        const duration = 2000 // 2 seconds
        const increment = targetValue / (duration / 16) // 60fps

        const counter = setInterval(() => {
          currentValue += increment

          if (currentValue >= targetValue) {
            stat.textContent = targetValue
            clearInterval(counter)
          } else {
            stat.textContent = Math.floor(currentValue)
          }
        }, 16)
      })
    }
  }

  window.addEventListener("scroll", animateStats)

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm")

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const formValues = Object.fromEntries(formData.entries())

    // Simulate form submission (replace with actual form submission)
    const submitButton = this.querySelector('button[type="submit"]')
    const originalButtonText = submitButton.textContent

    submitButton.textContent = "Sending..."
    submitButton.disabled = true

    setTimeout(() => {
      // Create success message
      const successMessage = document.createElement("div")
      successMessage.className = "form-success"
      successMessage.innerHTML = `
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3>Message Sent Successfully!</h3>
        <p>Thank you for contacting JESSIE AIRCRAFT SERVICES. We'll get back to you shortly.</p>
      `

      // Replace form with success message
      contactForm.innerHTML = ""
      contactForm.appendChild(successMessage)

      // Style success message
      const styles = document.createElement("style")
      styles.textContent = `
        .form-success {
          text-align: center;
          padding: 2rem;
        }
        .success-icon {
          font-size: 3rem;
          color: var(--primary);
          margin-bottom: 1rem;
        }
        .form-success h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
      `
      document.head.appendChild(styles)

      // Log form data to console (for demo purposes)
      console.log("Form submitted:", formValues)
    }, 1500)
  })

  // Back to Top Button
  const backToTopButton = document.getElementById("backToTop")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTopButton.classList.add("active")
    } else {
      backToTopButton.classList.remove("active")
    }
  })

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // AOS (Animate on Scroll) Implementation
  const aosElements = document.querySelectorAll("[data-aos]")

  function checkAOS() {
    aosElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight
      const elementVisible = 150

      if (elementPosition < windowHeight - elementVisible) {
        element.classList.add("aos-animate")
      }
    })
  }

  window.addEventListener("scroll", checkAOS)
  checkAOS() // Check on page load

  // Update current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear()
})

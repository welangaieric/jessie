document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const navList = document.querySelector(".nav-list")
  
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", function () {
        this.classList.toggle("active")
        navList.classList.toggle("active")
      })
    }
  
    // Scroll animations
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(
        ".service-overview, .contamination-section, .why-clean-section, .process-section, .equipment-care-section, .faq-section",
      )
  
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const screenPosition = window.innerHeight / 1.2
  
        if (elementPosition < screenPosition) {
          element.classList.add("animate")
        }
      })
    }
  
    // Run on scroll
    window.addEventListener("scroll", animateOnScroll)
  
    // Run once on page load
    animateOnScroll()
  
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll(".faq-item")
  
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
  
      question.addEventListener("click", () => {
        // Close all other items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            otherItem.classList.remove("active")
          }
        })
  
        // Toggle current item
        item.classList.toggle("active")
      })
    })
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Image hover effects
    const serviceImages = document.querySelectorAll(".service-image img, .contamination-image img, .why-clean-image img")
  
    serviceImages.forEach((image) => {
      image.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.03)"
      })
  
      image.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)"
      })
    })
  })
  
  document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
    const navList = document.querySelector(".nav-list")
  
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener("click", () => {
        navList.classList.toggle("active")
        mobileMenuToggle.classList.toggle("active")
      })
    }
  
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll(".cockpit-faq-item")
  
    faqItems.forEach((item) => {
      const question = item.querySelector(".cockpit-faq-question")
  
      question.addEventListener("click", () => {
        // Close all other items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            otherItem.classList.remove("active")
          }
        })
  
        // Toggle current item
        item.classList.toggle("active")
      })
    })
  
    // Scroll animations
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(
        ".cockpit-service-overview, .cockpit-contamination-section, .cockpit-why-clean-section, .cockpit-process-section, .cockpit-equipment-section, .cockpit-faq-section",
      )
  
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const screenPosition = window.innerHeight / 1.2
  
        if (elementPosition < screenPosition) {
          element.classList.add("fade-in")
        }
      })
    }
  
    // Add fade-in class for CSS animation
    const style = document.createElement("style")
    style.innerHTML = `
          .fade-in {
              animation: fadeIn 1s ease-in-out forwards;
          }
          
          @keyframes fadeIn {
              from {
                  opacity: 0;
                  transform: translateY(20px);
              }
              to {
                  opacity: 1;
                  transform: translateY(0);
              }
          }
          
          .cockpit-service-overview, .cockpit-contamination-section, .cockpit-why-clean-section, .cockpit-process-section, .cockpit-equipment-section, .cockpit-faq-section {
              opacity: 0;
          }
      `
    document.head.appendChild(style)
  
    // Run animation on scroll
    window.addEventListener("scroll", animateOnScroll)
  
    // Run once on page load
    animateOnScroll()
  
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          })
        }
      })
    })
  })
  
// Aircraft Cleaning Page Specific JavaScript
document.addEventListener("DOMContentLoaded", () => {
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll(".matters-item, .benefit-item, .choose-item, .related-item")
  
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
      .matters-item, .benefit-item, .choose-item, .related-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .animate-in {
        opacity: 1;
        transform: translateY(0);
      }
      
      .matters-item:nth-child(2), .benefit-item:nth-child(2), .choose-item:nth-child(2), .related-item:nth-child(2) {
        transition-delay: 0.2s;
      }
      
      .matters-item:nth-child(3), .benefit-item:nth-child(3), .choose-item:nth-child(3), .related-item:nth-child(3) {
        transition-delay: 0.4s;
      }
      
      .matters-item:nth-child(4), .benefit-item:nth-child(4), .choose-item:nth-child(4) {
        transition-delay: 0.6s;
      }
      
      .matters-item:nth-child(5), .benefit-item:nth-child(5), .choose-item:nth-child(5) {
        transition-delay: 0.8s;
      }
    `
    document.head.appendChild(style)
  
    // Check elements on load and scroll
    window.addEventListener("scroll", checkIfInView)
    window.addEventListener("load", checkIfInView)
    checkIfInView()
  
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
  
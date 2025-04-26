// Aircraft Disinfection Guidelines Page Specific JavaScript
document.addEventListener("DOMContentLoaded", () => {
    // Tabs Functionality
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
  
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll(".elements-list li, .seat-type, .guideline-item, .practice-item")
  
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
      .elements-list li, .seat-type, .guideline-item, .practice-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .animate-in {
        opacity: 1;
        transform: translateY(0);
      }
      
      .elements-list li:nth-child(2), .seat-type:nth-child(2), .guideline-item:nth-child(2), .practice-item:nth-child(2) {
        transition-delay: 0.2s;
      }
      
      .elements-list li:nth-child(3), .seat-type:nth-child(3), .guideline-item:nth-child(3), .practice-item:nth-child(3) {
        transition-delay: 0.4s;
      }
      
      .elements-list li:nth-child(4), .guideline-item:nth-child(4), .practice-item:nth-child(4) {
        transition-delay: 0.6s;
      }
      
      .elements-list li:nth-child(5), .practice-item:nth-child(5) {
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
  
    // PDF Download Button Functionality
    const downloadButton = document.querySelector(".download-button .btn")
    if (downloadButton) {
      downloadButton.addEventListener("click", (e) => {
        e.preventDefault()
  
        // In a real implementation, this would trigger a download
        // For now, we'll just show an alert
        alert("PDF Guidelines download will be available soon!")
  
        // Alternatively, you could redirect to a PDF file:
        // window.location.href = "downloads/aircraft-disinfection-guidelines.pdf";
      })
    }
  })
  
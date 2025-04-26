// Service Details Page Functionality
document.addEventListener("DOMContentLoaded", () => {
    // Service Tabs Navigation
    const serviceTabs = document.querySelectorAll(".service-tab")
  
    // Add click event to service tabs
    serviceTabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault()
  
        // Remove active class from all tabs
        serviceTabs.forEach((t) => t.classList.remove("active"))
  
        // Add active class to clicked tab
        tab.classList.add("active")
  
        // Scroll to the corresponding section
        const targetId = tab.getAttribute("href")
        const targetSection = document.querySelector(targetId)
  
        if (targetSection) {
          const headerHeight = document.querySelector(".header").offsetHeight
          const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20
  
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Highlight active tab on scroll
    function highlightActiveTab() {
      const sections = document.querySelectorAll(".service-detail-section")
      const headerHeight = document.querySelector(".header").offsetHeight
      const scrollPosition = window.scrollY + headerHeight + 100
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")
  
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          serviceTabs.forEach((tab) => {
            tab.classList.remove("active")
            if (tab.getAttribute("href") === `#${sectionId}`) {
              tab.classList.add("active")
            }
          })
        }
      })
    }
  
    window.addEventListener("scroll", highlightActiveTab)
  
    // Book Now Button
    const bookButtons = document.querySelectorAll(".service-cta .btn-primary")
    bookButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        // Get the service name from the section
        const serviceSection = button.closest(".service-detail-section")
        const serviceName = serviceSection.querySelector("h2").textContent
  
        // Store the selected service in localStorage to pre-select it on the booking page
        localStorage.setItem("selectedService", serviceSection.id)
      })
    })
  
    // Check if there's a hash in the URL and scroll to that section
    if (window.location.hash) {
      const targetSection = document.querySelector(window.location.hash)
      if (targetSection) {
        setTimeout(() => {
          const headerHeight = document.querySelector(".header").offsetHeight
          const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20
  
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
  
          // Highlight the corresponding tab
          serviceTabs.forEach((tab) => {
            tab.classList.remove("active")
            if (tab.getAttribute("href") === window.location.hash) {
              tab.classList.add("active")
            }
          })
        }, 500)
      }
    }
  })
  
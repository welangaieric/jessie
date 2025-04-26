// Booking Form Functionality
document.addEventListener("DOMContentLoaded", () => {
    // Form Steps Navigation
    const steps = document.querySelectorAll(".step")
    const formSteps = document.querySelectorAll(".form-step")
    const nextButtons = document.querySelectorAll(".next-step")
    const prevButtons = document.querySelectorAll(".prev-step")
  
    // Initialize the booking form
    function initBookingForm() {
      // Show the first step
      showStep(0)
  
      // Add event listeners to next buttons
      nextButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const currentStep = Number.parseInt(button.closest(".form-step").dataset.step)
          if (validateStep(currentStep)) {
            showStep(currentStep)
          }
        })
      })
  
      // Add event listeners to previous buttons
      prevButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const currentStep = Number.parseInt(button.closest(".form-step").dataset.step)
          showStep(currentStep - 2)
        })
      })
  
      // Service selection change
      const serviceOptions = document.querySelectorAll('input[name="service"]')
      serviceOptions.forEach((option) => {
        option.addEventListener("change", updateSummary)
      })
  
      // Date and time selection change
      const dateInput = document.getElementById("service-date")
      const timeSelect = document.getElementById("service-time")
      if (dateInput && timeSelect) {
        dateInput.addEventListener("change", updateSummary)
        timeSelect.addEventListener("change", updateSummary)
      }
  
      // Aircraft type change
      const aircraftTypeSelect = document.getElementById("aircraft-type")
      const aircraftModelInput = document.getElementById("aircraft-model")
      if (aircraftTypeSelect && aircraftModelInput) {
        aircraftTypeSelect.addEventListener("change", updateSummary)
        aircraftModelInput.addEventListener("input", updateSummary)
      }
  
      // Add-ons change
      const addOns = document.querySelectorAll('input[name="add-ons"]')
      addOns.forEach((addOn) => {
        addOn.addEventListener("change", updateSummary)
      })
  
      // Service location change
      const serviceLocationSelect = document.getElementById("service-location")
      const locationDetailsDiv = document.querySelector(".location-details")
      if (serviceLocationSelect && locationDetailsDiv) {
        serviceLocationSelect.addEventListener("change", () => {
          if (serviceLocationSelect.value !== "jessie-facility") {
            locationDetailsDiv.style.display = "block"
          } else {
            locationDetailsDiv.style.display = "none"
          }
          updateSummary()
        })
      }
  
      // Form submission
      const bookingForm = document.getElementById("bookingForm")
      if (bookingForm) {
        bookingForm.addEventListener("submit", handleFormSubmit)
      }
    }
  
    // Show a specific step
    function showStep(stepIndex) {
      // Hide all steps
      formSteps.forEach((step) => {
        step.classList.remove("active")
      })
  
      // Remove active class from all step indicators
      steps.forEach((step) => {
        step.classList.remove("active")
      })
  
      // Show the current step
      const currentStepIndex = stepIndex
      const nextStepIndex = currentStepIndex + 1
  
      if (formSteps[nextStepIndex]) {
        formSteps[nextStepIndex].classList.add("active")
        steps[nextStepIndex].classList.add("active")
      }
    }
  
    // Validate the current step
    function validateStep(stepIndex) {
      const currentStep = document.querySelector(`.form-step[data-step="${stepIndex}"]`)
  
      // Basic validation - check required fields
      const requiredFields = currentStep.querySelectorAll("[required]")
      let isValid = true
  
      requiredFields.forEach((field) => {
        if (!field.value) {
          isValid = false
          field.classList.add("error")
        } else {
          field.classList.remove("error")
        }
      })
  
      return isValid
    }
  
    // Update booking summary
    function updateSummary() {
      // Service
      const selectedService = document.querySelector('input[name="service"]:checked')
      const summaryService = document.getElementById("summary-service")
      if (selectedService && summaryService) {
        const serviceLabel = selectedService.nextElementSibling.querySelector("h4").textContent
        summaryService.textContent = serviceLabel
      }
  
      // Date & Time
      const dateInput = document.getElementById("service-date")
      const timeSelect = document.getElementById("service-time")
      const summaryDateTime = document.getElementById("summary-datetime")
      if (dateInput && timeSelect && summaryDateTime) {
        if (dateInput.value && timeSelect.value) {
          const date = new Date(dateInput.value)
          const formattedDate = date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
          const timeText = timeSelect.options[timeSelect.selectedIndex].text
          summaryDateTime.textContent = `${formattedDate}, ${timeText}`
        } else {
          summaryDateTime.textContent = "Not selected"
        }
      }
  
      // Aircraft
      const aircraftTypeSelect = document.getElementById("aircraft-type")
      const aircraftModelInput = document.getElementById("aircraft-model")
      const summaryAircraft = document.getElementById("summary-aircraft")
      if (aircraftTypeSelect && aircraftModelInput && summaryAircraft) {
        if (aircraftTypeSelect.value && aircraftModelInput.value) {
          const aircraftType = aircraftTypeSelect.options[aircraftTypeSelect.selectedIndex].text
          summaryAircraft.textContent = `${aircraftModelInput.value} (${aircraftType})`
        } else {
          summaryAircraft.textContent = "Not specified"
        }
      }
  
      // Add-ons
      const selectedAddOns = document.querySelectorAll('input[name="add-ons"]:checked')
      const summaryAddOns = document.getElementById("summary-addons")
      if (summaryAddOns) {
        if (selectedAddOns.length > 0) {
          const addOnLabels = Array.from(selectedAddOns).map((addOn) => {
            return addOn.nextElementSibling.querySelector("h5").textContent
          })
          summaryAddOns.textContent = addOnLabels.join(", ")
        } else {
          summaryAddOns.textContent = "None"
        }
      }
  
      // Calculate total
      calculateTotal()
    }
  
    // Calculate estimated total
    function calculateTotal() {
      let total = 0
      const summaryTotal = document.getElementById("summary-total")
  
      // Base service price
      const selectedService = document.querySelector('input[name="service"]:checked')
      if (selectedService) {
        const servicePrice = selectedService.nextElementSibling.querySelector(".price").textContent
        const basePrice = Number.parseInt(servicePrice.replace(/\D/g, ""))
        total += basePrice
      }
  
      // Add-ons
      const selectedAddOns = document.querySelectorAll('input[name="add-ons"]:checked')
      selectedAddOns.forEach((addOn) => {
        const addOnPrice = addOn.nextElementSibling.querySelector(".price").textContent
        const price = Number.parseInt(addOnPrice.replace(/\D/g, ""))
        total += price
      })
  
      // Update total in summary
      if (summaryTotal) {
        summaryTotal.textContent = `$${total.toLocaleString()}`
      }
    }
  
    // Handle form submission
    function handleFormSubmit(e) {
      e.preventDefault()
  
      // Get form data
      const formData = new FormData(e.target)
      const formValues = Object.fromEntries(formData.entries())
  
      // Simulate form submission
      const submitButton = e.target.querySelector('button[type="submit"]')
      const originalButtonText = submitButton.textContent
  
      submitButton.textContent = "Processing..."
      submitButton.disabled = true
  
      // Simulate API call
      setTimeout(() => {
        // Create success message
        const bookingForm = document.getElementById("bookingForm")
        const successMessage = document.createElement("div")
        successMessage.className = "booking-success"
        successMessage.innerHTML = `
          <div class="success-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <h3>Booking Confirmed!</h3>
          <p>Thank you for booking with JESSIE AIRCRAFT SERVICES. We've sent a confirmation email to ${formValues.email}.</p>
          <p>Our team will contact you shortly to confirm all details.</p>
          <div class="booking-reference">
            <p>Booking Reference: <strong>JAS-${Math.floor(100000 + Math.random() * 900000)}</strong></p>
          </div>
          <a href="index.html" class="btn btn-primary">Return to Home</a>
        `
  
        // Replace form with success message
        bookingForm.innerHTML = ""
        bookingForm.appendChild(successMessage)
  
        // Style success message
        const styles = document.createElement("style")
        styles.textContent = `
          .booking-success {
            text-align: center;
            padding: 2rem;
          }
          .success-icon {
            font-size: 4rem;
            color: var(--primary);
            margin-bottom: 1rem;
          }
          .booking-success h3 {
            font-size: 1.75rem;
            margin-bottom: 1rem;
          }
          .booking-reference {
            margin: 2rem 0;
            padding: 1rem;
            background-color: var(--gray-50);
            border-radius: var(--border-radius-md);
          }
        `
        document.head.appendChild(styles)
  
        // Log form data to console (for demo purposes)
        console.log("Form submitted:", formValues)
      }, 2000)
    }
  
    // FAQ Accordion
    const faqItems = document.querySelectorAll(".faq-item")
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
      question.addEventListener("click", () => {
        item.classList.toggle("active")
      })
    })
  
    // Initialize the booking form
    initBookingForm()
  })
  
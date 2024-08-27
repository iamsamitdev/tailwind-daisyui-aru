function loadHTML(url, id) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
    document.getElementById(id).innerHTML = data
  })
}

// เรียกใช้งานฟังก์ชัน loadHTML
document.addEventListener('DOMContentLoaded', function() {
  loadHTML('shared/menu.html', 'header-block')
  loadHTML('shared/footer.html', 'footer-block')
})

// ซ่อนแสดงเมนู
document.addEventListener('click', function(event) {
  const mainDetailsElements = document.querySelectorAll('.main-details')
  const subDetailsElements = document.querySelectorAll('.sub-details')

  mainDetailsElements.forEach(details => {
      if (!details.contains(event.target)) {
          details.removeAttribute('open')
      }
  })

  document.querySelectorAll('.sub-details').forEach(subDetails => {
      if (!subDetails.contains(event.target)) {
          subDetails.removeAttribute('open')
      }
  })
})

// Slide show
let currentSlide = 0
let autoSlideInterval = null

// ผูกฟังก์ชัน showSlide เข้ากับ window
window.showSlide = function(slideIndex) {
  const slides = document.querySelectorAll('.carousel-item')
  const totalSlides = slides.length
  const carouselInner = document.querySelector('.carousel-inner')
  const indicators = document.querySelectorAll('.indicator')
  
  if (slideIndex >= totalSlides) {
      slideIndex = 0
  } else if (slideIndex < 0) {
      slideIndex = totalSlides - 1
  }

  // เลื่อน slide
  carouselInner.style.transform = `translateX(-${slideIndex * 100}%)`

  // อัปเดต indicators
  indicators.forEach((indicator, index) => {
    if (index === slideIndex) {
      indicator.classList.add('bg-white')
      indicator.classList.remove('bg-gray-300')
    } else {
      indicator.classList.add('bg-gray-300')
      indicator.classList.remove('bg-white')
    }
  })

  currentSlide = slideIndex
}

window.nextSlide = function() {
  showSlide(currentSlide + 1)
  resetAutoSlide() // เริ่ม auto slide ใหม่หลังจากหยุด
}

window.prevSlide = function() {
  showSlide(currentSlide - 1)
  resetAutoSlide() // เริ่ม auto slide ใหม่หลังจากหยุด
}

function startAutoSlide() {
  stopAutoSlide() // หยุดการทำงานก่อนหน้านี้เพื่อป้องกันหลาย interval ซ้อนกัน
  autoSlideInterval = setInterval(function() {
    nextSlide()
  }, 3000)
}

function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
}

function resetAutoSlide() {
  stopAutoSlide() // หยุด auto slide เมื่อผู้ใช้คลิกปุ่ม next หรือ previous
  startAutoSlide() // เริ่ม auto slide ใหม่
}

// ให้ indicator หยุด auto slide และเปลี่ยนสไลด์
document.querySelectorAll('.indicator').forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    showSlide(index)
    resetAutoSlide() // รีเซ็ต auto slide เมื่อผู้ใช้คลิก indicator
  })
})

// แสดงสไลด์แรกเมื่อโหลดหน้า
document.addEventListener("DOMContentLoaded", function() {
  showSlide(currentSlide)
  startAutoSlide() // เริ่ม auto slide เมื่อหน้าโหลดเสร็จ
})

window.toggleMenu = function(event) {
  event.preventDefault()
  const nextElement = event.target.nextElementSibling
  const svgElement = event.target.querySelector('svg')
  if (nextElement && nextElement.tagName === 'UL') {
    nextElement.classList.toggle('hidden')
    svgElement.classList.toggle('rotate-180')
  }
}
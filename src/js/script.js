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
  // ตรวจว่าผู้ใช้คลิ๊กในเมนูหลักหรือเมนูย่อย
  const mainDetailsElements = document.querySelectorAll('.main-details')
  const subDetailsElements = document.querySelectorAll('.sub-details')

  // ถ้าคลิ๊กในเมนูหลัก
  mainDetailsElements.forEach(details => {
      if (!details.contains(event.target)) {
          details.removeAttribute('open')
      }
  })

  // ปิดเมนูย่อยอื่นๆ ที่ไม่เกี่ยวข้อง
  document.querySelectorAll('.sub-details').forEach(subDetails => {
      if (!subDetails.contains(event.target)) {
          subDetails.removeAttribute('open')
      }
  })
})

// Slide show
let currentSlide = 1

function showSlide(slideIndex) {
  // console.log('slideIndex', slideIndex)
  const slides = document.querySelectorAll('.carousel-item')
  slides.forEach((slide, index) => {
    if (index + 1 === slideIndex) {
      slide.style.opacity = '1'
      slide.style.zIndex = '10'
    } else {
        slide.style.opacity = '0'
        slide.style.zIndex = '0'
    }
  })
  currentSlide = slideIndex
}

// แสดงสไลด์แรกเมื่อโหลดหน้า
document.addEventListener("DOMContentLoaded", function() {
  showSlide(currentSlide);
})

// ตั้งค่าให้เปลี่ยนสไลด์ทุกๆ 3 วินาที
setInterval(function() {
  currentSlide = currentSlide === 3 ? 1 : currentSlide + 1
  showSlide(currentSlide)
}, 3000)
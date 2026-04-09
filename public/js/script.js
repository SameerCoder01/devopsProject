// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

const tiltSelectors = ['.listing-card', '.f-info', '.alert', 'form.needs-validation']
const tiltElements = document.querySelectorAll(tiltSelectors.join(','))
const supportsFinePointer = globalThis.matchMedia ? globalThis.matchMedia('(pointer:fine)').matches : true

if (supportsFinePointer) {
  tiltElements.forEach((element) => {
  element.addEventListener('mousemove', (event) => {
    const rect = element.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const rotateY = ((x / rect.width) - 0.5) * 8
    const rotateX = (0.5 - (y / rect.height)) * 8

    element.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-3px)`
    element.style.setProperty('--mx', `${x}px`)
    element.style.setProperty('--my', `${y}px`)
    element.style.setProperty('--glow', '1')
  })

  element.addEventListener('mouseleave', () => {
    element.style.transform = ''
    element.style.setProperty('--glow', '0')
  })
  })
}

const revealTargets = document.querySelectorAll('.listing-card, .show-card, form.needs-validation, .alert')

if ('IntersectionObserver' in globalThis) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return

      entry.target.style.opacity = '1'
      entry.target.style.transform = 'translateY(0)'
      observer.unobserve(entry.target)
    })
  }, { threshold: 0.18 })

  revealTargets.forEach((target, index) => {
    target.style.opacity = '0'
    target.style.transform = 'translateY(24px)'
    target.style.transition = `opacity 420ms ease ${(index % 6) * 70}ms, transform 420ms ease ${(index % 6) * 70}ms`
    observer.observe(target)
  })
}
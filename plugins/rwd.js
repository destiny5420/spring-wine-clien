import Vue from 'vue'

export default ({ app }, inject) => {
  inject(
    'rwd',
    Vue.observable({
      mm: window.innerWidth <= 320,
      m: window.innerWidth <= 375,
      sm: window.innerWidth <= 640,
      md: window.innerWidth <= 768,
      lg: window.innerWidth <= 1024,
      xl: window.innerWidth <= 1280,
      xxl: window.innerWidth <= 1440,
      xxxl: window.innerWidth <= 1920,
    })
  )
}

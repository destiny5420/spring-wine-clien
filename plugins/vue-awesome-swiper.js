import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import swiper, { Navigation, Pagination, Autoplay } from 'swiper'
swiper.use([Navigation, Pagination, Autoplay])

export default () => {
  Vue.use(VueAwesomeSwiper)
}

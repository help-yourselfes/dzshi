import { reactive } from 'vue';

const state = reactive({
  isMobile: window.innerWidth < 768,
});

const updateIsMobile = () => {
  state.isMobile = window.innerWidth < 768;
};

window.addEventListener('resize', updateIsMobile);

export default state;

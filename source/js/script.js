// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();

const animated = document.querySelector('.rules__item:nth-child(4) p');
const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

window.onload = function() {
    const { body } = document;
    body.classList.add("load-page");
};

animated.addEventListener('animationend', () => {
    const drove = document.getElementsByClassName("rules__link")[0];
    drove.classList.add("drove");
});
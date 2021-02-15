import throttle from 'lodash/throttle';
import {AccentTypographyBuild} from './animations.js';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      setTimeout(() => {
        this.changePageDisplay();
      }, 500)
    }
    if (currentPosition === 1) {
      document.querySelector('.animate-bg').classList.add('active');
    } else {
      document.querySelector('.animate-bg').classList.remove('active');
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    
    setTimeout(() => {
      this.changePageDisplay();
    }, 500)

    if ((location.hash.slice(1) === 'prizes')) {
      document.querySelector('.animate-bg').classList.add('active');
    } else {
      document.querySelector('.animate-bg').classList.remove('active');
    }
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
    this.animatedRules();
    this.fadeInHistory();
    this.fadeInPrizes();
    this.fadeInRules();
    this.fadeInGame();
  }

  fadeInHistory() {
    const animationHistory = new AccentTypographyBuild(`.js-history`, 400, `active`, `transform`);
    setTimeout(() => {
        animationHistory.runAnimation();
    }, 100)
    document.querySelector('.js-history').classList.remove('active');
  }

  fadeInPrizes() {
    const animationPrizes = new AccentTypographyBuild(`.js-prizes`, 400, `active`, `transform`);
    setTimeout(() => {
        animationPrizes.runAnimation();
    }, 100)
    document.querySelector('.js-prizes').classList.remove('active');
  }

  fadeInRules() {
    const animationRules = new AccentTypographyBuild(`.js-rules`, 400, `active`, `transform`);
    setTimeout(() => {
        animationRules.runAnimation();
    }, 100)
    document.querySelector('.js-rules').classList.remove('active');
  }
  fadeInGame() {
    const animationGame = new AccentTypographyBuild(`.js-game`, 400, `active`, `transform`);
    setTimeout(() => {
        animationGame.runAnimation();
    }, 100)
    document.querySelector('.js-game').classList.remove('active');
  }

  animatedRules() {
    let active = document.getElementsByClassName('js-rules-screen')[0];
    const drove = document.getElementsByClassName("js-rules-link")[0];
    const animated = document.querySelector('.js-rules-item');
    if (active.classList.contains('active')) {
            animated.addEventListener('animationend', () => {
                drove.classList.add("drove");
            });
    } else {
        drove.classList.remove("drove");
    }
  }

  changeVisibilityDisplay() {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });
    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    this.screenElements[this.activeScreen].classList.add(`active`);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}

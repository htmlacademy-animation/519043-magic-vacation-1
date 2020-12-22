export default () => {
    window.onload = function () {
        const { body } = document;
        body.classList.add("load-page");
    };

    class AccentTypographyBuild {
        constructor(
            elementSelector,
            timer,
            classForActivate,
            property
        ) {
            this._TIME_SPACE = 100;

            this._elementSelector = elementSelector;
            this._timer = timer;
            this._classForActivate = classForActivate;
            this._property = property;
            this._element = document.querySelector(this._elementSelector);
            this._timeOffset = 0;

            this.prePareText();
        }

        createElement(letter) {
            const span = document.createElement(`span`);
            span.textContent = letter;
            span.style.transition = `${this._property} ${this._timer}ms ease ${this._timeOffset}ms`;
            
            this._timeOffset = 20;
            return span;
        }

        prePareText() {
            if (!this._element) {
                return;
            }
            const text = this._element.textContent.trim().split(` `).filter((latter) => latter !== '');
            const content = text.reduce((fragmentParent, word) => {
                let i = 0;
                const wordElement = Array.from(word).reduce((fragment, latter) => {
                    if (i % 3 == 0) {
                        this._timeOffset = 300;
                    }
                    if (i % 3 == 1) {
                        this._timeOffset = 200;
                    }
                    if (i % 3 == 2 || i % 3 == 3) {
                        this._timeOffset = 100;
                    }
                    fragment.appendChild(this.createElement(latter));
                    i++;
                    return fragment;
                }, document.createDocumentFragment());
                const wordContainer = document.createElement(`span`);
                wordContainer.classList.add(`text__word`);
                wordContainer.appendChild(wordElement);
                fragmentParent.appendChild(wordContainer);
                
                return fragmentParent;
            }, document.createDocumentFragment());

            this._element.innerHTML = ``;
            this._element.appendChild(content);
        }

        runAnimation() {
            if (!this._element) {
                return;
            }
            this._element.classList.add(this._classForActivate);
        }

        destroyAnimation() {
            this._element.classList.remove(this._classForActivate);
        }
    }

    const animationIntroTitle = new AccentTypographyBuild(`.js-intro-title`, 500, `active`, `transform`);
    setTimeout(() => {
        animationIntroTitle.runAnimation();
    }, 1000);

    const animationIntroTitleTwo = new AccentTypographyBuild(`.js-intro-title-two`, 500, `active`, `transform`);
    setTimeout(() => {
        animationIntroTitleTwo.runAnimation();
    }, 1300);

    const animationIntroDate = new AccentTypographyBuild(`.js-intro-date`, 500, `active`, `transform`);
    setTimeout(() => {
        animationIntroDate.runAnimation();
    }, 1500);
    //  if (document.getElementsByClassName('.screen--story').classList.contains('active')) { console.log('work') }
    const animationHistory = new AccentTypographyBuild(`.screen--story .js-history`, 500, `active`, `transform`);
    setTimeout(() => {
        animationHistory.runAnimation();
    }, 1500);
}
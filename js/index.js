"use strict";
window.addEventListener("DOMContentLoaded", function () {
    // start creat tab

    const tabContents = document.querySelectorAll(".tabcontent");
    const tabHeaderItems = document.querySelectorAll(".tabheader__item");
    const tabHeaderItemsParent = document.querySelector(".tabheader__items");

    function hideTab() {
        tabContents.forEach(function (tabContent) {
            tabContent.classList.add("hide");
            tabContent.classList.remove("show", "fade");
        });
        tabHeaderItems.forEach(function (tabHeaderItem) {
            tabHeaderItem.classList.remove("tabheader__item_active");
        });
    };

    function showTab(i = 0) {
        tabContents[i].classList.add("show", "fade");
        tabContents[i].classList.remove("hide");
        tabHeaderItems[i].classList.add("tabheader__item_active");
    };

    hideTab();
    showTab(3);

    tabHeaderItemsParent.addEventListener("click", function (e) {
        if (e.target && e.target.matches(".tabheader__item")) {
            tabHeaderItems.forEach(function (tabHeaderItem, index) {
                if (e.target === tabHeaderItem) {
                    hideTab()
                    showTab(index)
                }
            })
        }
    })
    // end creat tab

    // timer logic statrt
    const deadline = "2023-07-17";
    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        let days, hours, minutes, seconds;

        if (total <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(total / (1000 * 60 * 60 * 24));
            hours = Math.floor((total / (1000 * 60 * 60) % 24));
            minutes = Math.floor((total / 1000 / 60) % 60);
            seconds = Math.floor((total / 1000) % 60);
        }

        return {
            total,
            days,
            hours,
            minutes,
            seconds
        }
    }

    function setZero(n) {
        return n >= 0 && n < 10 ? `0${n}` : n;
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const daysBlock = timer.querySelector("#days");
        const hoursBlock = timer.querySelector("#hours");
        const minutesBlock = timer.querySelector("#minutes");
        const secondsBlock = timer.querySelector("#seconds");
        const timerId = setInterval(updateClock, 1000);

        updateClock();
        function updateClock() {
            const { total, days, hours, minutes, seconds } = getTimeRemaining(endtime);

            daysBlock.textContent = setZero(days);
            hoursBlock.textContent = setZero(hours);
            minutesBlock.textContent = setZero(minutes);
            secondsBlock.textContent = setZero(seconds);

            if (total <= 0) {
                clearInterval(timerId);
            }

        }
    }

    setClock(".timer", deadline);
    // timer logic end

    // modal logic start
    const modalTrigger = document.querySelectorAll("[data-modal]");
    const modal = document.querySelector(".modal");
    const modalClose = document.querySelector("[data-close]");

    modalTrigger.forEach(btn => btn.addEventListener("click", openModal));



    modalClose.addEventListener("click", closeModal);

    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            closeModal();
        }
    })

    document.addEventListener("keydown", function (e) {
        // բայ առանց matches(.show) ել իմ մոտ նորմալ աշխատում ա???????????????????????????????????????????????????
        if (e.key === "Escape" && modal.matches(".show")) {
            closeModal();
        }
    })

    const modalTimerID = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.scrollY >= 700) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);

        }
        // if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        //     openModal();
        //     window.removeEventListener("scroll", showModalByScroll);
        // }
    }

    window.addEventListener("scroll", showModalByScroll);

    function openModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        //   xisenc chi ashxatum?????????????????????????????????????????????????????????????????????????????????????
        document.body.style.overflow = "hidden";
        // հայդենը ինչ իրա մեջից դուրսա մնու էտա պահում ես պարագայում բոդիից ինչնա դուր մնում???????????????????????????????
        clearTimeout(modalTimerID);
    }

    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.removeAttribute("style");
    }
    // modal logic end

    // start menu card

    class Menu {
        constructor(img, alt, title, descr, prise, parentelement) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.prise = prise;
            this.parentelement = document.querySelector(parentelement);
            this.uah = 27;
            this.changToUAH();
        };

        changToUAH() {
            this.prise = parseInt(this.prise * this.uah);
        };

        HTMLgenerator() {
            const {img, alt, title, descr, prise, parentelement} = this;
            const element = document.createElement("div");
            element.classList.add("menu__item");
            element.innerHTML = `
            <img src=${img} alt=${alt}>
            <h3 class="menu__item-subtitle">${title}</h3>
            <div class="menu__item-descr">${descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${prise}</span> грн/день</div>
            </div>
            `;
            parentelement.append(element);
        }
    };
    new Menu( 
        "img/tabs/vegy.jpg",
        "vegy",
        "Меню \"Фитнес\"",
        "Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        8.5,
        ".menu .container"
    ).HTMLgenerator();

    new Menu( 
        "img/tabs/elite.jpg",
        "elite",
        "Меню \"Премиум\"",
        "В меню \"Премиум\" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        20.4,
        ".menu .container"
    ).HTMLgenerator();

    new Menu( 
        "img/tabs/post.jpg",
        "post",
        "Меню \"Постное\"",
        "Меню \"Постное\" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        16,
        ".menu .container"
    ).HTMLgenerator();
    
    // end menu card
});
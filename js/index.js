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

    modalTrigger.forEach(btn => btn.addEventListener("click", openModal));

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
    

    modal.addEventListener("click", function (e) {
        if (e.target === modal || e.target.getAttribute("data-close") == "" ) {
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
            const { img, alt, title, descr, prise, parentelement } = this;
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

    const forms = document.querySelectorAll("form");

    function spinner() {
        return `
        <?xml version="1.0" encoding="utf-8"?>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="38px" height="38px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <g transform="rotate(0 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
            </rect>
        </g><g transform="rotate(30 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
            </rect>
        </g><g transform="rotate(60 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
            </rect>
        </g><g transform="rotate(90 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
            </rect>
        </g><g transform="rotate(120 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
            </rect>
        </g><g transform="rotate(150 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
            </rect>
        </g><g transform="rotate(180 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
            </rect>
        </g><g transform="rotate(210 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
            </rect>
        </g><g transform="rotate(240 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
            </rect>
        </g><g transform="rotate(270 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
            </rect>
        </g><g transform="rotate(300 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
            </rect>
        </g><g transform="rotate(330 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
            </rect>
        </g>
        <!-- [ldio] generated by https://loading.io/ --></svg>
    `;
    }

    const messages = {
        loading: spinner,
        success: "Thank you ! We will contact with you !",
        failure: "Sorry, but something went wrong !"
    }

    forms.forEach(form => postData(form));

    function postData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const { loading, success, failure } = messages;

            const loader = document.createElement("div");
            loader.innerHTML = loading();
            form.append(loader);

            const request = new XMLHttpRequest();
            request.open("POST", "server.php");

            // request.setRequestHeader("Content-type", "multipart/form-data");
            request.setRequestHeader("Content-type", "application/jason; charset=utf-8");

            if (!navigator.onLine) {
                messagesModal(failure + ": " + "Please check your internet connection and try again!")
                loader.remove();
                form.reset();
            }

            const formData = new FormData(form);

            const obj = {};
            formData.forEach((val, key) => obj[key] = val);

            request.send(JSON.stringify(obj));

            request.addEventListener("load", () => {
                if (request.status === 200) {
                    console.log(request.response);
                    messagesModal(success);
                    loader.remove();
                    form.reset();
                } else {
                    messagesModal(failure);
                    loader.remove();
                    form.reset();
                }
            });
        });
    }

    function messagesModal (message) {
        const prevModalDialog = document.querySelector(".modal__dialog");
        prevModalDialog.classList.add("hide");
        openModal();

        const messageModal = document.createElement("div");
        messageModal.classList.add("modal__dialog")
        messageModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close> &times; </div>
            <div class="modal__title">${message}</div>
        </div>
    `;

    document.querySelector(".modal").append(messageModal);

    setTimeout(() => {
        messageModal.remove();
        prevModalDialog.classList.add("show");
        prevModalDialog.classList.remove("hide");
        closeModal();
    }, 2000);
    }
});
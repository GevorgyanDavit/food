function menuCardsModule() {
    // class MenuCard {
    //     constructor(img, alt, title, descr, prise, parentelement) {
    //         this.img = img;
    //         this.alt = alt;
    //         this.title = title;
    //         this.descr = descr;
    //         this.price = prise;
    //         this.parentelement = document.querySelector(parentelement);
    //         this.uah = 27;
    //         this.changToUAH();
    //     };

    //     changToUAH() {
    //         this.prise = parseInt(this.price * this.uah);
    //     };

    //     HTMLgenerator() {
    //         const { img, alt, title, descr, prise, parentelement } = this;
    //         const element = document.createElement("div");
    //         element.classList.add("menu__item");
    //         element.innerHTML = `
    //         <img src=${img} alt=${alt}>
    //         <h3 class="menu__item-subtitle">${title}</h3>
    //         <div class="menu__item-descr">${descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //         </div>
    //         `;
    //         parentelement.append(element);
    //     }
    // };

    // getData("http://localhost:8888/menu")
    //  .then(data => data.forEach(({img, altimg, title, descr, price}) => {
    //     new MenuCard(img, altimg, title, descr, price, ".menu .container").HTMLgenerator();
    //  }))

    // getData("http://localhost:8888/menu")
    //   .then(data => createMenuCards(data));

    axios.get("http://localhost:8888/menu")
        .then(response => createMenuCards(response.data));

    function createMenuCards(data) {
        data.forEach(({ img, altimg, title, descr, price }) => {
            const element = document.createElement("div");
            element.classList.add("menu__item");
            const uah = 27;

            function changToUAH() {
                price = (parseFloat(price) * parseFloat(uah)).toFixed(2);
            };

            changToUAH();

            element.innerHTML = `
            <img src=${img} alt=${altimg}>
            <h3 class="menu__item-subtitle">${title}</h3>
            <div class="menu__item-descr">${descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${price}</span> грн/день</div>
            </div>
        `;

            document.querySelector(".menu .container").append(element);
        })
    }
}

module.exports = menuCardsModule;
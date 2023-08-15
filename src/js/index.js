"use strict";
window.addEventListener("DOMContentLoaded", function () {
    const tabModule = require("./components/tab");
    const timerModule = require("./components/timer");
    const modalModule = require("./components/modal");
    const menuCardsModule = require("./components/menuCards");
    const formsModule = require("./components/forms");
    const sliderModule = require("./components/slider");
    const calculatingModule = require("./components/calculator");

    tabModule();
    timerModule();
    modalModule();
    menuCardsModule();
    formsModule();
    sliderModule();
    calculatingModule();
});
"use strict";
window.addEventListener("DOMContentLoaded", function () {
    // start creat tab

    const tabContents = document.querySelectorAll(".tabcontent");
    const tabHeaderItems = document.querySelectorAll(".tabheader__item");
    const tabHeaderItemsParent = document.querySelector(".tabheader__items");

    function hideTab () {
        tabContents.forEach(function (tabContent) {
            tabContent.classList.add("hide");
            tabContent.classList.remove("show", "fade");
        });
        tabHeaderItems.forEach(function (tabHeaderItem) {
            tabHeaderItem.classList.remove("tabheader__item_active");
        });
    };

    function showTab (i = 0) {
        tabContents[i].classList.add("show", "fade");
        tabContents[i].classList.remove("hide");
        tabHeaderItems[i].classList.add("tabheader__item_active");
    };

    hideTab();
    showTab(3);

    tabHeaderItemsParent.addEventListener("click", function (e) {
        if (e.target && e.target.matches(".tabheader__item")) {
            tabHeaderItems.forEach(function(tabHeaderItem, index) {
                if (e.target === tabHeaderItem) {
                    hideTab()
                    showTab(index)                    
                }
            })
        }
    })
    // end creat tab
});
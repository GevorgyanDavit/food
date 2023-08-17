function modalModule () {
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
        if (e.target === modal || e.target.getAttribute("data-close") == "") {
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
}

// module.exports = modalModule;
export default modalModule;
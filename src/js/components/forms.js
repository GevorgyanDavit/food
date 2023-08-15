const spinner = require("./spinner");

function formsModule() {
    const forms = document.querySelectorAll("form");
    const messages = {
        loading: spinner,
        success: "Thank you ! We will contact with you !",
        failure: "Sorry, but something went wrong !"
    }

    forms.forEach(form => bindPostData(form));

    async function postData(url, data) {
        const request = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/jason; charset=UTF-8"
            },
            body: data
        });

        if (!request.ok) {
            throw new Error();
        }

        return await request.json();
    }

    async function getData(url) {
        const request = await fetch(url);

        if (!request.ok) {
            throw new Error();
        }

        return await request.json();
    }

    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const { loading, success, failure } = messages;

            const loader = document.createElement("div");
            loader.innerHTML = loading();
            form.append(loader);

            if (!navigator.onLine) {
                messagesModal(failure + ": " + "Please check your internet connection and try again!")
                loader.remove();
                form.reset();
            }

            const empty = /^$/g;
            const phone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            let status = false;

            for (let i = 0; i < form.querySelectorAll("input").length; i++) {
                if (empty.test(form[i].value) || !phone.test(form[1].value)) {
                    status = false;
                    messagesModal("Please fill all fields, and on phone field please fill mobile number format");
                    loader.remove();
                    form.reset();
                    break;
                } else {
                    status = true;
                }
            }

            if (status) {
                const formData = new FormData(form);
                // const data = JSON.stringify(Object.fromEntries(formData.entries()))


                axios.post("http://localhost:8888/requests", Object.fromEntries(formData))
                    .then(res => {
                        console.log(res);
                        messagesModal(success);
                    })
                    .catch(err => {
                        messagesModal(failure + ": " + err);
                    })
                    .finally(() => {
                        loader.remove();
                        form.reset();
                    });
            } else {
                console.log("status is false");
            }
        });
    }

    function messagesModal(message) {
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
}

module.exports = formsModule;
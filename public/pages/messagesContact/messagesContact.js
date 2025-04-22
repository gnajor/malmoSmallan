import { renderFooter } from "../../components/footer/footer.js";

export function renderMessagesContactPage(parent) {
    parent.innerHTML = `<div id="messages-contact-page">
                            <header></header>
                            <main></main>
                            <footer></footer>
                        </div>`;

    renderFooter(
        parent.querySelector("footer"),
        () => { }
    );

    renderMessagesContactsHeader(
        parent.querySelector("header")
    );
    renderMessagesContactsMain(
        parent.querySelector("main")
    );
}

function renderMessagesContactsHeader(parent) {
    const header = document.createElement("h1");
    header.id = "messages-contacts-header";
    header.innerHTML = "Meddelanden";
    parent.appendChild(header);
}

// profilbild - namn - meddelande - pil
function renderMessagesContactsMain(parent) {
    for (let i = 0; i < 5; i++) {
        const messanger = document.createElement("div");
        const img = document.createElement("img");
        const name = document.createElement("p");
        const message = document.createElement("p");
        const arrow = document.createElement("img");

        messanger.className = "messanger";
        img.className = "messanger-img";
        name.className = "messanger-name";
        message.className = "messanger-message";
        arrow.className = "messanger-arrow";

        messanger.appendChild(img);
        messanger.appendChild(name);
        messanger.appendChild(message);
        messanger.appendChild(arrow);
        parent.appendChild(messanger);

    }
}
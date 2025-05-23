import { renderFooter } from "../../components/footer/footer.js";
import { pageHandler } from "../../pageHandler/pageHandler.js";

export function renderMessagesContactPage(parent, messages, noErrors=false) {
    parent.innerHTML = `<div id="messages-contact-page">
                            <header id="messages-contacts-header"></header>
                            <main id="messages-contacts-main"></main>
                            <footer></footer>
                        </div>`;

    renderFooter(parent.querySelector("footer"));
    renderMessagesContactsHeader(parent.querySelector("header"));
    renderMessagesContactsMain(parent.querySelector("main"), messages, noErrors);
}

function renderMessagesContactsHeader(parent) {
    const header = document.createElement("h1");
    header.id = "messages-contacts-h1";
    header.innerHTML = "Meddelanden";
    parent.appendChild(header);
}

function renderMessagesContactsMain(parent, lastMessage, noErrors) {
    for (let i = 0; i < 5; i++) {
        const messanger = document.createElement("div");
        const imgCon = document.createElement("div");
        const img = document.createElement("img");
        const textCon = document.createElement("div");
        const leftCon = document.createElement("div");
        const name = document.createElement("p");
        const message = document.createElement("p");
        const arrow = document.createElement("img");

        messanger.className = "messanger";
        img.className = "messanger-img";
        imgCon.className = "messanger-img-con";
        leftCon.className = "messanger-left-con";
        textCon.className = "messanger-text-con";
        name.className = "messanger-name";
        message.className = "messanger-message";
        arrow.className = "messanger-arrow";

        img.src = "../../media/messages-contacts-icon/profile.svg";
        arrow.src = "../../media/messages-contacts-icon/arrow.svg";

        if (lastMessage[i]) {
            if(lastMessage[i].sender === "Spelaren"){
                name.innerHTML = "Alex";
            }
            else{
                name.innerHTML = lastMessage[i].sender;
            }
            message.innerHTML = lastMessage[i].text.substring(0, 30) + "...";
            leftCon.appendChild(imgCon);
            imgCon.appendChild(img);

            messanger.addEventListener("click", () => {
                if(lastMessage[i].sender === "Okänt nummer"){
                    pageHandler.handleDealerMessagesPageRender();
                }
                else if(lastMessage[i].sender === "Alex" || lastMessage[i].sender === "Spelaren"){
                    pageHandler.handleFriendMessagesPageRender();
                }
            });
        } else {
            if(noErrors){
                continue;
            }
            
            name.innerHTML = "Fel";
            message.innerHTML = "Kunde inte hitta konversationen";
            messanger.classList.add("error");
        }

        messanger.appendChild(leftCon);
        leftCon.appendChild(textCon);
        textCon.appendChild(name);
        textCon.appendChild(message);
        messanger.appendChild(arrow);
        parent.appendChild(messanger);
    }
}
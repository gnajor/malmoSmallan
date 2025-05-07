// app = sms, news, bank, maps, notes, phone
export function renderNotification(parent, app, title, text, func) {
    const notiCon = document.createElement("div");
    const top = document.createElement("div");
    const appCon = document.createElement("div");
    const appImg = document.createElement("img");
    const appName = document.createElement("p");
    const time = document.createElement("p");
    const bottom = document.createElement("div");
    const bottomHeader = document.createElement("p");
    const bottomText = document.createElement("p");

    notiCon.classList = "noti-con";
    top.classList = "noti-top";
    appCon.classList = "noti-app-con";
    appImg.classList = "noti-app-img";
    appName.classList = "noti-app-name";
    time.classList = "noti-time";
    bottom.classList = "noti-bottom";
    bottomHeader.classList = "noti-bottom-header";
    bottomText.classList = "noti-bottom-text";

    let appSrc = `../../media/apps/${app}-app.jpg`;
    let name;
    switch (app) {
        case 'sms':
            name = "Meddelanden";
            break;
        case 'news':
            name = "Malmöbladet";
            break;
        case 'bank':
            name = "DegBanken - Swosh";
            break;
        case 'maps':
            name = "Kartor";
            break;
        case 'notes':
            name = "Anteckningar";
            break;
        case 'phone':
            name = "Telefon";
            appSrc = `../../media/apps/${app}-app.png`;
            break;
    }

    appName.textContent = name;
    time.textContent = "Nu";
    bottomHeader.textContent = title;
    bottomText.textContent = text;

    appImg.setAttribute("src", appSrc);

    parent.appendChild(notiCon);
    notiCon.appendChild(top);
    top.appendChild(appCon);
    appCon.appendChild(appImg);
    appCon.appendChild(appName);
    top.appendChild(time);
    notiCon.appendChild(bottom);
    bottom.appendChild(bottomHeader);
    bottom.appendChild(bottomText);

    notiCon.addEventListener("click", () => {
        func();
    });

    setTimeout(() => {
        notiCon.classList.add("show");
    }, 100);
}
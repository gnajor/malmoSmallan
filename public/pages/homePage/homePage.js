import { renderFooter } from "../../components/footer/footer.js";

export function renderHomePage(parent, apps, ending = false){
    parent.innerHTML = `<div id="home-page">
                            <main id="app-container"></main>
                            <footer></footer>
                        </div>`;

    renderFooter(parent.querySelector("footer"));

    if(ending){
        parent.classList.add("background");
        parent.style.animation = "fadeOut 5s";
    }

    for(const app of apps){
        renderApps(
            parent.querySelector("#app-container"),
            app
        );
    }
}

function renderApps(parent, app){
    const srcWd = "../../media/apps/";

    const appElement = document.createElement("button");
    appElement.className = "app";
    appElement.id = app.name;
    parent.appendChild(appElement);

    appElement.innerHTML = `<img src="${srcWd + app.icon}" alt="a image of the app ${app.name}">
                            <span>${app.name}</span>`;

    if(!app.locked){
        appElement.addEventListener("click", app.func);
    }
    else{
        appElement.classList.add("locked");
    }
}
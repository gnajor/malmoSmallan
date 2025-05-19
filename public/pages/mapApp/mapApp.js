export function renderMapApp(parent, app, link){
    const srcWd = "../../media/apps/";

    if(app.locked){
        parent.innerHTML += `<button class="app locked">
                                <img src="${srcWd + app.icon}" alt="a image of the app ${app.name}">
                                <span>${app.name}</span>
                            </button>`;
    }
    else{
        parent.innerHTML += `<a href="${link}" target="_blank" class="app">
                                <img src="${srcWd + app.icon}" alt="a image of the app ${app.name}">
                                <span>${app.name}</span>
                            </a>`;
    }
}

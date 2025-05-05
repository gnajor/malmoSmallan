import { pageHandler } from "../../pageHandler/pageHandler.js";

export function renderFooter(parent, func){
    parent.innerHTML = `<button id="outer-circle">
                            <div id="inner-square"></div>
                        </button>`;

    const button = parent.querySelector("#outer-circle");
    button.addEventListener("click", () => {
        pageHandler.handleHomePageRender();

        if(func){
            func();
        }
    }); 
}
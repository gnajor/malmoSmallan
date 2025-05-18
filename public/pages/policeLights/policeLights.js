import { pageHandler } from "../../pageHandler/pageHandler.js";

export function renderPoliceLights(parent) {
    parent.innerHTML = `
        <video autoplay loop class="videoElement">
            <source src="../../media/video-files/policeLights.mov">
        </video>`;

    setTimeout(() => {
        pageHandler.handleHomePageRender();
    }, 8000);
}
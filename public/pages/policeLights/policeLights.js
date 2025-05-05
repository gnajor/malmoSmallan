export function renderPoliceLights(parent) {
    parent.innerHTML = `
        <video autoplay loop class="videoElement">
            <source src="../../media/video-files/policeLights.mp4">
        </video>
    `;
    const audio = new Audio("../../media/audio-files/policeSound.mp3");
    audio.play();
    audio.loop = true;
}
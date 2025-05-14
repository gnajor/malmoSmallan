import { renderFooter } from "../../components/footer/footer.js";
import { renderIphonePopUp } from "../../components/footer/iphonePopUp.js";

export function renderNewsPage(parent, otherNews) {
    const srcWdMedia = "../../media/news-media/";

    parent.innerHTML = `<div id="news-page">
                                            <header>
                                                <button id="back-button">
                                                    <img src="${srcWdMedia}back.svg">
                                                </button>
                                                <h3>Malmöbladet</h3>
                                            </header>
                                            <main>
                                                <div id="title-box">
                                                    <h1>JUST NU: Möllantigern stulen - Ägaren erbjuder hittelön</h1>
                                                    <span>Idag 05:00</span>
                                                </div>
                                                <p id="subtitle">Natten till idag blev möllantigern stulen, nu erbjuder ägaren en hittelön på 20 000 kr för att tigern ska hitta hem igen.</p>
                                                <div id="author-button-box">
                                                    <div id="author-box">
                                                        <img src="${srcWdMedia}author.png">
                                                        <div id="author-data">
                                                            <h3>Stu Price</h3>
                                                            <span>Stu.price@malmobladet.se</span>
                                                            <span>040-62 80 444</span>
                                                        </div>
                                                    </div>
                                                    <div id="button-container">
                                                        <button id="follow-button">Följ</button>
                                                        <button id="share-button">
                                                            <img src="${srcWdMedia}share.svg">
                                                        </button>
                                                    </div>
                                                </div>
                                                <div id="image-container">
                                                    <img src="${srcWdMedia}wanted-tiger.jpg">
                                                    <span>Möllantigern där den vanligtvis ligger. Bild: Alan Garner</span>
                                                </div>
                                                <div id="text-section">
                                                    <p>I över tio år har den stått utanför butiken på hörnan på Claesgatan och Sofielundsvägen, ett gosedjur av en tiger som definitivt sett bättre dagar. </p>
                                                    <p>Men när butiksägaren öppnade butiken insåg han att tigern var försvunnen. Förtvivlad kontaktade han polisen. Nu vädjar han till allmänheten för hjälp att hitta tigern. Han erbjuder även en hittelön på 20 000kr för att gosedjuret ska komma hem.</p>
                                                    <p>-Jag kollade runt med grannar och personer som gick förbi om de hade sett något. Men ingen visste något, säger butiksägaren. </p>
                                                    <p>Polisen berättar att de inte har några spår för tillfället, men att de undersöker och uppskattar alla tips de kan få.</p>
                                                    <p>-Det är såklart en tragedi för Malmö om tigern skulle försvinna. Vi behandlar detta som en kidnappning och kommer göra allt i vår makt för att se till att tigern kommer hem igen, säger Phil Wenneck presstalesperson på polisen.</p>
                                                    <p>Tigern ska enligt polisen ha blivit stulen runt klockan 03. Det finns för tillfället ingen misstänkt för stölden, polisen söker vittnen till händelsen.</p>
                                                </div>
                                                <div id="other-news-container">
                                                    <h2>Andra nyheter</h2>
                                                    <div id="other-news"></div>
                                                </div>
                                                <div id="bottom-info">
                                                    <h2>Om Malmöbladet</h2>
                                                    <p>Malmöbladet, grundad 1965 av Sid Garner,
                                                        är Malmö innerstads tredje största morgontidning. I 60 år har Malmöbladet förmedlat nyheter i närmiljön, men också runt i hela Malmö. Malmöbladet är inte den största, inte ens den bästa, men kanske en  av de sämsta tidningarna i hela Malmö. Om du tror att du hallucinerar, så kanske det stämmer. Är något logiskt nu för tiden? Går det att lita på någon? Förmodligen inte. Men vi rapporterar om det ändå.</p>
                                                </div>
                                            </main>
                                            <footer></footer>
                                        </div>`;

    renderFooter(parent.querySelector("footer"));

    const followButton = parent.querySelector("#follow-button");
    const shareButton = parent.querySelector("#share-button");
    const backButton = parent.querySelector("#back-button");

    followButton.addEventListener("click", renderErrorPopUp);
    shareButton.addEventListener("click", renderErrorPopUp);
    backButton.addEventListener("click", renderErrorPopUp);


    for (let i = 0; i < otherNews.length; i++) {
        const otherNewsTitle = otherNews[i];
        let shouldLineExist = false;

        if (i !== otherNews.length - 1) {
            shouldLineExist = true
        }

        renderOtherNews(
            parent.querySelector("#other-news"),
            otherNewsTitle,
            shouldLineExist
        );
    }
}

function renderOtherNews(parent, otherNewsTitle, line = false) {
    const newsElement = document.createElement("div");
    newsElement.className = "other-news-item";
    parent.appendChild(newsElement);

    newsElement.innerHTML = `<h3>${otherNewsTitle}</h3>
                             <span>Malmö</span>`;

    if (line) {
        const lineElement = document.createElement("div");
        lineElement.className = "line";
        parent.appendChild(lineElement);
    }

    newsElement.addEventListener("click", () => {
        renderErrorPopUp();
    });
}

function renderErrorPopUp() {
    renderIphonePopUp(
        document.querySelector("#news-page"),
        "other",
        "Fel",
        "Åtkomst nekad",
        "Stäng"
    );
}
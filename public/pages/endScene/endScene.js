export function renderEndScene(parent, efterTexter) {
    const bg = document.createElement("div");
    bg.id = "endSceneBg";

    const textCon = document.createElement("div");
    textCon.id = "endSceneTextCon";

    //firstpart

    const firstPart = document.createElement("p");
    firstPart.id = "endSceneFirstPart";
    firstPart.innerHTML = `
        <strong> Tack för att du spelade vårt spel! </strong>
        <br/><br/>
        Vi hoppas att din resa genom denna berättelse varit lika rolig och spännande som det var för oss att skapa den. 
        Din upplevelse betyder allt för oss, och vi är jättetacksamma för att du tagit din tid att utforska Malmös galnaste natt med oss.
        <br/><br/>
        Om du har några tankar, idéer, klagomål eller bara vill ses på en öl, tveka inte att höra av dig till någon av oss:
        <br/><br/>
        Petter Hedberg
        <br/>
        Julia Blomqvist
        <br/>
        Junia Axelsson Sandberg
        <br/>
        Ella Ahlstedt
        <br/>
        Leo Mühl
        <br/><br/>
        Ett speciellt tack riktar vi till Johannes Karlsson som inspirerat oss i denna uppgift, även om det inte riktigt blev som han hade tänkt sig…
        Ha det bäst!
        <br/><br/><br/>
       <strong> Utvecklingsteamet: </strong>
       <br/>
    `;

    parent.appendChild(bg);
    parent.appendChild(textCon);
    textCon.appendChild(firstPart);

    //second part

    const secPartCon = document.createElement("div");
    secPartCon.id = "secPartCon";
    textCon.appendChild(secPartCon);

    for (let part of efterTexter) {
        const con = document.createElement("div");
        con.classList.add("endSceneSecPartCon", part.position);

        if (part.position === 'left') {
            const row = document.createElement("div");
            row.classList.add("endSceneRow");

            const title = document.createElement("p");
            title.classList.add("endSceneSecPartTitle");
            title.innerHTML = `<strong>${part.title}:</strong>`;

            const nameCon = document.createElement("div");
            nameCon.classList.add("endSceneSecPartNameCon");

            for (let name of part.names) {
                const text = document.createElement("p");
                text.classList.add("endSceneSecPartName");
                text.innerHTML = `${name}`;
                nameCon.appendChild(text);
            }

            row.appendChild(title);
            row.appendChild(nameCon);
            con.appendChild(row);
        } else {
            const title = document.createElement("p");
            title.classList.add("endSceneSecPartTitle");
            title.innerHTML = `<strong>${part.title}:</strong>`;

            const nameCon = document.createElement("div");
            nameCon.classList.add("endSceneSecPartNameCon");

            for (let name of part.names) {
                if (typeof name === 'object') {
                    const currentNameCon = document.createElement("div");
                    currentNameCon.classList.add("endSceneCurrentNameCon");

                    const text = document.createElement("p");
                    text.classList.add("endSceneSecPartName");
                    text.innerHTML = name.sName;

                    const license = document.createElement("p");
                    license.classList.add("endSceneSecPartName", "endSceneLicense");
                    license.innerHTML = name.license;

                    nameCon.appendChild(currentNameCon);
                    currentNameCon.appendChild(text);
                    currentNameCon.appendChild(license);
                    currentNameCon.appendChild(link);
                } else {
                    const text = document.createElement("p");
                    text.classList.add("endSceneSecPartName");
                    text.innerHTML = name;
                    nameCon.appendChild(text);
                }
            }

            con.appendChild(title);
            con.appendChild(nameCon);
        }
        secPartCon.appendChild(con);
    }

    // thirdpart
    const lastSceneCon = document.createElement("div");
    lastSceneCon.id = "endSceneLastSceneCon";
    parent.appendChild(lastSceneCon);

    const lastWords = document.createElement("p");
    lastWords.classList.add('endSceneLastWords');
    lastWords.textContent = "Oavsett hur förvirrande det blir, är det ju ändå bara en hallucination…";
    lastSceneCon.appendChild(lastWords);

    const logo = document.createElement("img");
    logo.classList.add('endSceneLogo');
    logo.setAttribute("src", "../../media/end-scene/logo.png");
    lastSceneCon.appendChild(logo);

    document.querySelector("body").style.overflow = "hidden";

    //animation
    requestAnimationFrame(() => {
        textCon.classList.add("endSceneAnimate");
    });

    textCon.addEventListener("animationend", () => {
        lastSceneCon.classList.add("endSceneShow");
        logo.classList.add("endSceneShow");
    });
}

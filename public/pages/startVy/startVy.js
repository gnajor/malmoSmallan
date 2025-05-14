export function renderStartVy(parent) {
    const bg = document.createElement("div");
    const startViewCon = document.createElement("div");

    const startViewTextCon = document.createElement("div");

    const startViewInfoCon = document.createElement("div");
    const header = document.createElement("h1");
    const infoText = document.createElement("p");

    const startViewTipsCon = document.createElement("div");
    const tipsTitle = document.createElement("p");
    const tipsText = document.createElement("p");

    const startViewKomCon = document.createElement("div");
    const komTitle = document.createElement("p");
    const komText = document.createElement("p");

    const luckText = document.createElement("p");
    const startGameBtn = document.createElement("button");

    //id
    startViewTextCon.id = "startViewTextCon";
    startViewCon.id = "startViewCon";
    startViewKomCon.id = "startViewTitleCon";
    startViewTipsCon.id = "startViewTipsCon";
    startViewInfoCon.id = "startViewInfoCon";
    bg.id = "startViewBg";
    header.id = "startViewHeader";
    infoText.id = "startViewInfoText";
    tipsTitle.id = "startViewTipsTitle";
    tipsText.id = "startViewTipsText";
    komTitle.id = "startViewKomTitle";
    komText.id = "startViewKomText";
    luckText.id = "startViewLuckText";
    startGameBtn.id = "startViewStartGameBtn";

    //text
    header.textContent = "Malmösmällan";
    infoText.textContent = "En tidig sommarmorgon sveper över Malmö, du vaknar plötsligt upp mitt på Möllevångstorget, utan några minnesbilder från gårdagen. Det känns som att gårdagens natt blev galen. Allt du har på dig är din telefon, det enda verktyget som kan hjälpa dig ta reda på vad som egentligen hände den föregående natten.";
    tipsTitle.textContent = "Tips";
    tipsText.textContent = "Ledtrådar kan gömma sig i texter och meddelanden, så ta din tid och var uppmärksam på detaljer!";
    komTitle.textContent = "Kom ihåg";
    komText.textContent = "Glöm inte att tillåta platsinformation och slå på ljudet på din telefon för den allra bästa spelupplevelsen. Om spelet står stilla eller saker tar tid att ladda, testa att ladda om sidan";
    luckText.textContent = "Lycka till!";
    startGameBtn.textContent = "Börja spelet";


    //append
    parent.appendChild(bg);
    parent.appendChild(startViewCon);
    startViewCon.appendChild(startViewTextCon);

    startViewTextCon.appendChild(startViewInfoCon);
    startViewTextCon.appendChild(startViewTipsCon);
    startViewTextCon.appendChild(startViewKomCon);

    startViewInfoCon.appendChild(header);
    startViewInfoCon.appendChild(infoText);

    startViewTipsCon.appendChild(tipsTitle);
    startViewTipsCon.appendChild(tipsText);

    startViewKomCon.appendChild(komTitle);
    startViewKomCon.appendChild(komText);

    startViewCon.appendChild(luckText);
    startViewCon.appendChild(startGameBtn);
}
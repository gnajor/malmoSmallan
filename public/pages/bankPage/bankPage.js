import { renderFooter } from "../../components/footer/footer.js";
import { progressionState } from "../../index.js";
import { pageHandler } from "../../pageHandler/pageHandler.js";

export function renderBankPage(parent, transactions, warning = true) {
    parent.innerHTML = `<div id="bank-page">   
                            <header>
                                <h3>DegBanken</h3>
                            </header>
                            <main>
                            <div id="swosh-warning-box">
                                <div id="swosh-warning-top">
                                    <img src="../../media/transaction-icons/warning.svg" alt="Warning Symbol">
                                    <p id="swosh-warning-text">Varning!</p>
                                </div>
                                <p id="swosh-warning-text">Du har överskridit månadens budget på 20 000 kr.</p>
                            </div>
                                <div id="account-swosh-box">
                                    <div id="account-swosh">
                                        <div id="account-box">
                                            <h3>Konton</h3>
                                            <div id="account">
                                                <div id="left-side">
                                                    <span id="account-title">Privat konto</span>
                                                    <span>420-1,234 112 69-9</span>
                                                </div>
                                                <div id="right-side">
                                                    <span>4,20</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="swosh-box">
                                            <h3>Swosh</h3>
                                            <div id="inputs-box">
                                                <div id="number-input">
                                                    <span>Mottagarens nummer</span>
                                                    <input>
                                                </div>
                                                <div id="sum-input">
                                                    <span>Summa</span>
                                                    <input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button>Swoooosh</button>
                                </div>
                                <div id="transactions-box">
                                    <h3>Senaste transaktioner</h3>
                                    <div id="transactions"></div>
                                </div>
                            </main>
                            <footer></footer>
                        </div>`;

    if(!warning){
        parent.querySelector("#swosh-warning-box").remove();
    }


    renderFooter(
        parent.querySelector("footer"),
        () => { }
    );

    parent.querySelector("main button").addEventListener("click", () => {
        const sumInput = parent.querySelector("#sum-input input");
        const numberInput = parent.querySelector("#number-input input");
        const sumInputValue = sumInput.value;
        const numberInputValue = numberInput.value;

        const newTransaction = {
            icon: "money.svg",
            name: "Swosh",
            date: "2025-04-07",
            sum: "-" + sumInputValue + ",00"
        }

        if(numberInputValue === "1930342" && sumInputValue === "20000" && warning){
            const bankPage = document.querySelector("#bank-page");
            progressionState.isUnlocked("police-ending", "done");

            renderTransaction(
                parent.querySelector("#transactions"),
                newTransaction
            );

            setTimeout(() => {
                bankPage.classList.add("ending");
            }, 1000);

            bankPage.addEventListener("transitionend", () => {
                pageHandler.handlePoliceLightsRender();
            }, {once: true});
        } 

        if(numberInputValue !== "1930342" || !warning){
            numberInput.classList.add("shake");

            numberInput.addEventListener("animationend", () => {
                numberInput.classList.remove("shake");
            });
        }

        if(sumInputValue !== "20000" || !warning){
            sumInput.classList.add("shake");

            sumInput.addEventListener("animationend", () => {
                sumInput.classList.remove("shake");
            });
        }
    });

    for (const transaction of transactions) {
        if(transaction.sum === "+20000,00" && transaction.name === "Swosh"){
            parent.querySelector("#right-side span").textContent = "20004,20";
        }

        else if(transaction.sum === "-20000,00" && transaction.name === "Swosh"){
            parent.querySelector("#right-side span").textContent = "4,20";
        }

        renderTransaction(
            parent.querySelector("#transactions"),
            transaction
        );
    }
}

function renderTransaction(parent, transaction) {
    const srcWd = "../../media/transaction-icons/";
    const transactionElement = document.createElement("div");
    transactionElement.className = "transaction";
    parent.appendChild(transactionElement);

    transactionElement.innerHTML = `<div class="img-title-date">
                                        <div class="img-container">
                                            <img src=${srcWd + transaction.icon} alt="a image surrounding ${transaction.name}">
                                        </div>
                                        <div class="title-date">
                                            <h3>${transaction.name}</h3>
                                            <span class="transaction-date">${transaction.date}</span>
                                        </div>
                                    </div>
                                    <span class="transaction-sum">${transaction.sum}</span>`;
}
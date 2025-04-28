import { renderFooter } from "../../components/footer/footer.js";
import { pageHandler } from "../../pageHandler/pageHandler.js";

export function renderNotesPage(parent, notes){
    parent.innerHTML = `<div id="notes-page">
                            <header>
                                <h1>Anteckningar</h1>
                                <nav>
                                    <div id="button-container"> 
                                        <button id="latest">Senaste</button>
                                        <button id="favorite">Favoriter</button>
                                    </div>
                                    <div id="underline"></div>
                                </nav>
                            </header>
                            <main>
                                <div id="latest-notes">
                                    <div id="yesterday-notes">
                                        <h2>Igår</h2>
                                        <div class="notes-container"></div>
                                    </div>
                                    <div id="last-seven-days-notes">
                                        <div id="title-container">
                                            <h2>Senaste sju dagarna</h2>
                                            <img src="">
                                        </div>
                                        <div class="notes-container"></div>
                                    </div>
                                </div>
                                <div id="favorite-notes">
                                    <div class="notes-container"></div>
                                </div>
                            </main>
                            <footer></footer>
                        </div>`;

    renderFooter(parent.querySelector("footer"));

    const yesterdayNotes = new Notes(
        parent.querySelector("#yesterday-notes .notes-container"),
        notes.yesterday
    );
    const lastSevenDaysNotes = new Notes(
        parent.querySelector("#last-seven-days-notes .notes-container"),
        notes.latest
    );

    const favoriteNotes = new Notes(
        parent.querySelector("#favorite-notes .notes-container"),
        notes.favorite
    );

    yesterdayNotes.renderNotes();
    lastSevenDaysNotes.renderNotes();

    const titleContainer = parent.querySelector("#title-container");
    const yesterdayTitle = parent.querySelector("#yesterday-notes h2");
    const underLine = parent.querySelector("#underline");
    const latestNotes = parent.querySelector("#latest-notes");

    parent.querySelector("button#latest").addEventListener("click", (event) => {
        yesterdayNotes.renderNotes();
        lastSevenDaysNotes.renderNotes();
        favoriteNotes.remove();

        titleContainer.classList.remove("gone");
        yesterdayTitle.classList.remove("gone");
        latestNotes.classList.remove("gone");
        underLine.classList.remove("move");

    });

    parent.querySelector("button#favorite").addEventListener("click", (event) => {
        favoriteNotes.renderNotes();
        yesterdayNotes.remove();
        lastSevenDaysNotes.remove();
        
        titleContainer.classList.add("gone");
        yesterdayTitle.classList.add("gone");
        latestNotes.classList.add("gone");
        underLine.classList.add("move");
    });
}

class Notes{
    constructor(parent, notesData){
        this.parent = parent;
        this.notesData = notesData;
    }

    renderNotes(){
        for(const note of this.notesData){
            this.renderNote(this.parent, note);
        }
    }

    renderNote(parent, note){
        const noteContainer = document.createElement("div");
        noteContainer.className = "note";
        parent.appendChild(noteContainer);
    
        noteContainer.innerHTML = `<h3 class="note-title">${note.title}</h3>
                                   <span class="note-date">${note.date}</span>
                                   <p class="class-content">${note.text}</p>`;

        noteContainer.addEventListener("click", this.onClick);
        noteContainer.addEventListener("transitionend", this.onTransEnd);  

    }

    onClick(event){
        event.stopPropagation();
        event.currentTarget.classList.add("animationStart");
    }

    onTransEnd(event){
        pageHandler.handleSpecificNotesPageRender();
    }

    remove(){
        this.parent.innerHTML = ``;
    }
}


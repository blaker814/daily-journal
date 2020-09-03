import { saveJournalEntry } from "./JournalDataProvider.js"

const eventHub = document.querySelector("main")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitEntry") {
        const contentTarget = document.querySelectorAll(".journalEntryInput")
        if (contentTarget[1].value.length < 20) {
            const newJournalEntry = {
                date: contentTarget[0].value,
                concept: contentTarget[1].value,
                entry: contentTarget[2].value,
                mood: contentTarget[3].value
            }
            saveJournalEntry(newJournalEntry)
        } else {
            alert("Concepts covered field must be less than 20 characters long. Please input again.")
        }
    }
})

export const JournalFormComponent = () => {
    const contentTarget = document.querySelector("#journalForm")
    contentTarget.innerHTML = `
        <h2>Daily Journal</h2>
        <form action="">
            <fieldset>
                <label for="journalDate">Date of entry</label>
                <input type="date" name="journalDate" id="journalDate" class="journalEntryInput">
            </fieldset>    
            <fieldset>
                <label for="concepts">Concepts covered</label>
                <input type="text" name="concepts" id="concepts" class="journalEntryInput">
            </fieldset>
            <fieldset>
                <label for="journalEntry">Journal Entry</label>
                <textarea class="journalEntryInput"></textarea>
            </fieldset>
            <fieldset>
                <label for="mood">Mood for the day</label>
                <select id="mood" class="journalEntryInput">
                    <option value="Happy">Happy</option>
                    <option value="Ok">Ok</option>
                    <option value="Sad">Sad</option>
                </select>    
            </fieldset>
            <input type="submit" value="Record Journal Entry" id="submitEntry">    
        </form>`
}

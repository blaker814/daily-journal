import { useJournalEntries, getJournalEntries } from "./JournalDataProvider.js"
import { JournalEntryComponent } from "./JournalEntry.js"

const eventHub = document.querySelector("main")

eventHub.addEventListener("journalStateChanged", event => {
    render(useJournalEntries())
})

export const EntryListComponent = () => {
    getJournalEntries()
        .then(() => {
            render(useJournalEntries())
        })
    
}

const render = arrayOfEntries => {
    const entryLog = document.querySelector("#entryLog")
    let HTMLArray = arrayOfEntries.map(entry => JournalEntryComponent(entry))
    entryLog.innerHTML = HTMLArray.join("")
}
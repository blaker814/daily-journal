import { useJournalEntries, getJournalEntries } from "./JournalDataProvider.js"
import { JournalEntryComponent } from "./JournalEntry.js"

const eventHub = document.querySelector("main")

eventHub.addEventListener("journalStateChanged", event => {
    render(useJournalEntries())
})

eventHub.addEventListener("moodChosen", event => {
    const journalEntries = useJournalEntries()

    const filteredEntries = journalEntries.filter(entry => entry.moodId === event.detail.moodSelected)
    render(filteredEntries)
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
import { useJournalEntries, getJournalEntries } from "./JournalDataProvider.js"
import { JournalEntryComponent } from "./JournalEntry.js"

const entryLog = document.querySelector("#entryLog")
const eventHub = document.querySelector("main")

eventHub.addEventListener("journalStateChanged", event => {
    
})

export const EntryListComponent = () => {
    getJournalEntries()
        .then(() => {
            const entries = useJournalEntries()
            entryLog.innerHTML += entries.map(entry => JournalEntryComponent(entry)).join("")
        })
    eventHub.addEventListener("journalStateChanged", event => {
        const entries = useJournalEntries()
        entryLog.innerHTML += entries.map(entry => JournalEntryComponent(entry)).join("")
    })
}
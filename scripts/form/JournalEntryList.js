import { useJournalEntries, getJournalEntries } from "./JournalDataProvider.js"
import { JournalEntryComponent } from "./JournalEntry.js"

const entryLog = document.querySelector("#entryLog")

export const EntryListComponent = () => {
    getJournalEntries()
        .then(() => {
            const entries = useJournalEntries()
            entryLog.innerHTML += entries.map(entry => JournalEntryComponent(entry)).join("")
        })
}
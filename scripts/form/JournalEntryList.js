import { useJournalEntries, getJournalEntries } from "./JournalDataProvider.js"
import { JournalEntryComponent } from "./JournalEntry.js"
import { useEntryTags, getEntryTags, getTags, useTags } from "../filter/TagProvider.js"

const eventHub = document.querySelector("main")

eventHub.addEventListener("journalStateChanged", event => {
    render(useJournalEntries(), useEntryTags(), useTags())
})

eventHub.addEventListener("moodChosen", event => {
    const journalEntries = useJournalEntries()

    const filteredEntries = journalEntries.filter(entry => entry.moodId === event.detail.moodSelected)
    render(filteredEntries, useEntryTags(), useTags())
})

export const EntryListComponent = () => {
    getJournalEntries()
        .then(getEntryTags)
        .then(getTags)
        .then(() => {
            render(useJournalEntries(), useEntryTags(), useTags())
        })
    
}

const render = (arrayOfEntries, arrayOfEntryTags, arrayOfTags) => {
    const entryLog = document.querySelector("#entryLog")
    let HTMLArray = arrayOfEntries.map(entry => {
        
        let entryTags = arrayOfEntryTags.filter(entryTag => {
            return entryTag.entryId === entry.id
        })

        entry.tags =[]
        
        entryTags.forEach(entryTag => {
            entry.tags.push(arrayOfTags.find(tag => tag.id === entryTag.tagId))
        })
        
        return JournalEntryComponent(entry)
    })

    entryLog.innerHTML = HTMLArray.join("")
}
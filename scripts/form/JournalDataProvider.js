let journal = []

const eventHub = document.querySelector("main")

const dispatchStateChangeEvent = () => {
    eventHub.dispatchEvent(new CustomEvent("journalStateChanged"))
}

export const useJournalEntries = () => {
    const sortedByDate = journal.sort(
        (currentEntry, nextEntry) =>
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
    )
    return sortedByDate
}

export const getJournalEntries = () => {
    return fetch("http://localhost:8088/entries?_expand=mood&_expand=instructor")
        .then(response => response.json())  
        .then(entries => {
            journal = entries
        })
}

export const saveJournalEntry = entryObj => {
    fetch("http://localhost:8088/entries", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entryObj)
    })
        .then(getJournalEntries) 
        .then(dispatchStateChangeEvent) 
}

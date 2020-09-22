import { useJournalEntries, deleteJournalEntry } from "./JournalDataProvider.js"

const eventHub = document.querySelector("main")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.classList[0] === "deleteBtn") {
        const listOfEntries = useJournalEntries()
        const entryToBeDeleted = listOfEntries.find(entry => {
            const [ buttonType, buttonNum ] = clickEvent.target.id.split("-")
            return parseInt(buttonNum) === entry.id
        })
        deleteJournalEntry(entryToBeDeleted)
    }
})

export const JournalEntryComponent = (entry) => {
    const tags = entry.tags
    return `
        <section id="entry--${entry.id}" class="journalEntry">
            <h3>${entry.concept}</h3>
                <p>${entry.date}</p>
                <p>${entry.entry}</p>
                <ul>${
                    tags.map(tag => `<li class="tag-${entry.id}">${tag.subject}</li>`).join("")
                }
                </ul>
                <p>This was a ${entry.mood.label} entry.</p>
                <p>${entry.instructor.first_name} ${entry.instructor.last_name} is so helpful!</p>
                <button type="button" class="editBtn" id="editBtn-${entry.id}">Edit Entry</button>
                <button type="button" class="deleteBtn" id="deleteBtn-${entry.id}">Delete Entry</button>
        </section>
    `
}
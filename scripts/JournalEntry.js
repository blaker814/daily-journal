/*
 *  Purpose: To render a single journal entry as an
 *           HTML representation of the data
 */
export const JournalEntryComponent = (entry) => {
    return `
        <section id="entry--${entry.id}" class="journalEntry">
            <h3>${entry.concept}</h3>
                <p>${entry.date}</p>
                <p>${entry.entry}</p>
                <p>This was a ${entry.mood} entry.</p>
        </section>
    `
}
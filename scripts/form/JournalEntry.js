export const JournalEntryComponent = (entry) => {
    return `
        <section id="entry--${entry.id}" class="journalEntry">
            <h3>${entry.concept}</h3>
                <p>${entry.date}</p>
                <p>${entry.entry}</p>
                <p>This was a ${entry.mood.label} entry.</p>
                <p>${entry.instructor.first_name} ${entry.instructor.last_name} is so helpful!</p>
        </section>
    `
}
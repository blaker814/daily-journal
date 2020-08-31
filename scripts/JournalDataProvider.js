const journal = [
    {
        id: 1,
        date: "08/10/2020",
        concept: "HTML & CSS",
        entry: "We talked about HTML components and how to make grid layouts with Flexbox in CSS.",
        mood: "Ok"
    },
    {
        id: 2,
        date: "08/12/2020",
        concept: "GitHub",
        entry: "We dove into GitHub and learned about it's functionality and work flow.",
        mood: "Happy"
    },
    {
        id: 3,
        date: "08/19/2020",
        concept: "JS Objects",
        entry: "We learned about JS objects and how to utilize them in creating material for our webpage",
        mood: "Happy"
    }
]

export const useJournalEntries = () => {
    const sortedByDate = journal.sort(
        (currentEntry, nextEntry) =>
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
    )
    return sortedByDate
}
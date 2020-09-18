import { useJournalEntries } from "../form/JournalDataProvider.js"

let tags = []
let entry;

const eventHub = document.querySelector("main")

export const useTags = () => tags.slice()


export const getTags = () => {
    return fetch("http://localhost:8088/tags")
        .then(response => response.json())  
        .then(parsedTags => {
            tags = parsedTags
        })
}

export const findTag = (subject) => {
    return fetch(`http://localhost:8088/tags?subject=${subject}`)
        .then(response => response.json())
}

export const saveTag = (tagObj) => {
    fetch("http://localhost:8088/tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tagObj)
    })
    .then(getTags)
    .then(() => {
        const allTags = useTags()
        const new_tag = allTags.find(tag => tag.subject === tagObj.subject)
        saveEntryTag(entry.id, new_tag.id)
    })
}

export const saveEntryTag = (entryId, tagId) => {
    const newEntryTag = {
        entryId: entryId,
        tagId: tagId
    }
    
    fetch("http://localhost:8088/entryTags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEntryTag)
    })
}

export const determineTags = tagArray => {
    const allEntries = useJournalEntries()
    entry = allEntries[allEntries.length-1]

    tagArray.forEach(tag => { 

        findTag(tag)  // tag variable will have a string value
        .then(matches => {  // `matches` variable value will be array of matching objects
            let matchingTag = null

            if (matches.length > 0) {
                matchingTag = matches[0].id
            }

            if (matchingTag === null) {
                // Tag doesn't exist. Create it then assign it to entry.
                const newTag = {
                    subject: tag
                }
                saveTag(newTag)
            }
            else {
                // Tag does exist. Assign it to entry.
                saveEntryTag(entry.id, matchingTag)
            }
        })
    })
}
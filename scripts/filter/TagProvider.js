let tags = []
let entryTags = []

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
    return fetch("http://localhost:8088/tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tagObj)
    })
    .then(getTags)
}

export const useEntryTags = () => entryTags.slice()

export const getEntryTags = () => {
    return fetch("http://localhost:8088/entryTags")
        .then(response => response.json())  
        .then(parsedEntryTags => {
            entryTags = parsedEntryTags
        })
}

export const saveEntryTag = (entryId, tagId) => {
    const newEntryTag = {
        entryId: entryId,
        tagId: tagId
    }   

    return fetch("http://localhost:8088/entryTags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEntryTag)
    })
}

export const deleteEntryTags = entryTagArray => {
    return Promise.all(entryTagArray.map(entryTag => {
        fetch(`http://localhost:8088/entryTags/${entryTag.id}`, {
        method: "DELETE"
        })
    }))
}
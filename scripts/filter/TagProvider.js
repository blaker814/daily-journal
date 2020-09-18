// let tags = []

// const eventHub = document.querySelector("main")

// const dispatchStateChangeEvent = () => {
//     eventHub.dispatchEvent(new CustomEvent("tagStateChanged"))
// }

// export const useTags = () => tags.slice()


// export const getTags = () => {
//     return fetch("http://localhost:8088/tags")
//         .then(response => response.json())  
//         .then(parsedTags => {
//             tags = parsedTags
//         })
// }

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
    }).then(response => response.json()).then(parsedTags => {
        return parsedTags[parsedTags.length-1]
    })
    // .then(getTags)
    // .then(dispatchStateChangeEvent)
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
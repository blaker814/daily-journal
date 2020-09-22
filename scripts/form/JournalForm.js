import { saveJournalEntry, useJournalEntries, updateJournalEntry } from "./JournalDataProvider.js"
import { useMoods, getMoods } from "./MoodProvider.js"
import { useInstructors, getInstructors } from "./InstructorProvider.js"
import { findTag, saveTag, saveEntryTag, useEntryTags, deleteEntryTags } from "../filter/TagProvider.js";

const eventHub = document.querySelector("main")
let tags = [];
let hiddenId;

eventHub.addEventListener("journalStateChanged", event => {
    if(tags !== [] && hiddenId) {
        const entryTags = useEntryTags()
        const entryTagsToBeDeleted = []
        entryTags.forEach(entryTag => {
            if (entryTag.entryId === parseInt(hiddenId))
                entryTagsToBeDeleted.push(entryTag)
        })

        if(entryTagsToBeDeleted.length > 0) {
            deleteEntryTags(entryTagsToBeDeleted)
                .then(() => {
                    determineTags(tags, parseInt(hiddenId))
                })
        } else {
            determineTags(tags, parseInt(hiddenId))
        }
    } else if (tags !== [] && !hiddenId) {
        const allEntries = useJournalEntries()
        const entry = allEntries[allEntries.length-1]
        determineTags(tags, entry.id)
    }
})

const determineTags = (tagArray, entryId) => {
    
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
                    .then(newTagArray => {
                        saveEntryTag(entryId, newTagArray[0].id)
                    })
            } else {
                saveEntryTag(entryId, matchingTag)
            }
        })
    })
}

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitEntry") {
        const contentTarget = document.querySelectorAll(".journalEntryInput")
        const entryMood = document.querySelector("#mood")
        const entryInstructor = document.querySelector("#instructor")

        if (contentTarget[1].value.length < 20 && entryMood.value !== "0" && entryInstructor.value !== "0") {
            
            replaceWords(clickEvent)

            const newJournalEntry = {
                date: contentTarget[0].value,
                concept: contentTarget[1].value,
                entry: contentTarget[2].value,
                moodId: parseInt(contentTarget[3].value),
                instructorId: parseInt(contentTarget[4].value)
            }
            const entryTags = document.querySelector("#tags")
            tags = entryTags.value.split(',')
            
            saveJournalEntry(newJournalEntry)

            const moods = useMoods()            
            const instructors = useInstructors()
            JournalFormComponent(moods, instructors)
            
         
        } else if (contentTarget[1].value.length > 20) {
            alert("Concepts covered field must be less than 20 characters long.")
        } else if (entryMood.value === "0") {
            alert("Please select a mood for this entry.")
        } else if (entryInstructor.value === "0"){
            alert("Please select an instructor for this entry.")
        }
    }
})

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.classList[0] === "editBtn") {
        const listOfEntries = useJournalEntries()
        const entryToBeEdited = listOfEntries.find(entry => {
            const [ buttonType, buttonNum ] = clickEvent.target.id.split("-")
            return parseInt(buttonNum) === entry.id
        })
        editJournalEntryForm(entryToBeEdited, useMoods(), useInstructors())
        window.location = "#journalForm"
    }
})

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveBtn") {
        
        replaceWords(clickEvent)

        const updatedEntry = {
            id: document.querySelector("#hiddenId").value,
            date: document.querySelector("#journalDate").value,
            concept: document.querySelector("#concepts").value,
            entry: document.querySelector("#entryForJournal").value,
            moodId: parseInt(document.querySelector("#mood").value),
            instructorId: parseInt(document.querySelector("#instructor").value)
        }
        const entryTags = document.querySelector("#tags")
        tags = entryTags.value.split(',')

        updateJournalEntry(updatedEntry)

        const moods = useMoods()            
        const instructors = useInstructors()
        JournalFormComponent(moods, instructors)
    }
})

const replaceWords = event => {
    //Prevent form submission to server 
    event.preventDefault();
    const conceptContent = document.getElementById('concepts');
    const entryContent = document.getElementById('entryForJournal');
    const censoredConcept = censor(conceptContent.value);
    const censoredEntry = censor(entryContent.value);
    conceptContent.value = censoredConcept;
    entryContent.value =  censoredEntry;
}

const censor = string => {
    // "i" is to ignore case and "g" for global "|" for OR match
    const regex = /crap|ugly|brat|fool|fuck|fucking|f\*cking|f\*ck|bitch|b\*tch|shit|sh\*t|fool|dumb|couch potato|arse|arsehole|asshole|\*ssh\*l\*|\*\*\*\*|c\*ck|\*\*\*\*sucker|c\*cks\*ck\*r|\*\*\*\*|c\*nt|dickhead|d\*c\*h\*a\*|\*\*\*\*|f\*c\*|\*\*\*\*wit|f\*ckw\*t|fuk|f\*k|fuking|f\*k\*ng|mother\*\*\*\*er|m\*th\*rf\*ck\*r|\*\*\*\*\*\*|n\*gg\*r|pussy|p\*ssy|\*\*\*\*|sh\*t|wanker|w\*nk\*r|wankers|w\*nk\*rs|whore|wh\*r\*|slag| sl\*g|\*\*\*\*\*|b\*tch|f u c k|f\*c\*|b.i.t.c.h|b\*tch|d-i-c-k|d\*\*\*/gi;
    return string.replace(regex, match => {
        //replace each letter with a star
        let stars = '';
        for (let i = 0; i < match.length; i++) {
            stars += '*';
        }
        return stars;
    });

}

export const JournalFormSelect = () => {

    getMoods()
        .then(getInstructors)
        .then(() => {
            const moods = useMoods();
            const instructors = useInstructors();
            JournalFormComponent(moods, instructors)
        })
}


export const JournalFormComponent = (allMoods, allInstructors) => {
    const contentTarget = document.querySelector("#journalForm")
    contentTarget.innerHTML = `
        <h2>Daily Journal</h2>
        <form action="">
            <fieldset>
                <label for="journalDate">Date of entry</label>
                <input type="date" name="journalDate" id="journalDate" class="journalEntryInput">
            </fieldset>    
            <fieldset>
                <label for="concepts">Concepts covered</label>
                <input type="text" name="concepts" id="concepts" class="journalEntryInput">
            </fieldset>
            <fieldset>
                <label for="tags">Entry tags separated by comma</label>
                <input type="text" name="tags" id="tags" placeholder="e.g. API,components,providers..."}>
            </fieldset>
            <fieldset>
                <label for="journalEntry">Journal Entry</label>
                <textarea id="entryForJournal" class="journalEntryInput" rows="10" cols="50"></textarea>
            </fieldset>
            <fieldset>
                <label for="mood">Mood for the day</label>
                <select id="mood" class="journalEntryInput">
                    <option value="0">Please select a mood...</option>
                    ${
                        allMoods.map(
                            mood => {
                                return `<option value="${mood.id}">${mood.label}</option>`
                            }
                        ).join("")
                    }
                </select>    
            </fieldset>
            <fieldset>
                <label for="instructor">Instructor that helped</label>
                <select id="instructor" class="journalEntryInput">
                    <option value="0">Please select an instructor...</option>
                    ${
                        allInstructors.map(
                            instructor => {
                                return `
                                <option value="${instructor.id}">${instructor.first_name} ${instructor.last_name}</option>
                                `
                            }
                        ).join("")
                    }
                </select>    
            </fieldset>
            <button type="button" id="submitEntry">Record Journal Entry</button> 
        </form>
    `
}

const editJournalEntryForm = (entry, allMoods, allInstructors) => {
    const contentTarget = document.querySelector("#journalForm")
    const tagTargets = document.querySelectorAll(`.tag-${entry.id}`)
    let tagArray = [];
    for (let tag of tagTargets) {
        tagArray.push(tag.textContent)
    }

    contentTarget.innerHTML = `
        <h2>Daily Journal</h2>
        <form action="">
        <input value="${entry.id}" id="hiddenId" hidden>
            <fieldset>
                <label for="journalDate">Date of entry</label>
                <input type="date" name="journalDate" id="journalDate" class="journalEntryInput" value="${entry.date}">
            </fieldset>    
            <fieldset>
                <label for="concepts">Concepts covered</label>
                <input type="text" name="concepts" id="concepts" class="journalEntryInput" value="${entry.concept}">
            </fieldset>
            <fieldset>
                <label for="tags">Entry tags separated by comma</label>
                <input type="text" name="tags" id="tags" value="${tagArray.join(",")}">
            </fieldset>
            <fieldset>
                <label for="journalEntry">Journal Entry</label>
                <textarea name="journalEntry" id="entryForJournal" class="journalEntryInput" rows="10" cols="50">${entry.entry}</textarea>
            </fieldset>
            <fieldset>
                <label for="mood">Mood for the day</label>
                <select id="mood" class="journalEntryInput">
                    <option value="0">Please select a mood...</option>
                    ${
                        allMoods.map(
                            mood => {
                                return `<option value="${mood.id}">${mood.label}</option>`
                            }
                        ).join("")
                    }
                </select>    
            </fieldset>
            <fieldset>
                <label for="instructor">Instructor that helped</label>
                <select id="instructor" class="journalEntryInput">
                    <option value="0">Please select an instructor...</option>
                    ${
                        allInstructors.map(
                            instructor => {
                                return `
                                <option value="${instructor.id}">${instructor.first_name} ${instructor.last_name}</option>
                                `
                            }
                        ).join("")
                    }
                </select>    
            </fieldset>
            <button type="button" id="saveBtn">Save</button> 
        </form>
    `
    document.querySelector("#mood").value = `${entry.moodId}`
    document.querySelector("#instructor").value = `${entry.instructorId}`
    tagArray = []
    hiddenId = entry.id
}
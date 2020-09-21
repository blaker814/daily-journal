import { saveJournalEntry, useJournalEntries } from "./JournalDataProvider.js"
import { useMoods, getMoods } from "./MoodProvider.js"
import { useInstructors, getInstructors } from "./InstructorProvider.js"
import { findTag, saveTag, saveEntryTag, determineTags } from "../filter/TagProvider.js"

const eventHub = document.querySelector("main")
let tags;

eventHub.addEventListener("journalStateChanged", event => {
    determineTags(tags)
})
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
                <input type="text" name="tags" id="tags" placeholder="e.g. API,components,providers...">
            </fieldset>
            <fieldset>
                <label for="journalEntry">Journal Entry</label>
                <textarea id="entryForJournal" class="journalEntryInput"></textarea>
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

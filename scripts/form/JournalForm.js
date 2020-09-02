export const JournalFormComponent = () => {
    const contentTarget = document.querySelector("#journalForm")
    contentTarget.innerHTML = `
        <h2>Daily Journal</h2>
        <form action="">
            <fieldset>
                <label for="journalDate">Date of entry</label>
                <input type="date" name="journalDate" id="journalDate">
            </fieldset>    
            <fieldset>
                <label for="concepts">Concepts covered</label>
                <input type="text" name="concepts" id="concepts">
            </fieldset>
            <fieldset>
                <label for="journalEntry">Journal Entry</label>
                <textarea></textarea>
            </fieldset>
            <fieldset>
                <label for="mood">Mood for the day</label>
                <select id="mood">
                    <option value="Happy">Happy</option>
                    <option value="Ok">Ok</option>
                    <option value="Sad">Sad</option>
                </select>    
            </fieldset>
            <input type="submit" value="Record Journal Entry">    
        </form>`
}
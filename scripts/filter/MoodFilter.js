export const MoodFilter = (allMoods) => {
    return `
        <fieldset class="fieldset">
            <legend>Filter Journal Entries by Mood</legend>
            <div>
            ${
                allMoods.map(
                    (mood) => {
                        return `<input type="radio" name="moodFilter" value="${mood.id}"/>
                        <label for="moodFilter--${mood.label}">${mood.label}</label>
                        `
                    }
                ).join("")
            }
            </div>
        </fieldset>
        `
}
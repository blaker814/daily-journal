import { MoodFilter } from "./MoodFilter.js"
import { useMoods, getMoods } from "../form/MoodProvider.js"

const eventHub = document.querySelector("main")
const contentTarget = document.querySelector(".filters")

export const FilterBar = () => {
    getMoods()
    .then(() => {
        const moodChoices = useMoods()
        render(moodChoices)
    })
}

const render = (moodsArray) => {
    contentTarget.innerHTML = `
        ${MoodFilter(moodsArray)}
    `
}

eventHub.addEventListener("change", changeEvent => {
    if (changeEvent.target.name === "moodFilter") {
        const allMoods = useMoods()
        const moodObj = allMoods.find(mood => mood.id === parseInt(changeEvent.target.value))
        
        const moodEvent = new CustomEvent("moodChosen", {
            detail: {
                moodSelected: moodObj.id
            }
        })

        eventHub.dispatchEvent(moodEvent)

    }
})
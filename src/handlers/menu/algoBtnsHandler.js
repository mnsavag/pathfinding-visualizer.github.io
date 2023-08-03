import { Algorithm } from "/src/models/algorithms/algorithm.js"
import { BFS } from "/src/models/algorithms/bfs.js"
import { clearPath } from "/src/handlers/menu/clearButtonsHandlers.js"
import { onDisableInteraction, offDisableInteraction } from "/src/handlers/menu/disableInteraction.js"

const visualiseBtn = document.getElementById("visualise")

let currAlgorithmState
const algorithmState = Object.freeze({
    BFS: BFS,
})


function registerBFSBtn() {
    /* BFS Button */
    const bfsBtn = document.getElementById("BFS")
    bfsBtn.addEventListener("click", () => {
    visualiseBtn.innerHTML = "Visualise BFS!"
    
    currAlgorithmState = algorithmState.BFS
    })
    /* BFS Button */
}

function registerVisualiseBtn(map) {
    /* Visualise Button */
    const visualiseBtn = document.getElementById("visualise")
    visualiseBtn.addEventListener("click", async () => {
        // add decorator
        onDisableInteraction()
        clearPath()
        await currAlgorithmState.search(map)
        offDisableInteraction()
    })
    /* Visualise Button */
}


export function registerAlgorithmsBtn(map) {
    /* General Button */
    registerBFSBtn()
    registerVisualiseBtn(map)
}
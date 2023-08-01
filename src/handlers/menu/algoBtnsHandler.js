import { Algorithm } from "/src/models/algorithms/algorithm.js"
import { BFS } from "/src/models/algorithms/bfs.js"

const visualiseSpan = document.getElementById("visualise-span")

let currProgrammState
const programmStates = Object.freeze({
    BFS: BFS,
})


function registerBFSBtn() {
    /* BFS Button */
    const bfsBtn = document.getElementById("BFS")
    bfsBtn.addEventListener("click", () => {
    visualiseSpan.innerHTML = " BFS!"
    currProgrammState = programmStates.BFS
    })
    /* BFS Button */
}

function registerVisualiseBtn(map) {
    /* Visualise Button */
    const visualiseBtn = document.getElementById("visualise")
    visualiseBtn.addEventListener("click", () => {
        currProgrammState.search(map)
    })
    /* Visualise Button */
}


export function registerAlgorithmsBtn(map) {
    /* General Button */
    registerBFSBtn()
    registerVisualiseBtn(map)
}
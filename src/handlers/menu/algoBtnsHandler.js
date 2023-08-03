import { Algorithm } from "/src/models/algorithms/algorithm.js"
import { BFS } from "/src/models/algorithms/bfs.js"

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
    visualiseBtn.addEventListener("click", () => {
        currAlgorithmState.search(map)
    })
    /* Visualise Button */
}


export function registerAlgorithmsBtn(map) {
    /* General Button */
    registerBFSBtn()
    registerVisualiseBtn(map)
}
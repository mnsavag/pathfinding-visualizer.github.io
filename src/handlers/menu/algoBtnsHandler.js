import { Algorithm } from "/src/models/algorithms/algorithm.js"
import { BFS } from "/src/models/algorithms/bfs.js"
import { DFS } from "/src/models/algorithms/dfs.js"
import { Dijkstra } from "/src/models/algorithms/dijkstra.js"
import { clearPath } from "/src/handlers/menu/clearButtonsHandlers.js"
import { onDisableInteraction, offDisableInteraction } from "/src/handlers/menu/disableInteraction.js"
import { BidirectBFS } from "/src/models/algorithms/bidirectBFS.js"
import { AStar } from "/src/models/algorithms/aStar.js"


let currAlgorithm
const algorithmState = Object.freeze({
    BFS: BFS,
    DFS: DFS,
    Dijkstra: Dijkstra,
    BidirectBFS: BidirectBFS,
    AStar: AStar
})
let algorithmsData = []
const visualiseBtn = document.getElementById("visualise")


export function registerAlgorithmBtns(map) {
    registerAlgorithms()
    registerVisualiseBtn(map)
}

function registerAlgorithms() {
    algorithmsData = [ { id: "BFS", name: "Visualise BFS!", method: algorithmState.BFS},
                        { id: "DFS", name: "Visualise DFS!", method: algorithmState.DFS},
                        {id: "Dijkstra", name: "Visualise Dijkstra!", method: algorithmState.Dijkstra},
                        {id: "Bidirectional", name: "Visualise Bidirect!", method: algorithmState.BidirectBFS},
                        { id: "A*", name: "Visualise A*!", method: algorithmState.AStar}
                    ]

    algorithmsData.forEach(element => {
        const btn = document.getElementById(element.id)
        btn.addEventListener("click", () => {
            currAlgorithm = element.method
            visualiseBtn.innerHTML = element.name
        })
    });
}

function registerVisualiseBtn(map) {
    visualiseBtn.addEventListener("click", async () => {
        // add decorator
        if (hasAlgorithm()) {
            onDisableInteraction()
            clearPath()
            await currAlgorithm.search(map)
            offDisableInteraction()
        }
    })
}

function hasAlgorithm() {
    return algorithmsData.find(obj => {
        if (obj.name === visualiseBtn.innerHTML) {
            return true
        }
    })
}




import { Algorithm } from "../algorithms/algorithm.js"
import { BFS } from "../algorithms/bfs.js"
import { DFS } from "../algorithms/dfs.js"
import { Dijkstra } from "../algorithms/dijkstra.js"
import { BidirectBFS } from "../algorithms/bidirectBFS.js"
import { AStar } from "../algorithms/aStar.js"
import { clearPath } from "./menu/clearBtns.js"
import { onDisableInteraction, offDisableInteraction } from ".../miscellaneous/disableInteraction.js"


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
        if (hasAlgorithm()) {
            clearPath()
            onDisableInteraction()
            await Algorithm.search(currAlgorithm.search, map)
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

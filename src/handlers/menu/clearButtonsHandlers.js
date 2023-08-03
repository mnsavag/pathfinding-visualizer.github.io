import { cellStates } from "/src/models/cellStates.js"

export function addClearWallEvent() {
    const clearWallBtn = document.getElementById("clear-wall")
    clearWallBtn.addEventListener("click", () => {
        clearWall()
    });
}

export function addClearPathEvent() {
    const clearPathBtn = document.getElementById("clear-path")
    clearPathBtn.addEventListener("click", () => {
        clearPath()
    });
}

export function addClearBoardEvent(map, ...mapObjects) {
    const clearPathBtn = document.getElementById("clear-board")
    clearPathBtn.addEventListener("click", () => {
        clearPath()
        clearWall()
    })
}

export function clearPath() {
    let shortestPathBlocks = document.querySelectorAll(".path-animation")
    shortestPathBlocks.forEach(block => {
        block.remove()
    })

    let pathBlocks = document.querySelectorAll(".div-animation")
    pathBlocks.forEach(block => {
        block.remove()
    })

    let visitedBlocks = document.querySelectorAll("." + cellStates.VISITED)
    visitedBlocks.forEach(block => {
        block.className = cellStates.UNVISITED
    })
}

function clearWall() {
    const wallBlocks = document.querySelectorAll("." + cellStates.WALL)
    wallBlocks.forEach(block => {
        block.className = cellStates.UNVISITED
    })
}

import { cellStates } from "/src/models/cellStates.js"

export function animateCellSpawn (cellSelector) {
    const divAnimation = document.createElement("div")
    divAnimation.setAttribute("class", "div-animation") // поменять название
    
    if (cellSelector.className === cellStates.UNVISITED) {
        cellSelector.className = cellStates.VISITED
    }

    if (!cellSelector.hasChildNodes()) {
        cellSelector.appendChild(divAnimation)
    }
}

export function animateCellPath(cellSelector) {
    if (cellSelector.className === cellStates.START)
        return

    const divAnimation = document.createElement("div")
    divAnimation.setAttribute("class", "path-animation")
    cellSelector.appendChild(divAnimation)
}
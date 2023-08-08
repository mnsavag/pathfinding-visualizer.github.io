import { cellStates } from "/src/models/cellStates.js"
import { getDOMElement } from "/src/miscellaneous/utility.js"

export function createCellTag(cell) {
    const cellDOM = getDOMElement("td", cell.idDOM, cell.state)
    return cellDOM
}

export function registerAnimateEvents(map) {
    map.forEach(row => {
        row.forEach(cell => {
            cell.DOM.addEventListener("cellSpawnEvent", animateCellSpawn)
            cell.DOM.addEventListener("cellPathEvent", animateCellPath)
        })
    });
}


function animateCellSpawn (event) {
    let cellSelector = event["props"]

    const divAnimation = document.createElement("div")
    divAnimation.setAttribute("class", "div-animation")
    
    if (cellSelector.className === cellStates.UNVISITED)
        cellSelector.className = cellStates.VISITED

    if (!cellSelector.classList.contains(cellStates.START) && !cellSelector.classList.contains(cellStates.FINISH))
        cellSelector.appendChild(divAnimation)
}

function animateCellPath(event) {
    let cellSelector = event["props"]

    if (cellSelector.className === cellStates.START)
        return

    const divAnimation = document.createElement("div")
    divAnimation.setAttribute("class", "path-animation")
    cellSelector.appendChild(divAnimation)
}

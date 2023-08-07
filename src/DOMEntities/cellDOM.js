import { cellStates } from "/src/models/cellStates.js"

export function createCellTag(cell) {
    const DOM = document.createElement("td")
    let id = document.createAttribute("id")
    id.value = cell.idDOM
    DOM.setAttributeNode(id)
    DOM.className = cell.state
    return DOM
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
    divAnimation.setAttribute("class", "div-animation") // поменять название
    
    if (cellSelector.className === cellStates.UNVISITED) { // вынести в отдельную функцию для понятного чтения кода и правильной смены классов
        // mapObject класс не может быть убран
        cellSelector.className = cellStates.VISITED
    }

    if (!cellSelector.classList.contains(cellStates.START) && !cellSelector.classList.contains(cellStates.FINISH)) {
        cellSelector.appendChild(divAnimation)
    }
}

function animateCellPath(event) {
    let cellSelector = event["props"]

    if (cellSelector.className === cellStates.START)
        return

    const divAnimation = document.createElement("div")
    divAnimation.setAttribute("class", "path-animation")
    cellSelector.appendChild(divAnimation)
}

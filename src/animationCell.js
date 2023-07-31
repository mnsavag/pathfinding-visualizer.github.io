export function animateCellSpawn (cellSelector) {
    const divAnimation = document.createElement("div")
    divAnimation.setAttribute("class", "div-animation") // поменять название
    
    if (!cellSelector.hasChildNodes()) {
        cellSelector.appendChild(divAnimation)
    }
}

export function animateCellPath(cellSelector) {
    const divAnimation = document.createElement("div")
    divAnimation.setAttribute("class", "path-animation")
    while (cellSelector.firstChild) {
        cellSelector.removeChild(cellSelector.firstChild);
    }
    cellSelector.appendChild(divAnimation)

}
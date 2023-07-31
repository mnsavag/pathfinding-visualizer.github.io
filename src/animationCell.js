export function aminationCell (cellSelector) {
    const divAnimation = document.createElement("div")
    divAnimation.setAttribute("class", "div-animation")
    
    if (!cellSelector.hasChildNodes()) {
        cellSelector.appendChild(divAnimation)
    }
}
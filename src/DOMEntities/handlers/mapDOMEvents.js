import { cellStates } from ".../models/cellStates.js"


export function registerMapDOMHandlersEvent(mapSelector) {
    addDraggableEvent(mapSelector)
    addWallEvent(mapSelector)
}

function addDraggableEvent(mapSelector) {
    const dragList = getNodesWithMapObject(mapSelector)
    
    dragList.forEach(draggable => {
        draggable.mapObj.addEventListener("dragstart", () => {
            draggable.cellTag.className = "unvisited"
            draggable.mapObj.classList.add("dragging")
        } )
    })

    dragList.forEach(draggable => {
        draggable.mapObj.addEventListener("dragend", () => {
            draggable.cellTag = draggable.mapObj.parentElement
            draggable.cellTag.className = draggable.tagClass
            draggable.mapObj.classList.remove("dragging")
            
        })
    })

    for (const row of mapSelector.childNodes) {
        for (const node of row.childNodes) {
            node.addEventListener("drop", () => {
                if (node.className == cellStates.UNVISITED) {
                    const draggable = document.querySelector(".dragging")
                    node.appendChild(draggable)
                }
            })
        }
    }

    for (const row of mapSelector.childNodes) {
        for (const node of row.childNodes) {
            node.addEventListener("dragover", event => {
                event.preventDefault()
            })
        }
    }
}

function getNodesWithMapObject(mapSelector) {
    const dragList = []
    for (const row of mapSelector.childNodes) {
        for (const node of row.childNodes) {
            if (node.querySelector("." + cellStates.OBJECT)) {
                const draggable = node.querySelector("." + cellStates.OBJECT)
                dragList.push(
                    {
                        cellTag: node, 
                        tagClass: node.className,
                        mapObj: draggable
                    })
            }
        }
    }
    return dragList
}


function addWallEvent(mapSelector) {
    let isMouseDown = false

    mapSelector.childNodes.forEach(row => {
        row.childNodes.forEach(cell => {
            cell.addEventListener("mousedown", () => {
                if (cell.className !== cellStates.START &&
                    cell.className !== cellStates.FINISH &&
                    cell.className === cellStates.UNVISITED
                    ) {
                    isMouseDown = true
                }
            })

            cell.addEventListener("mouseup", () => {
                isMouseDown = false
            })

            const eventList = ["mouseover", "click"]
            eventList.forEach(event => {
                cell.addEventListener(event, () => {
                    if ((event == "click" || isMouseDown) && 
                        cell.className !== cellStates.START &&
                        cell.className !== cellStates.FINISH &&
                        cell.className === cellStates.UNVISITED
                        ) {
                        cell.className = cellStates.WALL
                    }
                    else if (event == "click" && cell.className === cellStates.WALL) {
                        cell.className = cellStates.UNVISITED
                    }
                })
            })
        })
    });
}
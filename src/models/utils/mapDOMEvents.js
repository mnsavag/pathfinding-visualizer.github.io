import { cellStates } from "/src/models/cellStates.js"


export function addDraggableEvent(mapSelector) {
    const dragList = []
    for (const row of mapSelector.childNodes) {
        for (const node of row.childNodes) {
            if (node.querySelector("." + cellStates.OBJECT)) {
                const draggable = node.querySelector("." + cellStates.OBJECT)
                dragList.push(
                    {
                        cell: node, 
                        cellStateName: node.className,
                        obj: draggable
                    })
            }
        }
    }
    
    dragList.forEach(draggable => {
        draggable.obj.addEventListener("dragstart", () => {
            draggable.cell.className = "unvisited"
            draggable.obj.classList.add("dragging")
        } )
    })

    dragList.forEach(draggable => {
        draggable.obj.addEventListener("dragend", (e) => {
            draggable.cell = draggable.obj.parentElement
            draggable.cell.className = draggable.cellStateName
            draggable.obj.classList.remove("dragging")
            
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


export function addWallEvent(mapSelector) {
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
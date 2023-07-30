import { cellStates } from "./cellStates.js";


export class CellStateHandler {
    static addWallState(mapArray) {
        let isMouseDown = false

        mapArray.forEach(row => {
            row.forEach(cell => {
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
}
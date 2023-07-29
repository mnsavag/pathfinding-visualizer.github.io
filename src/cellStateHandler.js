import { cellStates } from "./cellStates.js";


export class CellStateHandler {
    static addWallState(mapArray) {
        let isMouseDown = false

        mapArray.forEach(row => {
            row.forEach(cell => {
                cell.addEventListener("mousedown", event => {
                    if (cell.className == cellStates.UNVISITED) {
                        isMouseDown = true
                    }
                })

                cell.addEventListener("mouseup", () => {
                    isMouseDown = false
                })

                const eventList = ["mouseover", "click"]

                eventList.forEach(event => {
                    cell.addEventListener(event, () => {
                        if ((event == "click" || isMouseDown) && cell.className == cellStates.UNVISITED) {
                            cell.className = cellStates.WALL
                        }
                    })
                })
            })
        });

    }
}
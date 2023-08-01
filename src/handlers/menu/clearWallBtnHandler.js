import { cellStates } from "/src/models/cellStates.js"


export function addClearWallEvent(mapArray) {
    const clearWallBtn = document.querySelector("#clear-wall")
    clearWallBtn.addEventListener("click", () => {
        mapArray.forEach(row => {
            row.forEach(cell => {
                if (cell.className === cellStates.WALL) {
                    cell.className = cellStates.UNVISITED
                }
                })
            })
        });
}

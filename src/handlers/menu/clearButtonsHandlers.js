import { cellStates } from "/src/models/cellStates.js"


export function addClearWallEvent(map) {
    const clearWallBtn = document.getElementById("clear-wall")
    clearWallBtn.addEventListener("click", () => {
        map.forEach(row => {
            row.forEach(cell => {
                if (cell.className === cellStates.WALL) {
                    cell.className = cellStates.UNVISITED
                }
            })
        })
    });
}

export function addClearPathEvent(map) {
    const clearPathBtn = document.getElementById("clear-path")
    clearPathBtn.addEventListener("click", () => {
        map.forEach(row => {
            row.forEach(cell => {
                if (cell.className === cellStates.VISITED) {
                    cell.className = cellStates.UNVISITED
                }
                while (cell.firstChild && cell.firstChild.className !== cellStates.OBJECT) {
                    cell.removeChild(cell.firstChild);
                }
            })
        })
    });
}
import { Cell } from "./Cell.js"
import { CellStates } from "./CellStates.js"

export class Grid {
    constructor(xCellCnt, yCellCnt) {
        this.cells = []
        this.xCellCnt = xCellCnt
        this.yCellCnt = yCellCnt
    }

    initCells() {
        for (let i = 0; i < this.yCellCnt; i++) {
            let row = []
            for (let j = 0; j < this.xCellCnt; j++) {
                row.push(new Cell(j, i, CellStates.UNVISITED))
            }
            this.cells.push(row)
        }
    }
}

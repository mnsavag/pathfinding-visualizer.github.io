import { getGreatestMultiple } from "../Utility.js"
import { CellView } from "./CellView.js"

export class GridView {
    constructor(tableSelector, gridObject) {
        this.gridView = tableSelector
        this.gridObj = gridObject
    }

    renderGrid(rowTag, cellTag) {
        this.resizeGridView()
        for (let y = 0; y < this.gridObj.yCellCnt; y++) {
            const row = document.createElement(rowTag)
            for (let x = 0; x < this.gridObj.xCellCnt; x++) {
                const cell = CellView.getCellDOM(cellTag, `${y} ${x}`, this.gridObj.cells[y][x].state);
                row.appendChild(cell)
            }
            this.gridView.appendChild(row)
        }
    }

    resizeGridView() {
        // change later
        this.gridView.style.height = this._getResizeSideInPX(document.documentElement.clientHeight - 50 - 80, this.gridObj.yCellCnt)
        this.gridView.style.width = this._getResizeSideInPX(document.documentElement.clientWidth, this.gridObj.xCellCnt)
    }

    _getResizeSideInPX(availableLen, cellCnt) {
        let len = getGreatestMultiple(availableLen, cellCnt)
        return (len - len / cellCnt).toString() + "px"
    }
}

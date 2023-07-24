import { createDOMWithId, getGreatestMultiple } from "./utility.js"


class Grid {
    constructor(tableTag, xCellCnt, yCellCnt) {
        this.grid = tableTag
        this.xCellCnt = xCellCnt
        this.yCellCnt = yCellCnt
        
        this.createGridDOM()

        window.addEventListener("resize", () => requestAnimationFrame(this.resizeGrid.bind(this)))
    }

    createGridDOM() {
        this.resizeGrid()
        for (let x = 0; x < this.yCellCnt; x++) {
            const row = createDOMWithId("tr", x)
            for (let y = 0; y < this.xCellCnt; y++) {
                const cell = createDOMWithId("td", `${x} ${y}`);
                row.appendChild(cell)
            }
            this.grid.appendChild(row)
        }
    }

    resizeGrid() {
        this.grid.style.height = this.getResizeSideInPX(document.documentElement.clientHeight - 50 - 80, this.yCellCnt)
        this.grid.style.width = this.getResizeSideInPX(document.documentElement.clientWidth, this.xCellCnt)
    }

    getResizeSideInPX(availableLen, cellCnt) {
        let len = getGreatestMultiple(availableLen, cellCnt)
        return (len - len / cellCnt).toString() + "px"
    }
}

const gridSelector = document.querySelector(".grid")
const grid = new Grid(gridSelector, 64, 23)

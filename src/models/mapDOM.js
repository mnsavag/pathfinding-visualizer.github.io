import { getDOMElement, getGreatestMultiple } from "/src/utility.js"
import { cellStates } from "/src/models/cellStates.js"

/* Класс на основе таблицы */
export class MapDOM {
    constructor(tableSelector, xCnt, yCnt) {
        this._mapSelector = tableSelector
        this.xCnt = xCnt
        this.yCnt = yCnt
    }

    createMapDOM() {
        this.resizeMapDOM()
        for (let y = 0; y < this.yCnt; y++) {
            const row = document.createElement("tr")
            for (let x = 0; x < this.xCnt; x++) {
                const cell = getDOMElement("td", `${y} ${x}`, cellStates.UNVISITED); 
                row.appendChild(cell)
            }
            this._mapSelector.appendChild(row)
        }
        this.resizeMapDOM()
    }
 
    resizeMapDOM() {
        // change later
        const header = document.querySelector(".header")
        const sectionTool = document.querySelector(".section")
        const headerHeight = getComputedStyle(header).height.slice(0, -2) // можно в метод вынести
        const sectionToolHeight = getComputedStyle(sectionTool).height.slice(0, -2)

        this._mapSelector.style.height = this._getResizeSideInPX(document.documentElement.clientHeight - headerHeight - sectionToolHeight, this.xCnt)
        this._mapSelector.style.width = this._getResizeSideInPX(document.documentElement.clientWidth, this.yCnt)
    }

    _getResizeSideInPX(availableLen, cellCnt) {
        return getGreatestMultiple(availableLen, cellCnt).toString() + "px"
    }

    getMapSelector() {
        return this._mapSelector
    }
}

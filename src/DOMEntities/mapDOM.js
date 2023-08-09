import { getGreatestMultiple, getSelectorHeight } from "../miscellaneous/utility.js"
import { createCellTag } from "./cellDOM.js"


export class MapDOM {
    constructor(map) {
        this.xCnt = map[0].length
        this.yCnt = map.length

        const tableTag = document.createElement("table")
        tableTag.setAttribute("class", "grid")

        this._mapSelector = tableTag
    }

    createMapDOM(map) {
        document.body.appendChild(this._mapSelector)

        for (const row of map) {
            let rowDOM = document.createElement("tr")
            for (const cell of row) {
                const cellDOM = createCellTag(cell)
                cell.DOM = cellDOM
                rowDOM.appendChild(cellDOM)
            }
            this._mapSelector.appendChild(rowDOM)
        }
        this.resizeMapDOM()
    }
 
    resizeMapDOM() {
        const headerHeight = getSelectorHeight(".header")
        const sectionToolHeight = getSelectorHeight(".section")

        this._mapSelector.style.height = this._getResizeSideInPX(document.documentElement.clientHeight - headerHeight - sectionToolHeight, this.xCnt)
        this._mapSelector.style.width = this._getResizeSideInPX(document.documentElement.clientWidth, this.yCnt)
    }

    _getResizeSideInPX(availableLen, cellCnt) {
        return getGreatestMultiple(availableLen, cellCnt).toString() + "px"
    }

    getMapSelector() {
        return this._mapSelector
    }

    addMapObjectEventListener() {
        for (const row of this._mapSelector.childNodes) {
            for (const cell of row.childNodes) {
                cell.addEventListener("addObject", (event) => {
                    const currCell = event.target 
                    currCell.className = event["mapObject"].cellClass
                    currCell.appendChild(event["mapObject"].getDOMView())
                })
            }
        }
    }
}

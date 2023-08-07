import { getDOMElement, getGreatestMultiple } from "/src/utility.js"
import { cellStates } from "/src/models/cellStates.js"
import { createCellTag } from "./cellDOM.js"


/* Класс на основе таблицы */
export class MapDOM {
    constructor() {
        this._mapSelector
        this.xCnt
        this.yCnt
    }

    createMapDOM(map) {
        const tableTag = document.createElement("table") // сделать более читабельным
        tableTag.setAttribute("class", "grid")
        document.body.appendChild(tableTag)
        this._mapSelector = tableTag
        this.xCnt = map[0].length
        this.yCnt = map.length
        
        this.resizeMapDOM()
        map.forEach(row => {
            let rowDOM = document.createElement("tr")
            row.forEach(cell => {
                const cellDOM = createCellTag(cell)
                cell.DOM = cellDOM

                rowDOM.appendChild(cellDOM)
            })
            this._mapSelector.appendChild(rowDOM)
        });
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

    addMapObjectEventListener() {
        this._mapSelector.childNodes.forEach(row => {
            row.childNodes.forEach(cell => {
                cell.addEventListener("addObject", (event) => {
                    const currCell = event.target 
                    currCell.className = event["mapObject"].cellClass
                    currCell.appendChild(event["mapObject"].getDOMView())
                })
            })
        })
    }
}

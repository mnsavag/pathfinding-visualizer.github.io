import { getDOMElement, getGreatestMultiple } from "./utility.js"
import { cellStates } from "./cellStates.js"

export class MapView {
    constructor(tableSelector, xCellCnt, yCellCnt) {
        this.mapView = tableSelector
        this._map = []
        this.xCellCnt = xCellCnt
        this.yCellCnt = yCellCnt
    }

    createMapView(rowTag, cellTag) {
        this.resizeMapView()
        for (let y = 0; y < this.yCellCnt; y++) {
            const row = document.createElement(rowTag)
            for (let x = 0; x < this.xCellCnt; x++) {
                const cell = getDOMElement(cellTag, `${y} ${x}`, cellStates.UNVISITED); 
                row.appendChild(cell)
            }
            this.mapView.appendChild(row)
        }
        this.resizeMapView()
    }

    resizeMapView() {
        // change later
        this.mapView.style.height = this._getResizeSideInPX(document.documentElement.clientHeight - 50 - 80, this.xCellCnt)
        this.mapView.style.width = this._getResizeSideInPX(document.documentElement.clientWidth, this.yCellCnt)
        //for (const row of this.mapView.childNodes) {
        //    for (const cell of row.childNodes) {
        //        cell.style.width = this.mapView.style.width / (this.xCellCnt - 1)
        //        cell.style.height = this.mapView.style.height / (this.yCellCnt - 1)
        //    }
        //}
    }

    _getResizeSideInPX(availableLen, cellCnt) {
        let len = getGreatestMultiple(availableLen, cellCnt)
        return (len - len / cellCnt).toString() + "px"
    }

    initArrayMap() {
        for (const rowMapView of this.mapView.childNodes) {
            const row = []
            for (const cell of rowMapView.childNodes) {
                row.push(cell)
            }
            this._map.push(row)
        }
    }

    getArrayMap() { // просто для удобного синтаксиса
        return this._map
    }

    addObject(mapObj) {
       this._map[mapObj.y][mapObj.x].className = mapObj.cellClass
       this._map[mapObj.y][mapObj.x].appendChild(mapObj.getDOMView())
    }
}
import { getDOMElement, getGreatestMultiple } from "../utility.js"
import { cellStates } from "/src/models/cellStates.js"

/* Интерфейс для работы с тегом table (DOM) */
export class Map {
    constructor(mapSelector) {
        this._map = []
        this._initArrayMap(mapSelector)
    }

    _initArrayMap(mapSelector) {
        for (const rowMapView of mapSelector.childNodes) {
            const row = []
            for (const cell of rowMapView.childNodes) {
                row.push(cell)
            }
            this._map.push(row)
        }
    }
    
    addObject(y, x, mapObj) {
        this._map[y][x].className = mapObj.cellClass
        this._map[y][x].appendChild(mapObj.getDOMView())
    }

    getMap() {
        return this._map
    }
}

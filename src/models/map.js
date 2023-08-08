import { cellStates } from "./models/cellStates.js"
import { Cell } from "./models/cell.js"

export class Map {
    constructor(xCnt, yCnt) {
        this._map = []
        this.xCnt = xCnt
        this.yCnt = yCnt
        this._initMap()
    }
    
    _initMap() {
        for (let y = 0; y < this.yCnt; y++) {
            const row = []
            for (let x = 0; x < this.xCnt; x++) {
                const cell = new Cell(y, x, cellStates.UNVISITED) 
                row.push(cell)
            }
            this._map.push(row)
        }
    }
    
    addObject(y, x, mapObj) {
        let addEvent = new Event("addObject") // make by enum
        addEvent["mapObject"] = mapObj
        this._map[y][x].DOM.dispatchEvent(addEvent)
    }

    getMap() {
        return this._map
    }
}

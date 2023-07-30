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
    }

    _getResizeSideInPX(availableLen, cellCnt) {
        let len = getGreatestMultiple(availableLen, cellCnt)
        // OLD return (len - len / cellCnt).toString() + "px"
        return len.toString() + "px"
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

    addObject(y, x, mapObj) {
       this._map[y][x].className = mapObj.cellClass
       this._map[y][x].appendChild(mapObj.getDOMView())
    }
    
    
    addDraggableEvent() {
        const dragList = []
        for (let i = 0; i < this._map.length; i++) {
            for (let j = 0; j < this._map[i].length; j++){
                if (this._map[i][j].querySelector(".mapObject")) {
                    const dragObj = this._map[i][j].querySelector(".mapObject")
                    dragList.push({cell: this._map[i][j], 
                                cellStateName: this._map[i][j].className,
                                obj: dragObj}) // переделать потом как-нибудь, что в клетке мог быть только 1
                }
            }
        }
        
        dragList.forEach(draggable => {
            draggable.obj.addEventListener("dragstart", () => {
                draggable.cell.className = "unvisited"
                draggable.obj.classList.add("dragging")
            } )
        })
    
        dragList.forEach(draggable => {
            draggable.obj.addEventListener("dragend", (e) => {
                draggable.cell = draggable.obj.parentElement
                draggable.cell.className = draggable.cellStateName
                draggable.obj.classList.remove("dragging")
                
            })
        })
    
        for (let i = 0; i < this._map.length; i++) {
            for (let j = 0; j < this._map[i].length; j++){
                this._map[i][j].addEventListener("drop", e => {
                    if (this._map[i][j].className == cellStates.UNVISITED) {
                        const draggable = document.querySelector(".dragging")
                        this._map[i][j].appendChild(draggable)
                }
                })
            }
        }

        for (let i = 0; i < this._map.length; i++) {
            for (let j = 0; j < this._map[i].length; j++){
                this._map[i][j].addEventListener("dragover", event => {
                    event.preventDefault()
                })
            }
        }
    }
}
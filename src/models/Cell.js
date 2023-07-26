export class Cell {
    constructor(x, y, cellState) {
        this._x = x
        this._y = y
        this.id = `${x} ${y}`
        this.state = cellState
    }
}

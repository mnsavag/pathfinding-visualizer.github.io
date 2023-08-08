export class Cell {
    constructor(y, x, state) {
        this.y = y
        this.x = x
        this.state = state
        
        this.idDOM = `${y} ${x}`
        this.DOM
    }

    animateCellSpawn() {
        let event = new Event("cellSpawnEvent") // make by enum
        event["props"] = this.DOM
        this.DOM.dispatchEvent(event)
    }

    animateCellPath() {
        let event = new Event("cellPathEvent")
        event["props"] = this.DOM
        this.DOM.dispatchEvent(event)
    }
}
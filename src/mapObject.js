import { getDOMElement } from "./utility.js"


export class MapObject {
    constructor(x, y, cellClass, logo) {
        this.x = x
        this.y = y
        this.cellClass = cellClass
        this.logo = logo
    }

    getDOMView() {
        const image = document.createElement("img")
        image.classList.add("mapObject")
        image.src = this.logo
        return image
    }
}

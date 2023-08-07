export class MapObject {
    constructor(cellClass, logo) {
        this.cellClass = cellClass
        this.logo = logo
    }

    getDOMView() { // тоже в DOM кинуть
        const image = document.createElement("img")
        image.classList.add("mapObject")
        image.src = this.logo
        return image
    }
}

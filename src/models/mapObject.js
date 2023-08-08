export class MapObject {
    constructor(cellClass, logo) {
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

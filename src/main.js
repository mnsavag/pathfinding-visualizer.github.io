import { MapView} from "./mapView.js"
import { cellStates } from "./cellStates.js"
import { MapObject } from "./mapObject.js"

const xCellCnt = 64
const yCellCnt = 23


/* Разделить на 2 метода, отображение DOM и получение массива на основе DOM
    Добавить старт, финиш и drag and drops
*/

function main() {
    const mapView = new MapView(document.querySelector(".grid"), xCellCnt, yCellCnt)
    mapView.createMapView("tr", "td")
    window.addEventListener("resize", () => requestAnimationFrame(mapView.resizeMapView.bind(mapView)))

    mapView.initArrayMap()

    const player = new MapObject(cellStates.START, "../img/node-start.png")
    mapView.addObject(15, 12, player)

    const finish = new MapObject(cellStates.FINISH, "../img/node-finish.png")
    mapView.addObject(6, 46, finish)

    mapView.addDraggableEvent()
}

main()

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

    const player = new MapObject(12, 15, cellStates.START, "../img/node-start.png")
    mapView.addObject(player)

    const finish = new MapObject(46, 6, cellStates.FINISH, "../img/node-finish.png")
    mapView.addObject(finish)
}

main()

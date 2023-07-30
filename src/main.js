import { MapView} from "./mapView.js"
import { cellStates } from "./cellStates.js"
import { MapObject } from "./mapObject.js"
import { CellStateHandler } from "./cellStateHandler.js"
import { preventSelection } from "./disableSelection.js"
import { addClearWallEvent } from "./menuBtn/clearWallBtn.js"
import { registerAlgorithmsBtn } from "./menuBtn/algorithmsBtn.js"


const xCellCnt = 68
const yCellCnt = 26
// 64 23

/* Разделить на 2 метода, отображение DOM и получение массива на основе DOM
*/
// Добавить метод где будут регистрироваться все хэндлеры программы, как в тг боте

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
    preventSelection(mapView.mapView)
    CellStateHandler.addWallState(mapView.getArrayMap()) 

    addClearWallEvent(mapView.getArrayMap())
    registerAlgorithmsBtn(mapView.getArrayMap())
}

main()

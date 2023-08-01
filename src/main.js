import { MapDOM} from "./models/mapDOM.js"
import { Map } from "./models/map.js"
import { cellStates } from "./models/cellStates.js"
import { MapObject } from "./models/mapObject.js"
import { preventSelection } from "./disableSelection.js"
import { addClearPathEvent, addClearWallEvent } from "./handlers/menu/clearButtonsHandlers.js"
import { registerAlgorithmsBtn } from "./handlers/menu/algoBtnsHandler.js"
import { addDraggableEvent, addWallEvent } from "./handlers/mapDOMHandelrs.js"

import { addMenuArrow } from "./interfaceScript.js"

const xCellCnt = 68
const yCellCnt = 26

/* Разделить на 2 метода, отображение DOM и получение массива на основе DOM
*/
// Добавить метод где будут регистрироваться все хэндлеры программы, как в тг боте

function main() {
    addMenuArrow()

    const mapDOM = new MapDOM(document.querySelector(".grid"), xCellCnt, yCellCnt)
    mapDOM.createMapDOM()
    window.addEventListener("resize", () => requestAnimationFrame(mapDOM.resizeMapDOM.bind(mapDOM)))
    
    preventSelection(mapDOM.getMapSelector())
    
    const map = new Map(mapDOM.getMapSelector())
    const player = new MapObject(cellStates.START, "../img/node-start.png")
    map.addObject(15, 12, player)
    const finish = new MapObject(cellStates.FINISH, "../img/node-finish.png")
    map.addObject(6, 46, finish)
    addDraggableEvent(mapDOM.getMapSelector()) // проблема в том что все элементы нужно сналача зарегистрировать в в map, потом вызвать mapDOM

    addWallEvent(mapDOM.getMapSelector())
    addClearWallEvent(map.getMap())
    addClearPathEvent(map.getMap())
    registerAlgorithmsBtn(map.getMap())
}

main()

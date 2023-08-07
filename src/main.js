import { Map } from "./models/map.js"
import { MapDOM } from "./DOMEntities/mapDom.js"
import { registerAnimateEvents } from "./DOMEntities/cellDOM.js"

import { cellStates } from "./models/cellStates.js"
import { MapObject } from "./models/mapObject.js"
import { preventSelection } from "./disableSelection.js"
import { addClearPathEvent, addClearWallEvent, addClearBoardEvent } from "./handlers/menu/clearButtonsHandlers.js"
import { registerAlgorithmBtns } from "./handlers/menu/algoBtnsHandler.js"
import { addDraggableEvent, addWallEvent } from "./handlers/mapDOMHandelrs.js"
import { registerSpeedBtns } from "/src/handlers/menu/speedBtn.js"

import { addMenuArrow } from "./interfaceScript.js"

const xCellCnt = 68
const yCellCnt = 26

/* Разделить на 2 метода, отображение DOM и получение массива на основе DOM
*/
// Добавить метод где будут регистрироваться все хэндлеры программы, как в тг боте

function main() {
    addMenuArrow()

    const map = new Map(xCellCnt, yCellCnt)
    const mapDOM = new MapDOM()
    mapDOM.createMapDOM(map.getMap())

    window.addEventListener("resize", () => requestAnimationFrame(mapDOM.resizeMapDOM.bind(mapDOM))) // add to DOM Handlers
    
    preventSelection(mapDOM.getMapSelector())
    
    //const map = new Map(mapDOM.getMapSelector())
    mapDOM.addMapObjectEventListener()
    const player = new MapObject(cellStates.START, "../img/node-start.png")
    map.addObject(15, 12, player)
    const finish = new MapObject(cellStates.FINISH, "../img/node-finish.png")
    map.addObject(6, 46, finish)

    addDraggableEvent(mapDOM.getMapSelector()) // проблема в том что все элементы нужно сналача зарегистрировать в в map, потом вызвать mapDOM

    addWallEvent(mapDOM.getMapSelector())
    addClearWallEvent()
    addClearPathEvent()
    addClearBoardEvent()

    registerAnimateEvents(map.getMap())
    registerAlgorithmBtns(map.getMap())
    registerSpeedBtns()
}

main()

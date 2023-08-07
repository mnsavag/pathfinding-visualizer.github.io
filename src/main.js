import { Map } from "./models/map.js"
import { MapDOM } from "./DOMEntities/mapDom.js"
import { registerAnimateEvents } from "./DOMEntities/cellDOM.js"

import { cellStates } from "./models/cellStates.js"
import { MapObject } from "./models/mapObject.js"
import { preventSelection } from "/src/miscellaneous/disableSelection.js"
import { addClearPathEvent, addClearWallEvent, addClearBoardEvent } from "./models/menu/clearBtns.js"
import { registerAlgorithmBtns } from "/src/models/menu/algorithmBtns.js"
import { addDraggableEvent, addWallEvent } from "./models/utils/mapDOMEvents.js"
import { registerSpeedBtns } from "/src/models/menu/speedBtn.js"

import { addMenuArrow } from "/src/miscellaneous/interfaceScript.js"

const xCellCnt = 68
const yCellCnt = 26


function main() {
    const map = new Map(xCellCnt, yCellCnt)
    const mapDOM = new MapDOM()
    mapDOM.createMapDOM(map.getMap())

    window.addEventListener("resize", () => requestAnimationFrame(mapDOM.resizeMapDOM.bind(mapDOM))) // add to DOM Handlers
    
    registerInterface(mapDOM.getMapSelector())

    mapDOM.addMapObjectEventListener()
    const player = new MapObject(cellStates.START, "../img/node-start.png")
    map.addObject(15, 12, player)
    const finish = new MapObject(cellStates.FINISH, "../img/node-finish.png")
    map.addObject(6, 46, finish)

    registerMapDOMEvents(mapDOM)
    registerMenuBtnEvents(map.getMap())
    registerAnimateEvents(map.getMap())
}


function registerInterface(selector) {
    addMenuArrow()
    preventSelection(selector)
}

function registerMapDOMEvents(mapDOM) {
    addDraggableEvent(mapDOM.getMapSelector()) 
    addWallEvent(mapDOM.getMapSelector())
}

function registerMenuBtnEvents(map) {
    addClearWallEvent()
    addClearPathEvent()
    addClearBoardEvent()

    registerAlgorithmBtns(map)
    registerSpeedBtns()
}


main()

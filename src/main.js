import { cellStates } from "./models/cellStates.js"

import { Map } from "/src/models/map.js"
import { MapDOM } from "/src/DOMEntities/mapDom.js"
import { MapObject } from "/src/models/mapObject.js"

import { registerClearBtnsEvent } from "/src/models/menu/clearBtns.js"
import { registerAlgorithmBtns } from "/src/models/menu/algorithmBtns.js"
import { registerSpeedBtns } from "/src/models/menu/speedBtn.js"
import { registerMapDOMHandlersEvent } from "/src/DOMEntities/handlers/mapDOMEvents.js"
import { registerAnimateEvents } from "/src/DOMEntities/cellDOM.js"

import { preventSelection } from "/src/miscellaneous/disableSelection.js"
import { addMenuArrow } from "/src/miscellaneous/interfaceScript.js"

const xCellCnt = 68
const yCellCnt = 26


function main() {
    const map = new Map(xCellCnt, yCellCnt)
    const mapDOM = new MapDOM(map.getMap())
    mapDOM.createMapDOM(map.getMap())
    window.addEventListener("resize", () => requestAnimationFrame(mapDOM.resizeMapDOM.bind(mapDOM)))
    
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
    registerMapDOMHandlersEvent(mapDOM.getMapSelector())
}

function registerMenuBtnEvents(map) {
    registerClearBtnsEvent()
    registerAlgorithmBtns(map)
    registerSpeedBtns()
}

main()

import { cellStates } from "./models/cellStates.js"

import { Map } from "./models/map.js"
console.log("1")
import { MapDOM } from "./DOMEntities/mapDom.js"
console.log("2")
import { MapObject } from "./models/mapObject.js"
console.log("3")
import { registerClearBtnsEvent } from "./models/menu/clearBtns.js"
import { registerAlgorithmBtns } from "./models/menu/algorithmBtns.js"
import { registerSpeedBtns } from "./models/menu/speedBtn.js"
import { registerMapDOMHandlersEvent } from "./DOMEntities/handlers/mapDOMEvents.js"
import { registerAnimateEvents } from "./DOMEntities/cellDOM.js"

import { preventSelection } from "./miscellaneous/disableSelection.js"
import { addMenuArrow } from "./miscellaneous/interfaceScript.js"


const xCellCnt = 68
const yCellCnt = 26
console.log("4")

function main() {
    console.log("5")
    const map = new Map(xCellCnt, yCellCnt)
    const mapDOM = new MapDOM(map.getMap())
    mapDOM.createMapDOM(map.getMap())
    window.addEventListener("resize", () => requestAnimationFrame(mapDOM.resizeMapDOM.bind(mapDOM)))
    
    registerInterface(mapDOM.getMapSelector())
    console.log("6")
    mapDOM.addMapObjectEventListener()
    const player = new MapObject(cellStates.START, "/src/img/node-start.png")
    map.addObject(15, 12, player)
    const finish = new MapObject(cellStates.FINISH, "/src/img/node-finish.png")
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

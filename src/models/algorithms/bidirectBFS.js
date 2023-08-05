import { cellStates } from "/src/models/cellStates.js"
import { animateCellSpawn} from "/src/models/utils/animationCell.js"
import { Algorithm } from "/src/models/algorithms/algorithm.js"
import { sleep } from "/src/utility.js"
import { getTempSpeed } from "/src/handlers/menu/speedBtn.js"

const notAvailObj = {
    [cellStates.WALL]: true,
    [cellStates.START]: true
}

const colors = {
    ZERO: "0",
    ONE: "1",
    TWO: "2"
}

export class BidirectBFS extends Algorithm {
    static async search(map) {
        const [sY, sX] = super.getCellByState(cellStates.START, map)
        const [fY, fX] = super.getCellByState(cellStates.FINISH, map)
        const height = map.length
        const width = map[0].length
        const dx = [0,   1, -1,  0]
        const dy = [-1 , 0,  0, 1]

        let colorMap = getColorMap(width, height)
        let ancestors = []
        let queue = [[sY, sX, colors.ONE], [fY, fX, colors.TWO]]
        colorMap[sY][sX] = colors.ONE
        colorMap[fY][fX] = colors.TWO

        let intersectionFirst
        let intersectionSecond
        let isNodeFound = false
        while (queue.length > 0) {
            let [y, x, color] = queue.shift()
            
            animateCellSpawn(map[y][x])
            await sleep(getTempSpeed() - 10)
            
            for (let i = 0; i < dx.length; i++) {
                const [newY, newX] = [y - dy[i], x - dx[i]]
    
                if (0 <= newX && newX < width && 
                    0 <= newY && newY < height &&
                    !(map[newY][newX].className in notAvailObj)) {
                        if (colorMap[newY][newX] === color) {
                            continue
                        }
                        if (colorMap[newY][newX] === colors.ZERO) {
                            colorMap[newY][newX] = color
                            queue.push([newY, newX, color])
                        }
                        else if (colorMap[newY][newX] !== color) {
                            colorMap[newY][newX] = color
                            isNodeFound = true
                            animateCellSpawn(map[newY][newX])
                            await sleep(getTempSpeed() - 10)

                            intersectionFirst = [newY, newX]
                            ancestors.push({
                                currY: newY,
                                currX: newX,
                                prevY: y,
                                prevX: x
                            })
                            console.log(intersectionFirst)
                            intersectionSecond = getAdjencentOtherColor(newY, newX, color, colorMap, width, height, map)
                            console.log(intersectionSecond)
                            ancestors.push({
                                currY: intersectionSecond[0],
                                currX: intersectionSecond[1],
                                prevY: newY,
                                prevX: newX
                            })
                            break
                        }
                        ancestors.push({
                            currY: newY,
                            currX: newX,
                            prevY: y,
                            prevX: x
                        })
                    }
                }
            if (isNodeFound) {
                break
            }
        }
        
        map[fY][fX].className = cellStates.FINISH // пофиксить
        map[sY][sX].className = cellStates.START
        if (intersectionFirst) {
            await super.animatePath(map, ancestors, intersectionFirst[0], intersectionFirst[1])
            await super.animatePath(map, ancestors, intersectionSecond[0], intersectionSecond[1])
        }
    }
}


function getColorMap(width, height) {
    let map = []
    for (let i = 0; i < height; i++) {
        let row = []
        for (let j = 0; j < width; j++) {
            row.push(colors.ZERO)
        }
        map.push(row)
    }
    return map
}

function getAdjencentOtherColor(y, x, color, colorMap, width, height, map) {
    const dx = [0,   1, -1,  0]
    const dy = [-1 , 0,  0, 1]
    for (let i = 0; i < dx.length; i++) {
        const [newY, newX] = [y - dy[i], x - dx[i]]

        if (0 <= newX && newX < width && 
            0 <= newY && newY < height &&
            !(map[newY][newX].className in notAvailObj)) {
                if (colorMap[newY][newX] !== colors.ZERO && colorMap[newY][newX] === color) {
                    return [newY, newX]
            }
        }
    }
}

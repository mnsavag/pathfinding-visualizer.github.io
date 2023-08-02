import { cellStates } from "/src/models/cellStates.js"
import { animateCellSpawn} from "/src/models/utils/animationCell.js"
import { Algorithm } from "/src/models/algorithms/algorithm.js"
import { sleep } from "/src/utility.js"

export class BFS extends Algorithm {
    static async search(map) {
        const [sY, sX] = super.getCellByState(cellStates.START, map)
        const [fY, fX] = super.getCellByState(cellStates.FINISH, map)

        const height = map.length
        const width = map[0].length

        let ancestors = []

        let stack = [[sY, sX]]
        let visited = new Map()
        while (stack.length > 0) {
            const [y, x] = stack.shift()
            
            animateCellSpawn(map[y][x])
            
            await sleep(50)
            if (y === fY && x === fX) {
                break
            }
            else {
                const adjacentYX = super.getAdjacentAvailYX(map, visited, y, x, width, height)
                for (const pairYX of adjacentYX) {
                    stack.push(pairYX)
                    map[pairYX[0]][pairYX[1]].className = cellStates.VISITED
                    visited.set(pairYX[0], pairYX[1])

                    ancestors.push({
                        currY: pairYX[0],
                        currX: pairYX[1],
                        prevY: y,
                        prevX: x
                    })
                }
            }  
        }
        
        map[fY][fX].className = cellStates.FINISH // пофиксить
        map[sY][sX].className = cellStates.START
        super.animatePath(map, ancestors, fY, fX)
    }
}

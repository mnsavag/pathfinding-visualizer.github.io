import { cellStates } from "/src/models/cellStates.js"
import { animateCellSpawn} from "/src/models/utils/animationCell.js"
import { Algorithm } from "/src/models/algorithms/algorithm.js"
import { sleep } from "/src/utility.js"
import { getTempSpeed } from "/src/handlers/menu/speedBtn.js"


export class DFS extends Algorithm {
    static async search(map) {
        const [sY, sX] = super.getCellByState(cellStates.START, map)
        const [fY, fX] = super.getCellByState(cellStates.FINISH, map)

        const height = map.length
        const width = map[0].length

        let ancestors = []
        let visited = {}
        let stack = [[sY, sX]]
        while (stack.length > 0) {
            const [y, x] = stack.pop()
            
            animateCellSpawn(map[y][x])
            
            await sleep(getTempSpeed())
            if (y === fY && x === fX) {
                break
            }
            else {
                const adjacentYX = super.getAdjacentAvailYX(map, visited, y, x, width, height)
                for (const pairYX of adjacentYX) {
                    stack.push(pairYX)
                    visited[[pairYX[0], pairYX[1]]] = true

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
        await super.animatePath(map, ancestors, fY, fX)
    }
}

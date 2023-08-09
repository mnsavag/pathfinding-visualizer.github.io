import { Algorithm } from "/src/models/algorithms/algorithm.js"
import { sleep } from "/src/miscellaneous/utility.js"
import { getTempSpeed } from "/src/models/menu/speedBtn.js"


export class DFS extends Algorithm {
    static async search(map, sY, sX, fY, fX, height, width) {

        let ancestors = {}
        let visited = {}
        visited[[sY, sX]] = true
        let stack = [[sY, sX]]
        while (stack.length > 0) {
            const [y, x] = stack.pop()
            
            map[y][x].animateCellSpawn()
            
            await sleep(getTempSpeed())
            if (y === fY && x === fX) {
                break
            }
            else {
                const adjacentYX = super.getAdjacentAvailYX(map, visited, y, x, width, height)
                for (const pairYX of adjacentYX) {
                    stack.push(pairYX)
                    visited[[pairYX[0], pairYX[1]]] = true

                    ancestors[pairYX] = [y, x]
                }
            }  
        }
        await super.animatePath(map, ancestors, fY, fX)
    }
}

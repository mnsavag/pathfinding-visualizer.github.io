import { cellStates } from "/src/models/cellStates.js"
import { animateCellSpawn} from "/src/models/utils/animationCell.js"
import { Algorithm } from "/src/models/algorithms/algorithm.js"
import { sleep } from "/src/utility.js"
import { getTempSpeed } from "/src/handlers/menu/speedBtn.js"
import { Heap } from "/src/models/algorithms/heap.js"


export class AStar extends Algorithm {
    static async search(map) {
        const [sY, sX] = super.getCellByState(cellStates.START, map)
        const [fY, fX] = super.getCellByState(cellStates.FINISH, map)
        const height = map.length
        const width = map[0].length

        let ancestors = {}
        let dist = {}
        let minHeap = new Heap()

        minHeap.insert([getHeuristic(sY, sX, fY, fX), sY, sX])
        dist[[sY, sX]] = 0
        while (minHeap.getLength() > 0) {
            let [cost, y, x] = minHeap.extract()
            cost = -cost

            if (y === fY && x === fX) {
                break
            }
            animateCellSpawn(map[y][x])
            await sleep(getTempSpeed())

            const adjacentYX = super.getAdjacentAvailYX(map, [], y, x, width, height)
            for (const pairYX of adjacentYX) {
                if (!(pairYX in dist) || dist[[y, x]] + 1 < dist[pairYX]) {
                    dist[pairYX] = dist[[y, x]] + 1
                    const newEstimate = dist[pairYX] + getHeuristic(...pairYX, fY, fX)
                    minHeap.insert([-newEstimate, ...pairYX])
                    
                    ancestors[pairYX] = [y, x]
                }
            }
        }
        map[fY][fX].className = cellStates.FINISH // пофиксить
        map[sY][sX].className = cellStates.START
        await super.animatePath(map, ancestors, fY, fX)
    }
}


function getHeuristic(sY, sX, fY, fX) {
    return Math.abs(sY - fY) + Math.abs(sX - fX)
}
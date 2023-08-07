import { cellStates } from "/src/models/cellStates.js"
import { Algorithm } from "/src/models/algorithms/algorithm.js"
import { sleep } from "/src/utility.js"
import { getTempSpeed } from "/src/handlers/menu/speedBtn.js"
import { Heap } from "/src/models/algorithms/heap.js"


export class Dijkstra extends Algorithm {
    static async search(map) {
        const [sY, sX] = super.getCellByState(cellStates.START, map)
        const [fY, fX] = super.getCellByState(cellStates.FINISH, map)

        const height = map.length
        const width = map[0].length

        let ancestors = {}
        let visited = {}

        let minHeap = new Heap()
        minHeap.insert([0, sY, sX])
        visited[[sY, sX]] = true
        while (minHeap.getLength() > 0) {
            let [cost, y, x] = minHeap.extract()
            cost = -cost
            if (y === fY && x === fX) {
                break
            }
            
            const adjacentYX = super.getAdjacentAvailYX(map, visited, y, x, width, height)
            for (const pairYX of adjacentYX) {
                let newY = pairYX[0]
                let newX = pairYX[1]
                visited[[newY, newX]] = true
                minHeap.insert([-(cost + 1), newY, newX])
                
                ancestors[pairYX] = [y, x]
            }
            map[y][x].animateCellSpawn()
            await sleep(getTempSpeed())
        }

        map[fY][fX].DOM.className = cellStates.FINISH // пофиксить
        map[sY][sX].DOM.className = cellStates.START
        await super.animatePath(map, ancestors, fY, fX)
    }
}

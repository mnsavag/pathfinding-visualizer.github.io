import { Heap } from "./heap.js"
import { Algorithm } from "./algorithm.js"
import { getTempSpeed } from "../menu/speedBtn.js"
import { sleep } from ".../miscellaneous/utility.js"


export class Dijkstra extends Algorithm {
    static async search(map, sY, sX, fY, fX, height, width) {
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
                let [newY, newX] = [...pairYX]
                visited[[newY, newX]] = true
                minHeap.insert([-(cost + 1), newY, newX])
                
                ancestors[pairYX] = [y, x]
            }
            map[y][x].animateCellSpawn()
            await sleep(getTempSpeed())
        }
        await super.animatePath(map, ancestors, fY, fX)
    }
}

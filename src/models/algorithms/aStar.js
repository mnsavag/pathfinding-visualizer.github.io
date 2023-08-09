import { Heap } from "./heap.js"
import { Algorithm } from "./algorithm.js"
import { getTempSpeed } from "../menu/speedBtn.js"
import { sleep } from "../../miscellaneous/utility.js"


export class AStar extends Algorithm {
    static async search(map, sY, sX, fY, fX, height, width) {
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

            map[y][x].animateCellSpawn()
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
        await super.animatePath(map, ancestors, fY, fX)
    }
}

function getHeuristic(sY, sX, fY, fX) {
    return Math.abs(sY - fY) + Math.abs(sX - fX)
}
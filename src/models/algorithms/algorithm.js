import { cellStates } from "/src/models/cellStates.js"
import { animateCellSpawn, animateCellPath } from "/src/models/utils/animationCell.js"
import { sleep } from "/src/utility.js"
import { getTempSpeed, getPathSpeed } from "/src/handlers/menu/speedBtn.js"

const notAvailObj = {
    [cellStates.WALL]: true,
    [cellStates.START]: true
}

export class Algorithm {
    static search(map){}

    static getCellByState(state, map) {
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j].className == state) {
                    return [i, j]
                }
            }
        }
    }
    
    static getAdjacentAvailYX(map, visited, y, x, width, height) {
        let dx = [0,   1, -1,  0]
        let dy = [-1 , 0,  0, 1]
        let result = []
        for (let i = 0; i < dx.length; i++) {
            const [newY, newX] = [y - dy[i], x - dx[i]]

            if (0 <= newX && newX < width && 
                0 <= newY && newY < height &&
                (!([newY, newX] in visited) && !(map[newY][newX].className in notAvailObj))){
                    result.push([newY, newX])
                }
        }
        return result
    }

    static async animatePath(map, ancestors, y, x) {
        let path = []

        while ([y, x] in ancestors) {
            path.push([y, x])
            let tempY = y
            y = ancestors[[y, x]][0]
            x = ancestors[[tempY, x]][1]
            console.log([y, x])
        }

        while (path.length > 0) {
            const [y, x] = path.pop()
            animateCellPath(map[y][x])
            await sleep(getPathSpeed())
        }
    }
}

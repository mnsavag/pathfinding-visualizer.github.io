import { cellStates } from "src/models/cellStates.js"
import { sleep } from "src/miscellaneous/utility.js"
import { getTempSpeed, getPathSpeed } from "src/models/menu/speedBtn.js"

const notAvailObj = {
    [cellStates.WALL]: true,
    [cellStates.START]: true
}

export class Algorithm {
    static async search(algorithmFunction, map) {
        let [sY, sX] = this.getCellByState(cellStates.START, map)
        let [fY, fX] = this.getCellByState(cellStates.FINISH, map)
        const height = map.length
        const width = map[0].length

        await algorithmFunction(map, sY, sX, fY, fX, height, width);
    }

    static getCellByState(state, map) {
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j].DOM.className == state) {
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
                (!([newY, newX] in visited) && !(map[newY][newX].DOM.className in notAvailObj))){
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
        }
        while (path.length > 0) {
            const [y, x] = path.pop()
            map[y][x].animateCellPath()
            await sleep(getPathSpeed())
        }
    }
}

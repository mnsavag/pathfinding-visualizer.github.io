import { cellStates } from "/src/models/cellStates.js"
import { animateCellSpawn, animateCellPath } from "/src/models/utils/animationCell.js"
import { sleep } from "/src/utility.js"

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
        const dx = [1, -1, 0, 0]
        const dy = [0, 0, 1, -1]
        let result = []
        for (let i = 0; i < dx.length; i++) {
            const [newY, newX] = [y + dy[i], x + dx[i]]

            if (0 <= newX && newX < width && 
                0 <= newY && newY < height &&
                (map[newY][newX].className === cellStates.UNVISITED || map[newY][newX].className === cellStates.FINISH) &&
                visited.get(newY) !== newX){
                    result.push([newY, newX])
                }
        }
        return result
    }

    static async animatePath(map, ancestors, y, x) {
        let path = []
       
        let currNode = ancestors.find(anc => anc.currY === y && anc.currX === x) 
        while (currNode) {
            path.push([y, x])
            y = currNode.prevY
            x = currNode.prevX
            currNode = ancestors.find(anc => anc.currY === y && anc.currX === x) 
        }
        
        while (path.length > 0) {
            const [y, x] = path.pop()
            animateCellPath(map[y][x])
            await sleep(50)
        }
    }
}

import { cellStates } from "/src/cellStates.js"
import { aminationCell } from "/src/animationCell.js"

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export class Algorithms {
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
}

export class BFS extends Algorithms {
    static async search(map) {
        const [sY, sX] = super.getCellByState(cellStates.START, map)
        const [fY, fX] = super.getCellByState(cellStates.FINISH, map)

        const height = map.length
        const width = map[0].length

        let stack = [[sY, sX]]
        let visited = new Map()

        while (stack.length > 0) {
            const [y, x] = stack.shift()
            
            aminationCell(map[y][x])
            
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
                }
            }  
        }
    }
}
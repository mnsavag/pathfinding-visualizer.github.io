export class Heap {
    constructor() {
        this._heap = []
    }

    insert(values) {
        this._heap.push(values)
        let pos = this._heap.length - 1
        let prevElPos = Math.floor((pos - 1) / 2)

        while (pos > 0 && this._heap[pos][0] > this._heap[prevElPos][0]) {
            let temp = this._heap[pos]
            this._heap[pos] = this._heap[prevElPos]
            this._heap[prevElPos] = temp
            
            pos = prevElPos
            prevElPos = Math.floor((pos - 1) / 2)
        }
    }

    extract() {
        const ans = this._heap[0]
        this._heap[0] = this._heap[this._heap.length - 1]
        let pos = 0
        while (pos * 2 + 1 < this._heap.length - 1) {
            let maxSonIdx = pos * 2 + 1
            if (this._heap[pos * 2 + 2][0] > this._heap[maxSonIdx][0]) {
                maxSonIdx = pos * 2 + 2
            }

            if (this._heap[pos][0] < this._heap[maxSonIdx][0]) {
                let temp = this._heap[pos]
                this._heap[pos] = this._heap[maxSonIdx]
                this._heap[maxSonIdx] = temp
                pos = maxSonIdx
            }
            else {
                break
            }
        }
        this._heap.pop()
        return ans
    }

    getLength() {
        return this._heap.length
    }
}
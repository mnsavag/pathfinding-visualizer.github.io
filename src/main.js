import { Grid } from "./models/Grid.js"
import { GridView } from "./views/GridView.js"


const xCellCnt = 64
const yCellCnt = 23


function main() {
    const grid = new Grid(xCellCnt, yCellCnt)
    grid.initCells()

    const gridView = new GridView(document.querySelector(".grid"), grid)
    gridView.renderGrid("tr", "td")
    window.addEventListener("resize", () => requestAnimationFrame(gridView.resizeGridView.bind(gridView)))
}

main()
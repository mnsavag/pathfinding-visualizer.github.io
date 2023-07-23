const xCellCnt = 64;
const yCellCnt = 23;
const grid = document.querySelector(".grid");


window.addEventListener("resize", () => requestAnimationFrame(resizeGrid));


function createGrid() {
    resizeGrid()
    for (let x = 0; x < yCellCnt; x++) {
        const row = createDOMWithId("tr", x);
        for (let y = 0; y < xCellCnt; y++) {
            const cell = createDOMWithId("td", `${x} ${y}`);
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

function resizeGrid() {
    const blockHeight = document.documentElement.clientHeight - 50 - 80; // change when will adaptive header, section
    const blockWidth = document.documentElement.clientWidth;
    const table = getTableObj(blockWidth, blockHeight);

    grid.style.width = `${table.width}px`;
    grid.style.height = `${table.height}px`;
}

function getTableObj(blockWidth, blockHeight) {
    let gridWidth = blockWidth - blockWidth % xCellCnt;
    let gridHeight = blockHeight - blockHeight % yCellCnt;

    let cellWidth = gridWidth / xCellCnt;
    let cellHeight = gridHeight / yCellCnt;
    
    gridWidth = cellWidth * xCellCnt - cellWidth;
    gridHeight = cellHeight * yCellCnt - cellHeight;
    return {
        width: gridWidth,
        height: gridHeight,
    }
}

function createDOMWithId(tag, id) {
    const domElem = document.createElement(tag);
    let idAttr = document.createAttribute("id");
    idAttr.value = id;
    domElem.setAttributeNode(idAttr);
    return domElem;
}

createGrid();
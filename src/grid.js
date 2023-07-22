const paleBlue = "rgb(179,188,187)";
const smokyWhite = "rgb(238,236,236)";

const ctx = document.querySelector(".grid").getContext("2d");
const LINE_TYPES = 3;
const beginPos = [0.5, 50.5, 0.5];
const step     = [25,  50,  50];
const style    = [smokyWhite, paleBlue];

window.addEventListener("resize", () => requestAnimationFrame(createGrid));


function createGrid() {
    ctx.canvas.width  = document.documentElement.clientWidth;
    ctx.canvas.height = document.documentElement.clientHeight;
    
    for (let lineType = 0; lineType < LINE_TYPES; ++lineType){
        for (let dir = 0; dir < 2; ++dir) {
            ctx.beginPath()
            ctx.strokeStyle = style[lineType];
            let index = beginPos[lineType];
            if (dir == 0)
                while (index < ctx.canvas.width) {
                    ctx.moveTo(index, 0);
                    ctx.lineTo(index, ctx.canvas.height);
                    index += step[lineType];
                }
            else
                while (index < ctx.canvas.height) {
                    ctx.moveTo(0, index);
                    ctx.lineTo(ctx.canvas.width, index);
                    index += step[lineType];
                }
            ctx.stroke();
        }
    }
}

createGrid();
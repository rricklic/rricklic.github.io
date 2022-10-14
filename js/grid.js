const GRID_CANVAS_ID = "canvas-grid"

let mouseDown = false;
let prevTime;

function gridInit(width, height, pixelSize)
{
    const canvas = document.getElementById(GRID_CANVAS_ID);
    canvas.width = width;
    canvas.height = height;
    canvas.pixelSize = pixelSize;
    canvas.numRows = height / pixelSize;
    canvas.numCols = width / pixelSize;
    canvas.array = new Array(canvas.numRows * canvas.numCols);
    canvas.listAnimation = [];
    canvas.addEventListener("mousedown", canvasHandleMouseDown);
    canvas.addEventListener("mouseup", canvasHandleMouseUp);
    canvas.addEventListener("mousemove", canvasHandleMouseMove);
    canvas.addEventListener("mouseout", canvasHandleMouseUp);
    window.requestAnimationFrame(gridDraw);
}

/*
function easingLinear(time, from, to, duration)
{
    return from + ((to - from) * (time / duration));
}

function easingOutElastic(t, b, c, d)
{
    let s = 1.70158;
    //let p = 0;
    let a = c;
    if (t == 0) { return b; }
    if ((t /= d) == 1) { return b + c; }
    //if (!p) { p = d * 0.3; }
    p = d * 0.3;
    if (a < Math.abs(c)) {
        a = c;
        let s = p / 4;
    } else {
        let s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return (a + Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b) / 2;
}
*/

function gridDraw()
{
    const canvas = document.getElementById(GRID_CANVAS_ID);
    const canvasCtx = canvas.getContext('2d');
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    //const dt = time - prevTime;
    const time = Date.now();
    if (prevTime === undefined) {
        prevTime = time;
    }

    // Draw cells
    for (let index = 0; index < canvas.array.length; index++) {
        const cell = canvas.array[index];
        if (cell !== undefined) {
            const row = Math.floor(index / canvas.numCols);
            const col = index - (row * canvas.numCols);
            const x = col * canvas.pixelSize;
            const y = row * canvas.pixelSize;
            const pixelSize = canvas.pixelSize;
            canvasCtx.fillStyle = cell.color;
            canvasCtx.fillRect(x, y, pixelSize, pixelSize);
        }
    }

    // Draw animation(s)
    const newListAnimation = [];
    for (const animation of canvas.listAnimation) {
        const x = (animation.col * canvas.pixelSize) + (0.5 * canvas.pixelSize * (1 - animation.value));
        const y = (animation.row * canvas.pixelSize) + (0.5 * canvas.pixelSize * (1 - animation.value));
        const pixelSize = canvas.pixelSize * animation.value;
        canvasCtx.fillStyle = animation.color;
        canvasCtx.fillRect(x, y, pixelSize, pixelSize);

        if ((time - animation.time)  < animation.duration) {
            animation.value = animation.funcEasing(
                time - animation.time,
                animation.startValue,
                animation.endValue,
                animation.duration);
            newListAnimation.push(animation);
        } else {
            canvas.array[animation.index] = {color: animation.color};
        }
    }
    canvas.listAnimation = newListAnimation;    

    // Draw vertical grids lines
    canvasCtx.strokeStyle = "#CCCCCC";
    for (let pixel = 0; pixel < canvas.width; pixel += Number(canvas.pixelSize)) {
        canvasCtx.beginPath();
        canvasCtx.moveTo(pixel, 0);
        canvasCtx.lineTo(pixel, canvas.height);
        canvasCtx.stroke();
        canvasCtx.closePath();
    }

    // Draw horizontal grids lines
    for (let pixel = 0; pixel < canvas.height; pixel += Number(canvas.pixelSize)) {
        canvasCtx.beginPath();
        canvasCtx.moveTo(0, pixel);
        canvasCtx.lineTo(canvas.width, pixel);
        canvasCtx.stroke();
        canvasCtx.closePath();
    }

    prevTime = time;
    window.requestAnimationFrame(gridDraw);
}

function canvasHandleMouseDown(event)
{
    mouseDown = true;
    canvasHandleMouseMove(event);
}

function canvasHandleMouseUp(event)
{
    mouseDown = false;
}

function canvasHandleMouseMove(event)
{
    if (!mouseDown) {
        return;
    }

    const canvas = document.getElementById(GRID_CANVAS_ID);
    const col = Math.floor(event.offsetX / canvas.pixelSize);
    const row = Math.floor(event.offsetY / canvas.pixelSize);
    if (col < 0 || row < 0 || (col >= canvas.numCols) || (row >= canvas.numRows)) {
        return;
    }
    const index = col + (row * canvas.numCols);
    if (canvas.array[index] === undefined) {
        canvas.array[index] = {color: "#FFFFFF"};
        canvas.listAnimation.push({
            col: col,
            row: row,
            index: index,
            color: "#FF0000",
            value: 0,
            time: Date.now(),
            startValue: 0.0,
            endValue: 1.0,
            duration: 1000.0, // milliseconds
            funcEasing: easingOutElastic });
        console.log(`Clicked col=${col}, row=${row}, index=${index}`);
    }
}

gridInit(1000, 600, 20);

// TODO: JSON.stringify(object)
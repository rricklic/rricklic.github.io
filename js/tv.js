const tvScreen = document.querySelector(".tv .tv-screen");
const tvPower = document.querySelector(".tv .tv-power");
const tvScreenCtx = tvScreen.getContext('2d');
const  tvWidth = tvScreen.width;
const tvHeight = tvScreen.height;
const imgData = tvScreenCtx.createImageData(tvWidth, tvHeight);
const buffer = new Uint32Array(imgData.data.buffer);
let tvIsOn = true;

tvPower.addEventListener("mousedown", tvTogglePower);

function tvDrawStatic()
{
    let len = buffer.length -1;
     while (len--) {
        buffer[len] = Math.random() < 0.5 ? 0 : -1 >> 0;
    }
    tvScreenCtx.putImageData(imgData, 0, 0);
}

function tvDraw()
{
    if (!tvIsOn) {
        // TODO: CRT tv power off effect; sound
        tvScreenCtx.clearRect(0, 0, tvWidth, tvHeight);
    } else {
        // TODO: static sound
        tvDrawStatic();
        requestAnimationFrame(tvDraw);
    }
}

function tvPlayGame()
{
    if (tvIsOn) {
        // TODO: play jsnes rom
    }
}

function tvTogglePower(event)
{
    tvIsOn = !tvIsOn;
    tvDraw();
}

tvDraw();
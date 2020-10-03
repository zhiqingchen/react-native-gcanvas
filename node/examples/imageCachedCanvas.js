const fs = require('fs')
const path = require('path')
const out1 = fs.createWriteStream(path.join(__dirname, "..")+ '/imageCanvas1.png');
const out2 = fs.createWriteStream(path.join(__dirname, "..")+ '/imageCanvas2.png');

const { createCanvas, Image } = require('../export');

function localFunctionCreateCanvas() {
    let canvas = createCanvas(400, 400);
    let canvas2 = createCanvas(400, 400);
    let canvas3 = createCanvas(400, 400);
    let canvas4 = createCanvas(400, 400);
}

localFunctionCreateCanvas();
try {
    if (global.gc) {
        console.log(`called gc force`);
        global.gc();
    } else {
        console.log("not called gc ");
    }
} catch (e) {
    console.log("`node --expose-gc index.js`");
    process.exit();
}

setTimeout(() => {
    const canvas = createCanvas(400, 400);
    const ctx = canvas.getContext('2d');
    const img = new Image()

    img.onload = () => {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(img, 0, 0, 100, 100);
        // canvas.createPNG("imageCanvas1");
        var stream = canvas.createPNGStream();
        stream.on('data', function (chunk) {
            out1.write(chunk);
        });

        nextCanvasDrawImage();
    }
    img.onerror = err => {
        console.log(err)
    }
    img.src = "https://img.alicdn.com/imgextra/i3/80/O1CN011CSgGWymNlCrNO3_!!80-2-luban.png"


    function nextCanvasDrawImage() {
        const canvas2 = createCanvas(400, 400);
        const ctx2 = canvas2.getContext('2d');
        let img2 = new Image();
        img2.onerror = err => {
            console.log(err)
        }
        img2.onload = () => {
            ctx2.fillStyle = "#000000";
            ctx2.fillRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);
            ctx2.drawImage(img2, 0, 0, 100, 100);
            // canvas2.createPNG("imageCanvas2")
            var stream = canvas.createPNGStream();
            stream.on('data', function (chunk) {
                out2.write(chunk);
            });

        }
        img2.src = "https://img.alicdn.com/imgextra/i3/80/O1CN011CSgGWymNlCrNO3_!!80-2-luban.png"
    }
}, 100);


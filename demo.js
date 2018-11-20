var canvas, ctx;
var canvasObj, ctxObj;
var iDstW = 256;
var iDstH = 256;
var iXSpeed = 0;
var iYSpeed = 0;
var iLastX = iDstW / 2;
var iLastY = iDstH / 2;
var oImage;
var aMap = [];
var aBitmap;
var angle = 0;
var mathSphere = function(px, py) {
    var x = px - iDstW / 2;
    var y = py - iDstH / 2;
    var r = Math.sqrt(x * x + y * y);
    var maxR = iDstW / 2;
    if (r > maxR) return {'x':px, 'y':py};

    var a = Math.atan2(y, x);
    var k = (r / maxR) * (r / maxR) * 0.5 + 0.5;
    var dx = Math.cos(a) * r * k;
    var dy = Math.sin(a) * r * k;
    return {'x': dx + iDstW / 2, 'y': dy + iDstH / 2};
}

window.onload = function(){

    // load background
    oImage = new Image();
    oImage.src = 'nebula.jpg';
    oImage.onload = function () {

        // creating canvas and context objects
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        canvasObj = document.getElementById('obj');
        ctxObj = canvasObj.getContext('2d');

        // clear context
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // and draw source image
        ctx.drawImage(oImage, 0, 0);

        aBitmap = ctx.getImageData(0, 0, iDstW, iDstH);
        for (var y = 0; y < iDstH; y++) {
            for (var x = 0; x < iDstW; x++) {
                var t = mathSphere(x, y);
                aMap[(x + y * iDstH) * 2 + 0] = Math.max(Math.min(t.x, iDstW - 1), 0);
                aMap[(x + y * iDstH) * 2 + 1] = Math.max(Math.min(t.y, iDstH - 1), 0);
            }
        }

        // begin updating scene
        updateScene();
    };

    function updateScene() {
        angle++;
        // update last coordinates
        iLastX = Math.round(canvas.width/2+100*Math.sin(angle * Math.PI/180));
        iLastY = Math.round(canvas.height/2+100*Math.cos(angle * Math.PI/180));

        // reverse speed
        if (iLastX > ctx.canvas.width - iDstW/2) {
            iXSpeed = -3;
        }
        if (iLastX < iDstW/2) {
            iXSpeed = 3;
        }
        if (iLastY > ctx.canvas.height - iDstH/2) {
            iYSpeed = -3;
        }
        if (iLastY < iDstH/2) {
            iYSpeed = 3;
        }

        // shifting of the second object
        canvasObj.style.left = iLastX - Math.floor(iDstW / 2) + 'px';
        canvasObj.style.top = iLastY - (Math.floor(iDstH / 2)) + 'px';

        // draw result Sphere
        var aData = ctx.getImageData(iLastX - Math.ceil(iDstW / 2), iLastY - Math.ceil(iDstH / 2), iDstW, iDstH + 1);
        for (var j = 0; j < iDstH; j++) {
            for (var i = 0; i < iDstW; i++) {
                var u = aMap[(i + j * iDstH) * 2];
                var v = aMap[(i + j * iDstH) * 2 + 1];
                var x = Math.floor(u);
                var y = Math.floor(v);
                var kx = u - x;
                var ky = v - y;
                for (var c = 0; c < 4; c++) {
                    aBitmap.data[(i + j * iDstH) * 4 + c] =
                      (aData.data[(x + y * iDstH) * 4 + c] * (1 - kx) + aData.data[((x + 1) + y * iDstH) * 4 + c] * kx) * (1-ky) +
                      (aData.data[(x + (y + 1) * iDstH) * 4 + c] * (1 - kx) + aData.data[((x + 1) + (y + 1) * iDstH) * 4 + c] * kx) * (ky);
                }
            }
        }
        ctxObj.putImageData(aBitmap,0,0);
        ctxObj.beginPath();
        ctxObj.filter="blur(10px)";
        ctxObj.arc(canvasObj.width/2,canvasObj.height/2,80,0,2*Math.PI);
        ctxObj.fillStyle="#000";
        ctxObj.fill();
        ctxObj.filter="none";
        
        // update timer
        setTimeout(updateScene, 16);
    }
};
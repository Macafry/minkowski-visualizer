function bind(canvas, shape) {
    canvas.onmousedown = (evt) => rightDown(evt,canvas,shape);
    canvas.onmousemove = (evt) => rightDrag(evt,canvas,shape);
    canvas.onmouseup = () => rightUp(shape);
    canvas.addEventListener('contextmenu', (evt) => leftClick(evt, canvas, shape));    
}

let canvasA = document.getElementById("shapeA")

let shapeA = new Shape(canvasA, "#aa8", "#d00");
shapeA.addPoint([-.3,-.4]);
shapeA.addPoint([0,0]);
shapeA.addPoint([.9,.9]);
shapeA.render();

bind(canvasA, shapeA);

let canvasB = document.getElementById("shapeB")

let shapeB = new Shape(canvasB, "#aa8", "#0d0");
shapeB.addPoint([0.9,-0.9]);
shapeB.addPoint([-.9,.9]);
shapeB.addPoint([.9,.9]);
shapeB.addPoint([-.9,-.9]);
shapeB.render();

bind(canvasB, shapeB);

let canvasSum = document.getElementById("Msum");
let Msum = new Minkowski(shapeA,shapeB,canvasSum, "#aa8", "#00d", (a,b) => (a+b)/2);
shapeA.sum = Msum;
shapeB.sum = Msum;
Msum.render();

let canvasdiff = document.getElementById("Mdiff");
let Mdiff = new Minkowski(shapeA,shapeB,canvasdiff, "#aa8", "#dd0", (a,b) => (a-b)/2);
shapeA.diff = Mdiff;
shapeB.diff = Mdiff;
Mdiff.render();
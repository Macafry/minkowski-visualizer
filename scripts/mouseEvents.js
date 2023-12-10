function middleClick (evt, canvas, shape) {
    evt.preventDefault();

    if (evt.button === 1) {
        var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
    
        let x = (evt.clientX - rect.left) * scaleX;   // scale mouse coordinates after they have
        let y = (evt.clientY - rect.top) * scaleY;     // been adjusted to be relative to element

        let i = shape.findClosestPoint(x,y);
        shape.removePoint(i);
        shape.render();
    } 

};

function leftClick (evt, canvas, shape) {
    evt.preventDefault();
    var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
  
    let x = (evt.clientX - rect.left) * scaleX;   // scale mouse coordinates after they have
    let y = (evt.clientY - rect.top) * scaleY;     // been adjusted to be relative to element

    let scaledX = x/(canvas.width/2) - 1;
    let scaledY = 1 - y/(canvas.height/2);

    let point = [scaledX, scaledY];
    shape.addPoint(point);
    shape.render();
};

function rightDown (evt, canvas, shape) {
    if (evt.button === 0){
        var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
    
        let x = (evt.clientX - rect.left) * scaleX;   // scale mouse coordinates after they have
        let y = (evt.clientY - rect.top) * scaleY;     // been adjusted to be relative to element

        shape.selectedPointIndex = shape.findClosestPoint(x,y);
    }else if (evt.button === 1) {
        middleClick(evt, canvas, shape);
    }
};

function rightDrag (evt, canvas, shape) {
    if (evt.button === 0){
        if(shape.selectedPointIndex == -1){
            return;
        }

        var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
    
        let x = (evt.clientX - rect.left) * scaleX;   // scale mouse coordinates after they have
        let y = (evt.clientY - rect.top) * scaleY;     // been adjusted to be relative to element
        
        shape.changeSelectedPoint(x,y);
        shape.render();
    }
};

function rightUp (shape){ shape.selectedPointIndex = -1;};
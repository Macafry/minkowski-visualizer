class Minkowski extends Shape {
    constructor(shapeA, shapeB, boundCanvas, lineColor, pointColor, operation) {
        super(boundCanvas, lineColor, pointColor);
        this.shapeA = shapeA;
        this.shapeB = shapeB;
        this.operation = operation;

        this.update();
    }

    update(){
        let pointsA = this.shapeA.points;
        let pointsB = this.shapeB.points;
        let pointsOp = [];
    
        for(let i = 0; i < pointsA.length; i++) {
            for(let j = 0; j < pointsB.length; j++) {
                let diffX = this.operation(pointsA[i][0], pointsB[j][0]);
                let diffY = this.operation(pointsA[i][1], pointsB[j][1]);
    
                pointsOp.push([diffX,diffY])   
            }
        }
        
        this.points = hull(pointsOp);
    }

    render(){
        this.update();
        super.render();
    }

}
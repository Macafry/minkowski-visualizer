class Shape {
    constructor(canvas, lineColor, pointColor){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.lineColor = lineColor;
        this.pointColor = pointColor;

        this.points = [];
        this.selectedPointIndex = -1;
        
    }

    addPoint(point) {
        this.points.push(point);
    }

    removePoint(i) {
        this.points.splice(i,1);
    }

    hullify() {
        return hull(this.points);
    }

    render() {
        let w = this.canvas.width;
        let h = this.canvas.height
        this.ctx.clearRect(0, 0, w, h);

        // draw axis
        this.ctx.strokeStyle = "#000";
        this.ctx.beginPath();
        this.ctx.moveTo(w/2, 0);
        this.ctx.lineTo(w/2, h);
        this.ctx.stroke()
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo(0, h/2);
        this.ctx.lineTo(w, h/2);
        this.ctx.stroke()
        this.ctx.closePath();

        // draw convex hull
        let cvx_hl = this.hullify()
        let begining = cvx_hl[0];

        this.ctx.strokeStyle = this.lineColor;
        this.ctx.beginPath();
        
        this.ctx.moveTo((w/2)*(1+begining[0]), (h/2)*(1-begining[1]));
        for(let i = 1; i < cvx_hl.length; i++) {
            let point = cvx_hl[i];
            this.ctx.lineTo((w/2)*(1+point[0]), (h/2)*(1-point[1]));
        }
        this.ctx.stroke()
        this.ctx.closePath();

        // draw points
        this.ctx.fillStyle = this.pointColor;
        for(let i = 0; i < this.points.length; i++) {
            let point = this.points[i];
            this.ctx.fillRect((w/2)*(1+point[0])-1, (h/2)*(1-point[1])-1, 3, 3);
        }

        if(this.sum != null){
            this.sum.render();
        }

        if(this.diff != null){
            this.diff.render();
        }
        
    }



    findClosestPoint(x,y) {
        let w = this.canvas.width;
        let h = this.canvas.height
        let minDist2 = 0.005;
        let minIndex = -1;
        let scaledX = x/(w/2) - 1;
        let scaledY = 1 - y/(h/2);
 
        for(let i = 0; i < this.points.length; i++) {
            let point = this.points[i];
            let dx = scaledX - point[0];
            let dy = scaledY - point[1];
            let dist2 = dx*dx + dy*dy;

            if (dist2 < minDist2) {
                minDist2 = dist2;
                minIndex = i;
            }
        }

        return minIndex;
    }

    changeSelectedPoint(x,y) {
        let i = this.selectedPointIndex;
        let w = this.canvas.width;
        let h = this.canvas.height
        let scaledX = x/(w/2) - 1;
        let scaledY = 1 - y/(h/2);
        
        this.points[i][0] = scaledX;
        this.points[i][1] = scaledY;

    }

}
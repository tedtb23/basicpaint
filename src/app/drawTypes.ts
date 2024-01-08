export const drawLine = (context: CanvasRenderingContext2D, paths: Paths, lineColor: string, lineWidth: number) => {
    context.beginPath();
    context.imageSmoothingEnabled = true;
    context.strokeStyle = lineColor;
    context.lineWidth = lineWidth;

    const startPath = paths.previousPath ?? paths.currentPath;
    const startPoint = startPath.previousPoint ?? startPath.currentPoint;
    const thirdPoint = paths.currentPath.previousPoint ?? paths.currentPath.currentPoint;
    
    const points: Point[] = [{x: startPoint.x, y: startPoint.y},
                             {x: startPath.currentPoint.x, y: startPath.currentPoint.y},
                             {x: thirdPoint.x, y: thirdPoint.y},
                             {x: paths.currentPath.currentPoint.x, y: paths.currentPath.currentPoint.y}];

    // Cubic Bézier curve
context.beginPath();
context.moveTo(startPoint.x, startPoint.y);
context.bezierCurveTo(points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y);
context.stroke();

// Start and end points
context.fillStyle = "blue";
context.beginPath();
context.arc(startPoint.x, startPoint.y, 5, 0, 2 * Math.PI); // Start point
context.arc(points[3].x, points[3].y, 5, 0, 2 * Math.PI); // End point
context.fill();

// Control points
context.fillStyle = "red";
context.beginPath();
context.arc(points[1].x, points[1].y, 5, 0, 2 * Math.PI); // Control point one
context.arc(points[2].x, points[2].y, 5, 0, 2 * Math.PI); // Control point two
context.fill();


    /*
    for(let i = 0; i < points.length; i++) {
      console.log(String(i) + ": x: " + String(points[i].x) + " y: "+ String(points[i].y))
    }
    console.log("\n\n")
    */

    //curveThroughPoints(context, points);
    //context.moveTo(paths.currentPath.previousPoint?.x ?? paths.currentPath.currentPoint.x, 
                   //paths.currentPath.previousPoint?.y ?? paths.currentPath.currentPoint.y);
    //context.lineTo(paths.currentPath.currentPoint.x, paths.currentPath.currentPoint.y);
    //context.stroke();
    //context.closePath(); 
    
    //context.fillStyle = lineColor;
    //context.beginPath();
    //context.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    //context.fill();
    //context.closePath();
    
};
  //TODO: FIX ME
const curveThroughPoints = (context: CanvasRenderingContext2D, points: Point[]) => {
    context.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length - 2; i++) {
      var xc = (points[i].x + points[i + 1].x) / 2;
      var yc = (points[i].y + points[i + 1].y) / 2;
      context.quadraticCurveTo(xc, yc, points[i].x, points[i].y);
    }
      context.quadraticCurveTo(
        points[i].x,
        points[i].y,
        points[i + 1].x,
        points[i + 1].y
      );
      context.stroke();
}
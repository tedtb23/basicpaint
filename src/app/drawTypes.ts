export const drawLine = (context: CanvasRenderingContext2D, path: Path, lineColor: string, lineWidth: number) => {
    const startPoint = path.previousPoint ?? path.currentPoint;
    const endPoint = path.currentPoint;

    context.strokeStyle = lineColor;
    context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(endPoint.x, endPoint.y);
    context.stroke();
    context.closePath(); 
    
    /*
    const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

    context.fillStyle = lineColor;
    context.beginPath();
    for(let i = 0.01; i < 1; i += 0.01) {
      const currX = lerp(startPoint.x, endPoint.x, i);
      const currY = lerp(startPoint.y, endPoint.y, i);
      context.arc(currX, currY, 5, 0, 2 * Math.PI);
      context.fill();
    }
    context.closePath();
    */

    context.fillStyle = lineColor;
    context.beginPath();
    context.arc(endPoint.x, endPoint.y, lineWidth / 2, 0, 2 * Math.PI);
    context.fill();
    context.closePath()
};
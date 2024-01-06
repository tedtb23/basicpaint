export const drawLine = (context: CanvasRenderingContext2D, path: Path, lineColor: string, lineWidth: number) => {
    console.log(lineColor)
    context.beginPath();
    context.strokeStyle = lineColor;
    context.lineWidth = lineWidth;
    const startPoint = path.previousPoint ?? path.currentPoint;
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(path.currentPoint.x, path.currentPoint.y);
    context.stroke();

    context.fillStyle = lineColor;
    context.beginPath();
    context.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
};
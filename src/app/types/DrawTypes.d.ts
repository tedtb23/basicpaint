type Line = {
    type: string = "Line"
    startPoint: Point | null;
    endPoint: Point;
    lineColor: string;
    lineWidth: number;
}

type Rect = {
    type: string = "Rect"
    topLeft: Point;
    botRight: Point;
    lineColor: string;
    lineWidth: number;
}
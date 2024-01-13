type DrawTypes = {
    type: string = "Brush" | "Line" | "Rect" | "Erase";
};

type Line = {
    type: string = "Line" | "Erase";
    startPoint: Point | null;
    endPoint: Point;
    lineColor: string;
    lineWidth: number;
};

type Rect = {
    type: string = "Rect";
    startPoint: Point;
    endPoint: Point;
    color: string;
};
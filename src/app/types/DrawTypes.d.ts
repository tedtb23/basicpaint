type DrawTypes = {
    type: string = "Brush" | "Line" | "Rect" | "Erase" | "Image";
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

type Image = {
    type: string = "Image";
    img: HTMLImageElement;
}
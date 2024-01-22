type Line = {
    type: string;
    startPoint: Point | null;
    endPoint: Point;
    lineColor: string;
    lineWidth: number;
};

type Rect = {
    type: string;
    startPoint: Point;
    endPoint: Point;
    color: string;
};

type Image = {
    type: string;
    img: HTMLImageElement;
}
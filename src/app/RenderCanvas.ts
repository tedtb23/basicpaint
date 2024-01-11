'use client';
import { RefObject } from "react";
class RenderCanvas{

  private static content: CanvasElement[] = [];
  private static contentPos: number = -1;

  public static pushElement = (element: CanvasElement) => {
    this.content[++this.contentPos] = element;
  }

  public static renderElementComponent (context: CanvasRenderingContext2D, component: Line | Rect) {
    switch(component.type) {
      case "Line":
        // @ts-ignore
        this.renderLine(context, component);
      break;
      case "Rect":
        // @ts-ignore
        this.renderRect(context, component);
      break;
      default:
        throw new Error("Unknown Draw Type on Canvas Render");
    }
  };

  public static rerenderCanvas = (canvasRef: RefObject<HTMLCanvasElement>) => {
    const context = canvasRef.current?.getContext("2d");
    if(!context) return;
    this.clear(canvasRef, false);
    for(let element of this.content) {
      for(let component of element.components) {
        this.renderElementComponent(context, component);
      }
    }
  }

  public static clear = (canvasRef: RefObject<HTMLCanvasElement>, clearContent: boolean) => {
    if(clearContent) {
      this.content = [];
      this.contentPos = -1;
    }
    const canvas = canvasRef.current;
    if(!canvas) return;
    const context = canvas.getContext("2d");
    context?.clearRect(0, 0, canvas.width, canvas.height);
  };

  public static undo = (canvasRef: RefObject<HTMLCanvasElement>) => {
    const context = canvasRef.current?.getContext("2d");
    if(this.contentPos >= 0 && context) {
      this.contentPos--;
      this.clear(canvasRef, false);
      
      for(let i = 0; i <= this.contentPos; i++) {
        let element = this.content[i];
        for(let component of element.components) {
          this.renderElementComponent(context, component);
        }
      }
    }
  };

  public static redo = (canvasRef: RefObject<HTMLCanvasElement>) => {
    const context = canvasRef.current?.getContext("2d");
    if(this.contentPos < this.content.length - 1 && context) {
      const element = this.content[++this.contentPos];
      for(let component of element.components) {
        this.renderElementComponent(context, component);
      }
    }
  };
  
  private static renderLine = (context: CanvasRenderingContext2D, 
    line: Line) => {

    const startPoint = line.startPoint ?? line.endPoint;
    const endPoint = line.endPoint;
    const color = line.lineColor;
    const width = line.lineWidth;

    context.strokeStyle = color;
    context.lineWidth = width;
    context.beginPath();
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(endPoint.x, endPoint.y);
    context.stroke();
    context.closePath();
    //const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
    context.fillStyle = color;
    context.beginPath();
    context.arc(endPoint.x, endPoint.y, width / 2, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
  };

  private static renderRect = (context: CanvasRenderingContext2D, 
    rect: Rect) => {

    //canvasRef.current
    //let tempCtx : CanvasRenderingContext2D();
  };
};
export default RenderCanvas;

'use client';
import { RefObject } from "react";
/**
 * Provides logic for rendering several different draw types to a canvas.
 * Must call setCanvasRef first with a canvas reference before using class methods.
 */
class RenderCanvas{

  private static canvasRef: RefObject<HTMLCanvasElement>;
  private static currComponentsBuf: CanvasElement = {components: []};
  private static content: CanvasElement[] = [];
  private static contentPos: number = -1;
  private static context: CanvasRenderingContext2D | undefined | null;

  /**
   * Sets the canvas reference for the class. 
   * Must be called before other class methods are used.
   * 
   * @param canvasRef The reference to the canvas which will be rendered to.
   */
  public static setCanvasRef(canvasRef: RefObject<HTMLCanvasElement>) {
    this.canvasRef = canvasRef;
    this.context = canvasRef.current?.getContext("2d");
  }


  /**
   * Clears the buffer and pushes all buffer contents to the undo/redo stack.
   * Call this method everytime you want to delineate
   * how much is undone/redone between undo() and redo() calls.
   */
  public static clearBuf() {
    if(this.currComponentsBuf.components.length <= 0) return;
    this.content[++this.contentPos] = Object.assign({}, this.currComponentsBuf);
    this.currComponentsBuf.components = [];
    /*
    slice away the content at the end incase of these events 
    1. undo more than one element
    2. draw new element
    3. redo
    not doing this could cause behavior probably not intended by the user
    */
    this.content = this.content.slice(0 , this.contentPos + 1);
  }


  /**
   * Pushes the given component to the buffer and renders it.
   * 
   * Note: For the undo and redo method to work properly 
   * clearBuf should be called everytime you want to delineate
   * a new undoable/redoable element.
   * 
   * @param component The component to render to the canvas context.
   */
  public static pushAndRender (component: Line | Rect) {
    this.render(component, true);
  }

  /*
  public static rerenderCanvas (canvasRef: RefObject<HTMLCanvasElement>) {
    const context = canvasRef.current?.getContext("2d");
    if(!context) return;
    this.clear(canvasRef, false);
    for(let element of this.content) {
      for(let component of element.components) {
        this.(context, component);
      }
    }
  }
  */

  public static clear (clearContent: boolean) {
    if(clearContent) {
      this.content = [];
      this.currComponentsBuf.components = [];
      this.contentPos = -1;
    }
    const canvas = this.canvasRef?.current;
    if(!canvas) throw new Error("RenderCanvas has no canvas (has setCanvasRef been called?)");
    this.context?.beginPath();
    this.context?.clearRect(0, 0, canvas.width, canvas.height);
    this.context?.closePath();
  };

  public static undo () {
    if(this.contentPos >= 0) {
      this.contentPos--;
      this.clear(false);
      for(let i = 0; i <= this.contentPos; i++) {
        let element = this.content[i];
        for(let component of element.components) {
          this.render(component, false);
        }
      }
    }
  };

  public static redo () {
    if(this.contentPos < this.content.length - 1) {
      const element = this.content[++this.contentPos];
      for(let component of element.components) {
        this.render(component, false);
      }
    }
  };

  private static render (component: Line | Rect, push: boolean) {
    switch(component.type) {
      case "Line":
        // @ts-ignore
        this.renderLine(component);
      break;
      case "Rect":
        // @ts-ignore
        this.renderRect(component);
      break;
      case "Erase":
        //@ts-ignore
        this.erase(component);
      break;
      default:
        throw new Error("Unknown Draw Type on Canvas Render");
    }
    if(push) this.currComponentsBuf.components.push(component);
  };
  
  private static renderLine (line: Line) {
    const ctx = this.context;
    if(!ctx) throw new Error("RenderCanvas has no context (has setCanvasRef been called?)");
    const startPoint = line.startPoint ?? line.endPoint;
    const endPoint = line.endPoint;
    const color = line.lineColor;
    const width = line.lineWidth;

    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.stroke();
    ctx.closePath();
    //const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
    ctx.fillStyle = color;
    ctx.beginPath();
    //round off the startPoint and end of the line
    ctx.arc(startPoint.x, startPoint.y, width / 2, 0, 2 * Math.PI);
    ctx.arc(endPoint.x, endPoint.y, width / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  };

  private static renderRect (rect: Rect) {
    const ctx = this.context;
    if(!ctx) throw new Error("RenderCanvas has no context (has setCanvasRef been called?)");
    ctx.fillStyle = rect.color;
    const startPoint = rect.startPoint;
    const endPoint = rect.endPoint;
    const width = Math.abs(endPoint.x - startPoint.x);
    const height = Math.abs(endPoint.y - startPoint.y);
    ctx.beginPath();
    if(startPoint.x > endPoint.x && startPoint.y > endPoint.y) {
      //quad 1
      ctx.fillRect(endPoint.x, endPoint.y, width, height);
    }else if(startPoint.x < endPoint.x && startPoint.y > endPoint.y){
      //quad 2
      ctx.fillRect(startPoint.x, startPoint.y - height, width, height);
    }else if(startPoint.x < endPoint.x && startPoint.y < endPoint.y) {
      //quad 3
      ctx.fillRect(startPoint.x, startPoint.y, width, height);
    }else {
      //quad 4
      ctx.fillRect(startPoint.x - width, startPoint.y, width, height);
    }
    ctx.closePath();
  };

  private static erase(line: Line) {
    const ctx = this.context;
    if(!ctx) throw new Error("RenderCanvas has no context (has setCanvasRef been called?)");
    const startPoint = line.startPoint ?? line.endPoint;
    const lWidth = line.lineWidth;

    ctx.lineWidth = lWidth;
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.clearRect(startPoint.x - 6, startPoint.y - 6, lWidth + 10, lWidth + 10);
    ctx.closePath();
  }
};
export default RenderCanvas;

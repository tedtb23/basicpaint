'use client';
import { RefObject } from "react";
/**
 * Provides a public interface for drawing on an HTML Canvas with undo/redo functionality.
 * Must call setCanvasRef first with a canvas reference before using class methods.
 */
class RenderCanvas{
  private static canvasRef: RefObject<HTMLCanvasElement>;
  private static context: CanvasRenderingContext2D | undefined | null;
  private static currComponentsBuf: CanvasElement = {components: []};
  private static content: CanvasElement[] = [];
  private static contentPos: number = -1;

  /**
   * 
   * @returns The current canvas reference.
   */
  public static getCanvasRef() {
    return this.canvasRef ?? null;
  };

  /**
   * Sets the canvas reference for the class. 
   * Must be called before other class methods are used.
   * 
   * @param canvasRef The reference to the canvas which will be rendered to.
   */
  public static setCanvasRef(canvasRef: RefObject<HTMLCanvasElement>) {
    this.canvasRef = canvasRef;
    this.context = canvasRef.current?.getContext("2d");
  };


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
  };


  /**
   * Pushes the given component to the buffer and renders it.
   * 
   * Note: For the undo and redo method to work properly 
   * clearBuf should be called everytime you want to delineate
   * a new undoable/redoable element.
   * 
   * @param component The component to render to the canvas context.
   */
  public static pushAndRender (component: Line | Rect | Image) {
    this.render(component, true);
  };

  /**
   * 
   * @returns The current canvas in the format of a png image in a data URL.
   */
  public static toDataURL() {
    return this.getCanvas()?.toDataURL("image/png") ?? "data:image/png;base64,";
  };

  /**
   * Resizes the canvas to the given dimensions and redraws
   * all canvas elements.
   * 
   * @param size The new size of the canvas.
   */
  public static resizeCanvas(size: {width: number, height: number}) {
    const canvas = this.getCanvas();
    if(!canvas) return;
    canvas.width = size.width;
    canvas.height = size.height;
    if(this.content.length >= 0) {
      for(let element of this.content) {
        for(let component of element.components) {
          this.render(component, false);
        }
      }
    }
  };
  
  /**
   * Clears all the content from the canvas.
   * @param clearContent Determines whether or not undo/redo stack will be cleared.
   */
  public static clear (clearContent: boolean) {
    if(clearContent) {
      this.content = [];
      this.currComponentsBuf.components = [];
      this.contentPos = -1;
    }

    const ctx = this.getContext();
    const canvas = this.getCanvas();
    if(!canvas || !ctx) return;
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
  };

  /**
   * Undoes the previous action taken on the canvas delineated by calls to clearBuf.
   */
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

  /**
   * Redoes the previous action taken on the canvas delineated by calls to clearBuf.
   */
  public static redo () {
    if(this.contentPos < this.content.length - 1) {
      const element = this.content[++this.contentPos];
      for(let component of element.components) {
        this.render(component, false);
      }
    }
  };

  /**
   * Renders the given component to the canvas.
   * @param component The component to render to the canvas.
   * @param push Determines whether or not the given component will be pushed into the current component buffer.
   */
  private static render (component: Line | Rect | Image, push: boolean) {
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
      case "Image":
        //@ts-ignore
        this.renderImage(component);
      break;
      default:
        throw new Error("Unknown Draw Type on Canvas Render");
    }
    if(push) this.currComponentsBuf.components.push(component);
  };
  
  /**
   * Renders the given line to the canvas.
   * @param line The line to render to the canvas.
   */
  private static renderLine (line: Line) {
    const ctx = this.getContext();
    if(!ctx) return;
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

  /**
   * Renders the given rectangle to the canvas.
   * @param rect The rectangle to render to the canvas.
   */
  private static renderRect (rect: Rect) {
    const ctx = this.getContext();
    if(!ctx) return;
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

  /**
   * Erases a rectangle surrounding the 
   * given lines startpoint (or endpoint if the line's startpoint is null) from the canvas.
   * @param line The line who's surroundings at the startpoint will be erased.
   */
  private static erase(line: Line) {
    const ctx = this.getContext();
    if(!ctx) return;
    const startPoint = line.startPoint ?? line.endPoint;
    const lWidth = line.lineWidth;

    ctx.lineWidth = lWidth;
    ctx.beginPath();
    ctx.clearRect(startPoint.x - 10, startPoint.y - 10, lWidth + 15, lWidth + 15);
    ctx.closePath();
  };

  /**
   * Renders the given image to the canvas.
   * @param image The image to render to the canvas.
   */
  private static renderImage(image: Image) {
    const ctx = this.getContext();
    const canvas = this.getCanvas();
    if(!ctx || !canvas) return;
    ctx.drawImage(image.img, canvas.width / 6, 0);
  };

  private static getCanvas() {
    //if(!this.canvasRef?.current) throw new Error("RenderCanvas has no canvas (has setCanvasRef been called?)");
    return this.canvasRef.current ?? null;
  };

  private static getContext() {
    //if(!this.context) throw new Error("RenderCanvas has no context (has setCanvasRef been called?)");
    return this.context ?? null;
  };
};
export default RenderCanvas;
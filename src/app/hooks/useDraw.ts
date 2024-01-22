'use client';

import { useState, useRef, useEffect } from "react";
import RenderCanvas from "../RenderCanvas"

/**
 * Handles mouse move, down, and up events on RenderCanvas's canvas, using
 * them to draw with the given drawType, color, and lineWidth.
 * 
 * @param color The current color to draw to the canvas.
 * @param lineWidth The current line width to draw to the canvas.
 * @param drawType The current draw type that will be drawn to the canvas.
 */
export const useDraw = (
  color: string, 
  lineWidth: number, 
  drawType: string) => {

  const startPoint = useRef<Point | null>(null);
  const prevPoint = useRef<Point | null>(null);
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    /**
     * Calls render canvas with the appropiate component based on the 
     * given draw type.
     * 
     * @param event The mouse move event
     */
    const moveHandler = (event: MouseEvent) => {
      if (!mouseDown) return;
      const currPoint = computeCanvasPoint(event);
      if (!currPoint) return;
      if(!startPoint.current) startPoint.current = currPoint;

      let currComponent: any;
      switch(drawType) {
        case "Brush":
          currComponent = {type: "Line", startPoint: prevPoint.current, endPoint: currPoint, 
            lineColor: color, lineWidth: lineWidth };
          RenderCanvas.pushAndRender(currComponent);
        break;
        case "Line": 
          currComponent = {type: drawType, startPoint: startPoint.current, endPoint: currPoint, 
            lineColor: color, lineWidth: lineWidth };
          //allow for the line to temporarily be drawn and redrawn on each mouse move.
          if(prevPoint.current) RenderCanvas.undo();
          RenderCanvas.pushAndRender(currComponent);
          RenderCanvas.clearBuf();
        break;
        case "Rect":
          currComponent = {type: drawType, startPoint: startPoint.current, 
            endPoint: currPoint, color: color};
          //allow for the rectangle to temporarily be drawn and redrawn on each mouse move.
          if(prevPoint.current) RenderCanvas.undo();
          RenderCanvas.pushAndRender(currComponent);
          RenderCanvas.clearBuf();
        break;
        case "Erase":
          currComponent = {type: drawType, startPoint: prevPoint.current, endPoint: currPoint, 
            lineColor: "", lineWidth: lineWidth };
          RenderCanvas.pushAndRender(currComponent);
        break;
        default:
          throw new Error("Unknown Draw Type on Canvas Render");
      }
      prevPoint.current = currPoint;
    };

    /**
     * Calculates the relative point on the canvas given
     * the absolute screen position from the mouse event.
     * @param event The mouse event.
     * @returns A point with an x and y coordinate.
     */
    const computeCanvasPoint = (event: MouseEvent) => {
      const canvas = RenderCanvas.getCanvasRef().current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      return { x, y };
    };

    const downHandler = () => {
      setMouseDown(true);
    };

    /**
     * Clears the buffer of the current components drawn on the canvas.
     * Meaning the undo/redo stack of RenderCanvas will move between
     * actions taken each mouse up event.
     * Sets relevant data back to their respective defaults.
     */
    const upHandler = () => {
      RenderCanvas.clearBuf();
      setMouseDown(false);
      startPoint.current = null;
      prevPoint.current = null;
    };

    RenderCanvas.getCanvasRef().current?.addEventListener("mousemove", moveHandler);
    RenderCanvas.getCanvasRef().current?.addEventListener("mousedown", downHandler);
    window?.addEventListener("mouseup", upHandler);
    return () => {
      RenderCanvas.getCanvasRef().current?.removeEventListener("mousemove", moveHandler);
      RenderCanvas.getCanvasRef().current?.removeEventListener("mousedown", downHandler);
      window?.removeEventListener("mouseup", upHandler);
    };
  });

  return;
};
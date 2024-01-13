'use client';

import { useState, useRef, useEffect, RefObject } from "react";
import RenderCanvas from "../RenderCanvas"

export const useDraw = (
  canvasRef: RefObject<HTMLCanvasElement>,
  color: string, 
  lineWidth: number, 
  drawType: DrawTypes) => {

  const startPoint = useRef<Point | null>(null);
  const prevPoint = useRef<Point | null>(null);
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {

    const moveHandler = (event: MouseEvent) => {
      if (!mouseDown) return;
      const currPoint = computeCanvasPoint(event);
      if (!currPoint) return;
      if(!startPoint.current) startPoint.current = currPoint;

      let currComponent: any;
      switch(drawType.type) {
        case "Brush":
          currComponent = {type: "Line", startPoint: prevPoint.current, endPoint: currPoint, 
            lineColor: color, lineWidth: lineWidth };
          RenderCanvas.pushAndRender(currComponent);
        break;
        case "Line": 
          currComponent = {type: "Line", startPoint: startPoint.current, endPoint: currPoint, 
            lineColor: color, lineWidth: lineWidth };
          if(prevPoint.current) RenderCanvas.undo();
          RenderCanvas.pushAndRender(currComponent);
          RenderCanvas.clearBuf();
        break;
        case "Rect":
          currComponent = {type: drawType.type, startPoint: startPoint.current, 
            endPoint: currPoint, color: color};
          if(prevPoint.current) RenderCanvas.undo();
          RenderCanvas.pushAndRender(currComponent);
          RenderCanvas.clearBuf();
        break;
        case "Erase":
          currComponent = {type: "Erase", startPoint: prevPoint.current, endPoint: currPoint, 
            lineColor: 'rgba(0, 0, 0, 1)', lineWidth: lineWidth };
          RenderCanvas.pushAndRender(currComponent);
        break;
        default:
          throw new Error("Unknown Draw Type on Canvas Render");
      }
      prevPoint.current = currPoint;
    };

    const computeCanvasPoint = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      return { x, y };
    };

    const downHandler = () => {
      setMouseDown(true);
    };

    const upHandler = () => {
      RenderCanvas.clearBuf();
      setMouseDown(false);
      startPoint.current = null;
      prevPoint.current = null;
    };

    canvasRef.current?.addEventListener("mousemove", moveHandler);
    canvasRef.current?.addEventListener("mousedown", downHandler);
    window?.addEventListener("mouseup", upHandler);
    return () => {
      canvasRef.current?.removeEventListener("mousemove", moveHandler);
      canvasRef.current?.removeEventListener("mousedown", downHandler);
      window?.removeEventListener("mouseup", upHandler);
    };
  });

  return;
};
'use client';

import { useState, useRef, useEffect, RefObject } from "react";
import RenderCanvas from "../RenderCanvas"

export const useDraw = (canvasRef: RefObject<HTMLCanvasElement>, color: string, 
  lineWidth: number, drawType: string) => {

  const prevPoint = useRef<Point | null>(null);
  const currElement = useRef<CanvasElement | null>(null);
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const moveHandler = (event: MouseEvent) => {
      if (!mouseDown) return;
      const context = canvasRef.current?.getContext("2d");
      const currPoint = computeCanvasPoint(event);
      if (!context || !currPoint) return;
      if(!currElement.current) currElement.current = {components: []};
      let currComponent: Line | Rect;
      switch(drawType) {
        case "Line":
           currComponent = {type: drawType, startPoint: prevPoint.current, endPoint: currPoint, 
            lineColor: color, lineWidth: lineWidth };
        break;
        case "Rect":
            currComponent = {type: drawType, topLeft: prevPoint.current ?? currPoint, 
              botRight: currPoint, lineColor: color, lineWidth: lineWidth, fill: true};
        break;
        default:
          throw new Error("Unknown Draw Type on Canvas Render");
      }
      currElement.current.components.push(currComponent);
      RenderCanvas.renderElementComponent(context, currComponent);
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
      if(currElement.current) {
        RenderCanvas.pushElement(currElement.current);
        currElement.current = null;
      }
      setMouseDown(false);
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
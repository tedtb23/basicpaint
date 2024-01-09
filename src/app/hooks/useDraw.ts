import { useState, useRef, useEffect, RefObject } from "react";
import RenderCanvas from "../RenderCanvas"

export const useDraw = (canvasRef: RefObject<HTMLCanvasElement>, color: string, 
  lineWidth: number, drawType: string) => {

  const prevPoint = useRef<Point | null>(null);
  const currDraw = useRef<CanvasElement | null>(null);
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const moveHandler = (event: MouseEvent) => {
      if (!mouseDown) return;

      const context = canvasRef?.current?.getContext("2d");
      const currPoint = computeCanvasPoint(event);
      if (!context || !currPoint) return;
      if(!currDraw.current) currDraw.current = {components: []};
      switch(drawType) {
        case "Line":
          const currLine: Line= {type: drawType, startPoint: prevPoint.current, endPoint: currPoint, 
            lineColor: color, lineWidth: lineWidth };
          currDraw.current.components.push(currLine);
          RenderCanvas.renderLine(context, currLine);
          prevPoint.current = currPoint;
        break;
        case "Rect":

        break;
      }
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
      if(currDraw.current) {
        RenderCanvas.pushDraw(currDraw.current);
        currDraw.current = null;
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
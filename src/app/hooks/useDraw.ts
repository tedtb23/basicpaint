import { useState, useRef, useEffect } from "react";

export const useDraw = (
  onDraw: (context: CanvasRenderingContext2D, path: Path, color: string, lineWidth: number) => void
, color: string, lineWidth: number) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previousPoint = useRef<Point | null>(null);
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const moveHandler = (event: MouseEvent) => {
      if (!mouseDown) return;
      const context = canvasRef.current?.getContext("2d");
      const currentPoint = computeCanvasPoint(event);
      if (!context || !currentPoint) return;
      const currentPath = { currentPoint, previousPoint: previousPoint.current };
      onDraw(context, currentPath, color, lineWidth);
      previousPoint.current = currentPoint;
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
      setMouseDown(false);
      previousPoint.current = null;
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

  return {canvasRef};
};

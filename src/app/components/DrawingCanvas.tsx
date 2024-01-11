'use client';
import { RefObject, useEffect } from "react"
import { useWindowDimensions } from "../hooks/useWindowDimensions";

interface DrawingCanvasProps {
  id?: string,
  style?: string,
  canvasRef: RefObject<HTMLCanvasElement>
}

const DrawingCanvas = ({ id, style, canvasRef }: DrawingCanvasProps) => {
    let width = 1400;
    let height = 600;

  //const windowDimensions = useWindowDimensions(canvasRef);
  //width = windowDimensions?.width ?? width;
  //height = windowDimensions?.height ?? height

  style += " cursor-crosshair bg-stone-400 border border-black rounded"
  return (
    <>
      <canvas
        className={style}
        id={id}
        width={width*(3/4)}
        height={height}
        ref={canvasRef}
      >
        Canvas for drawing
      </canvas>
    </>
  );
};

export default DrawingCanvas;

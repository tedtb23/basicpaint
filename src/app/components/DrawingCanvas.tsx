'use client';
import { useRef } from "react";
import RenderCanvas from "../RenderCanvas";
import { useCanvasResize } from "../hooks/useCanvasResize";

interface DrawingCanvasProps {
  id?: string,
  style?: string
}

/**
 * 
 * @returns A canvas with a preset Tailwind style and referenced to RenderCanvas's canvas.
 */
const DrawingCanvas = ({ id, style }: DrawingCanvasProps) => {
  const {width: width, height: height} = useCanvasResize();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  RenderCanvas.setCanvasRef(canvasRef);

  style += " cursor-crosshair bg-stone-400 border border-black rounded"
  return (
    <>
      <canvas
        className={style}
        id={id}
        width={width}
        height={height}
        ref={RenderCanvas.getCanvasRef()}
      >
        Canvas for drawing
      </canvas>
    </>
  );
};

export default DrawingCanvas;

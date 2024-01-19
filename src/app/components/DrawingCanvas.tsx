'use client';
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
  const {x: width, y: height} = useCanvasResize();

  style += " cursor-crosshair bg-stone-400 border border-black rounded"
  return (
    <>
      <canvas
        className={style}
        id={id}
        width={width * (3/4)}
        height={height}
        ref={RenderCanvas.getCanvasRef()}
      >
        Canvas for drawing
      </canvas>
    </>
  );
};

export default DrawingCanvas;

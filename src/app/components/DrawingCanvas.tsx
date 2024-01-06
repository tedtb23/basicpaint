import { LegacyRef } from "react";

interface DrawingCanvasProps {
  canvasRef: LegacyRef<HTMLCanvasElement> | null;
}

const DrawingCanvas = ({ canvasRef }: DrawingCanvasProps) => {
  return (
    <canvas
      className="bg-stone-400 border border-black rounded"
      id="drawPane"
      width="1000"
      height="1000"
      ref={canvasRef}
    >
      Canvas for drawing
    </canvas>
  );
};

export default DrawingCanvas;

'use client'
import {useDraw} from "../hooks/useDraw"
import {drawLine} from "../drawTypes"
import {useWindowDimensions} from "../hooks/useWindowDimensions"
import { RefObject } from "react"

interface DrawingCanvasProps {
  id?: string,
  canvasRef: RefObject<HTMLCanvasElement>
}

const DrawingCanvas = ({ id, canvasRef }: DrawingCanvasProps) => {
  return (
    <>
      <canvas
      className="bg-stone-400 border border-black rounded"
      id={id}
      width="1000"
      height="600"
      ref={canvasRef}
      >
      Canvas for drawing
      </canvas>
    </>
  );
};

export default DrawingCanvas;

'use client';
import { useState, useRef, useEffect } from "react";
import DrawingCanvas from "./components/DrawingCanvas";
import { useDraw } from "./hooks/useDraw"
import CanvasSidebar from "./components/CanvasSidebar";
import RenderCanvas from "./RenderCanvas";

/**
 * @returns The main page of the application with a canvas and a sidebar that controls the canvas.
 */
const Page = () => {
  const [color, setColor] = useState("#000");
  const [lineWidth, setLineWidth] = useState("4");
  const [drawType, setDrawType] = useState("Brush");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  RenderCanvas.setCanvasRef(canvasRef)
  useDraw(color, Number(lineWidth), drawType);
  
  return (
    <div className="relative w-screen h-screen" id="wrapper">
        <CanvasSidebar 
            style="z-50 absolute top-0 left-0 
            px-2 py-1 bg-neutral-800 rounded border border-zinc-50 "
            id="sidebar"
            color={color}
            setColor={setColor}
            lineWidth={lineWidth} 
            setLineWidth={setLineWidth}
            drawType={drawType}
            setDrawType={setDrawType}
        />
      <DrawingCanvas style="z-0 fixed top-0" id="canvas"/>
    </div>
  );
};

export default Page;

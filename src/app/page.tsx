'use client';
import { useState, useRef, useEffect } from "react";
import DrawingCanvas from "./components/DrawingCanvas";
import { useDraw } from "./hooks/useDraw"
import CanvasSidebar from "./components/CanvasSidebar";
import RenderCanvas from "./RenderCanvas";

/**
 * @returns The main page of the application with a canvas and a sidebar that controls the canvas.
 */
const page = () => {
  const [color, setColor] = useState("#000");
  const [lineWidth, setLineWidth] = useState("4");
  const [drawType, setDrawType] = useState({type: "Brush"});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  RenderCanvas.setCanvasRef(canvasRef);
  useDraw(color, Number(lineWidth), drawType);
  
  return (
    <div className="relative w-screen h-screen overflow-scroll bg-black">
        <CanvasSidebar 
          style="z-50 absolute top-0 left-0 p-2 bg-neutral-800 rounded border border-zinc-50"
          color={color} 
          setColor={setColor}
          lineWidth={lineWidth} 
          setLineWidth={setLineWidth} 
          drawType={drawType}
          setDrawType={setDrawType}
        />
        <DrawingCanvas 
          style="z-0 fixed top-0 right-0"
        />
    </div>
  );
};

export default page;

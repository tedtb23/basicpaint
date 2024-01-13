"use client";
import { useState, useRef } from "react";
import DrawingCanvas from "./components/DrawingCanvas";
import { useDraw } from "./hooks/useDraw";
import CanvasSidebar from "./components/CanvasSidebar";
import RenderCanvas from "./RenderCanvas";

const page = () => {
  const [currColor, setCurrColor] = useState("#000");
  const [lineWidth, setLineWidth] = useState("4");
  const [drawType, setDrawType] = useState({type: "Brush"});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  RenderCanvas.setCanvasRef(canvasRef);
  useDraw(canvasRef, currColor, Number(lineWidth), drawType);
  
  return (
    <div className="relative w-screen h-screen overscroll-auto flex flex-row bg-zinc-900">
      <div className="z-50 absolute left-0 overscroll-contain p-2 bg-zinc-900 rounded border border-zinc-50">
        <CanvasSidebar 
          currColor={currColor} 
          setCurrColor={setCurrColor}
          lineWidth={lineWidth} 
          setLineWidth={setLineWidth} 
          drawType={drawType}
          setDrawType={setDrawType}
        />
      </div>
      <DrawingCanvas 
        style="z-0 fixed top-0 right-0" 
        canvasRef={canvasRef}
      />   
    </div>
  );
};

export default page;

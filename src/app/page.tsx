"use client";
import { useState, useRef } from "react";
import DrawingCanvas from "./components/DrawingCanvas";
import { useDraw } from "./hooks/useDraw";
import CanvasSidebar from "./components/CanvasSidebar";

const page = () => {
  const [lineWidth, setLineWidth] = useState("4");
  const [currColor, setCurrColor] = useState("#000");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDraw(canvasRef, currColor, Number(lineWidth), {type: "Brush"});
  
  return (
    <div className="relative w-screen h-screen overscroll-auto flex flex-row bg-zinc-900">
      <div className="z-50 absolute left-0 overscroll-contain p-2 bg-zinc-900 rounded border border-zinc-50">
        <CanvasSidebar 
          currColor={currColor} 
          setCurrColor={setCurrColor} 
          lineWidth={lineWidth} 
          setLineWidth={setLineWidth} 
          canvasRef={canvasRef}
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

"use client";
import { useState, useRef } from "react";
import DrawingCanvas from "./components/DrawingCanvas";
import { useDraw } from "./hooks/useDraw";
import CanvasButton from "./components/CanvasButton";
import CanvasSelect from "./components/CanvasSelect";
import ColorPicker from "./components/ColorPicker";
import RenderCanvas from "./RenderCanvas";

const page = () => {
  const [lineWidth, setLineWidth] = useState("4");
  const [currColor, setCurrColor] = useState("#000");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDraw(canvasRef, currColor, Number(lineWidth), "Line");
  
  return (
    <>
    <div className="relative w-screen h-screen bg-zinc-900">
      <div className="absolute right-0 ">
        <DrawingCanvas canvasRef={canvasRef}/>
      </div>
      <div className="absolute left-0 ">
        <ColorPicker handleChange={setCurrColor} currColor={currColor}></ColorPicker>
        <CanvasButton 
          type="reset" 
          handleClick={() => RenderCanvas.clear(canvasRef, true)} 
          >
          Clear Canvas
        </CanvasButton>
        <CanvasSelect
          value={lineWidth}
          handleChangeItem={lWStr => setLineWidth(lWStr)} 
        >
          <option value="4">4px</option>
          <option value="6">6px</option>
          <option value="8">8px</option>
        </CanvasSelect>
        <CanvasButton type="button" handleClick={() => RenderCanvas.undo(canvasRef)}>
            Undo
        </CanvasButton>
        <CanvasButton type="button" handleClick={() => RenderCanvas.redo(canvasRef)}>
          Redo
        </CanvasButton>
      </div>
    </div>
    </>
  );
};

export default page;

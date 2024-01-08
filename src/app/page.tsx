"use client";
import { ColorResult, ChromePicker } from "react-color";
import { useState } from "react";
import DrawingCanvas from "./components/DrawingCanvas";
import { drawLine } from "./drawTypes";
import { useDraw } from "./hooks/useDraw";
import {handleClickClear} from "./clickTypes"
import CanvasButton from "./components/CanvasButton";

const page = () => {
  let lineWidth = 4;

  const [currColor, setCurrColor] = useState("#000");

  const handleChange = (color: ColorResult) => {
    setCurrColor(color.hex);
  };
  const { canvasRef } = useDraw(drawLine, currColor, lineWidth);
  
  return (
    <>
    <div className="relative w-screen h-screen bg-zinc-900">
      <div className="absolute right-0 ">
        <DrawingCanvas canvasRef={canvasRef}/>
      </div>
      <div className="absolute left-0 ">
        <ChromePicker
          disableAlpha={true}
          color={currColor}
          onChange={handleChange}
        />
        <CanvasButton type="reset" handleClick={handleClickClear} canvasRef={canvasRef}>Clear Canvas</CanvasButton>
      </div>
    </div>
    </>
  );
};

export default page;

"use client";
import { ColorResult, ChromePicker } from "react-color";
import { useState } from "react";
import DrawingCanvas from "./components/DrawingCanvas";
import { drawLine } from "./drawTypes";
import { useDraw } from "./hooks/useDraw";
import {handleClickClear} from "./clickTypes"
import CanvasButton from "./components/CanvasButton";
import CanvasSelect from "./components/CanvasSelect";

const page = () => {
  const handleChangeItem = (item: string) => {
    let itemN = Number(item);
    setLineWidth(itemN);
  }

  const [lineWidth, setLineWidth] = useState(4);
  const [currColor, setCurrColor] = useState("#000");

  const handleChangeColor = (color: ColorResult) => {
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
          onChange={handleChangeColor}
        />
        <CanvasButton type="reset" handleClick={handleClickClear} canvasRef={canvasRef}>Clear Canvas</CanvasButton>
        <CanvasSelect
          value={lineWidth}
          handleChangeItem={handleChangeItem} 
        >
          <option value="4">4px</option>
          <option value="6">6px</option>
          <option value="8">8px</option>
        </CanvasSelect>
      </div>
    </div>
    </>
  );
};

export default page;

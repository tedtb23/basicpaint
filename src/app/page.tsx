"use client";
import { ColorResult, ChromePicker } from "react-color";
import { useRef, useState } from "react";
import { useDraw } from "./hooks/useDraw";
import { drawLine } from "./drawTypes";
import DrawingCanvas from "./components/DrawingCanvas";

//^2.19.3

const page = () => {
  let lineWidth = 4;

  const [currColor, setCurrColor] = useState("#000");

  const handleChange = (color: ColorResult) => {
    setCurrColor(color.hex);
  };
  const { canvasRef, clear } = useDraw(drawLine, currColor, lineWidth);

  return (
    <>
      <div className="w-screen h-screen bg-zinc-900 flex justify-center items-center">
        <ChromePicker
          disableAlpha={true}
          color={currColor}
          onChange={handleChange}
        />
        <button
          type="reset"
          className="p-2 bg-zinc-900 text-white-700 font-semibold hover:bg-blue-500 hover:text-white-700 rounded border border-black-500 hover:border-white rounded"
          onClick={clear}
        >
          Clear Canvas
        </button>
        <DrawingCanvas canvasRef={canvasRef}></DrawingCanvas>
      </div>
    </>
  );
};

export default page;

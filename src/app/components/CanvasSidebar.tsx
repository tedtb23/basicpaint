'use client';

import RenderCanvas from "../RenderCanvas";
import CanvasButton from "./CanvasButton";
import CanvasSelect from "./CanvasSelect";
import ColorPicker from "./ColorPicker";
import BrushPNG from "../../images/Brush.png"
import StraightLinePNG from "../../images/Straight Line.png"
import { RefObject } from "react";


interface CanvasSidebarProps {
    currColor: string,
    setCurrColor: (color: string) => void,
    lineWidth: string,
    setLineWidth: (lWStr: string) => void,
    canvasRef: RefObject<HTMLCanvasElement>
}

const CanvasSidebar = ({currColor, setCurrColor, 
    lineWidth, setLineWidth, canvasRef}: CanvasSidebarProps ) => {
        
    return(  
        <div className="">
            <div className="flex flex-col">
                <ColorPicker handleChange={setCurrColor} currColor={currColor} />
                <CanvasButton
                    style="my-2"
                    type="reset"
                    handleClick={() => RenderCanvas.clear(canvasRef, true)}
                >
                    Clear Canvas
                </CanvasButton>
                <CanvasButton
                    style="mb-2"
                    type="button"
                    handleClick={() => RenderCanvas.undo(canvasRef)}
                >
                    Undo
                </CanvasButton>
                <CanvasButton
                    style="mb-1"
                    type="button"
                    handleClick={() => RenderCanvas.redo(canvasRef)}
                >
                    Redo
                </CanvasButton>
                <CanvasSelect
                    style="mb-2"
                    value={lineWidth}
                    handleChangeItem={lWStr => setLineWidth(lWStr)}
                >
                    <option value="4">4px</option>
                    <option value="6">6px</option>
                    <option value="8">8px</option>
                </CanvasSelect>
                <div className="grid grid-rows-2 grid-cols-2 place-content-between">
                    <CanvasButton style="" type="button" handleClick={() => console.log("hi")}>
                        <img className="ml-4" src={BrushPNG.src}></img>
                        Brush
                    </CanvasButton>
                    <CanvasButton style="" type="button" handleClick={() => { } }>
                        <img className="ml-7" src={StraightLinePNG.src}></img>
                        Line
                    </CanvasButton>
                    <CanvasButton style="" type="button" handleClick={() => { } }>
                        <img className="ml-7" src={StraightLinePNG.src}></img>
                        Rect
                    </CanvasButton>
                    <CanvasButton style="" type="button" handleClick={() => { } }>
                        <img className="ml-7" src={StraightLinePNG.src}></img>
                        Erase
                    </CanvasButton>
                </div>
            </div>
        </div>
    );
}

export default CanvasSidebar;
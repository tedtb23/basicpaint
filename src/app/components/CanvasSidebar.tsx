'use client';

import RenderCanvas from "../RenderCanvas";
import CanvasButton from "./CanvasButton";
import CanvasSelect from "./CanvasSelect";
import ColorPicker from "./ColorPicker";
import BrushPNG from "../../images/Brush.png"
import StraightLinePNG from "../../images/Straight Line.png"
import { RefObject, useState } from "react";


interface CanvasSidebarProps {
    currColor: string,
    setCurrColor: (color: string) => void,
    lineWidth: string,
    setLineWidth: (lWStr: string) => void,
    canvasRef: RefObject<HTMLCanvasElement>
}

const CanvasSidebar = ({currColor, setCurrColor, 
    lineWidth, setLineWidth, canvasRef}: CanvasSidebarProps ) => {
    
    const activeDrawStyle = "bg-blue-700 shadow-2xl shadow-blue-700";
    const [brushStyle, setBrushStyle] = useState(activeDrawStyle);
    const [lineStyle, setLineStyle]= useState("");
    const [rectStyle, setRectStyle]= useState("");
    const [eraseStyle, setEraseStyle] = useState("");

    const handleDrawTypesClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
         setBrushStyle("");
         setLineStyle("");
         setRectStyle("");
         setEraseStyle("");
         switch(event.currentTarget.id) {
            case "brush":
                setBrushStyle(activeDrawStyle);
            break;
            case "line":
                setLineStyle(activeDrawStyle);
            break;
            case "rect":
                setRectStyle(activeDrawStyle);
            break;
            case "erase":
                setEraseStyle(activeDrawStyle);
            break;
         };
    };

    return(  
        <div className="flex flex-col">
            <ColorPicker handleChange={setCurrColor} currColor={currColor} />
            <CanvasButton
                id="clear"
                style="my-2"
                type="reset"
                handleClick={() => RenderCanvas.clear(canvasRef, true)}
            >
                Clear Canvas
            </CanvasButton>
            <CanvasButton
                id="undo"
                style="mb-2"
                type="button"
                handleClick={() => RenderCanvas.undo(canvasRef)}
            >
                Undo
            </CanvasButton>
            <CanvasButton
                id="redo"
                style="mb-1"
                type="button"
                handleClick={() => RenderCanvas.redo(canvasRef)}
            >
                Redo
            </CanvasButton>
            <CanvasSelect
                id="lineWidth"
                style="mb-2 mt-1"
                value={lineWidth}
                handleChangeItem={lWStr => setLineWidth(lWStr)}
            >
                <option value="4">4px</option>
                <option value="6">6px</option>
                <option value="8">8px</option>
            </CanvasSelect>
            <div className="grid grid-rows-2 grid-cols-2 place-content-between">
                <CanvasButton
                    id="brush" 
                    style={brushStyle}
                    type="button" 
                    handleClick={e => handleDrawTypesClick(e)}
                >
                    <img className="ml-4" src={BrushPNG.src}></img>
                    Brush
                </CanvasButton>
                <CanvasButton 
                    id="line" 
                    style={lineStyle} 
                    type="button" 
                    handleClick={e => handleDrawTypesClick(e)}
                >
                    <img className="ml-7" src={StraightLinePNG.src}></img>
                    Line
                </CanvasButton>
                <CanvasButton 
                    id="rect" 
                    style={rectStyle} 
                    type="button" 
                    handleClick={e => handleDrawTypesClick(e)}
                >
                    <img className="ml-7" src={StraightLinePNG.src}></img>
                    Rect
                </CanvasButton>
                <CanvasButton 
                    id="erase" 
                    style={eraseStyle} 
                    type="button" 
                    handleClick={e => handleDrawTypesClick(e)}
                >
                    <img className="ml-7" src={StraightLinePNG.src}></img>
                    Erase
                </CanvasButton>
            </div>
        </div>
    );
}

export default CanvasSidebar;
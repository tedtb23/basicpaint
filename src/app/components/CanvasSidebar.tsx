'use client';

import RenderCanvas from "../RenderCanvas";
import CanvasButton from "./CanvasButton";
import CanvasSelect from "./CanvasSelect";
import getDrawTypeStyles from "../getDrawTypeStyles";
import CanvasColorPicker from "./CanvasColorPicker";
import CanvasInput from "./CanvasInput";
import CanvasLink from "./CanvasLink";
import { useState } from "react";
import BrushPNG from "../../images/Brush.png";
import StraightLinePNG from "../../images/Straight Line.png";
import RectanglePNG from "../../images/Rectangle.png";
import ErasePNG from "../../images/Erase.png";
import HamburgerPNG from "../../images/Hamburger.png"


interface CanvasSidebarProps {
    style?: string,
    id?: string,
    color: string,
    setColor: (color: string) => void,
    lineWidth: string,
    setLineWidth: (lWStr: string) => void,
    drawType: DrawTypes,
    setDrawType: (drawType: DrawTypes) => void,
}

/**
 * 
 * @returns A sidebar component with controls for RenderCanvas's canvas.
 */
const CanvasSidebar = ({
    style,
    id,
    color, setColor,
    lineWidth, setLineWidth, 
    drawType, setDrawType}: CanvasSidebarProps ) => {

    const [open, setOpen] = useState(true);
    style += " ";

    //change the Tailwind styles of the draw type buttons depending on the active draw type.
    const [brushStyle, lineStyle, rectStyle, eraseStyle] = getDrawTypeStyles(drawType);

    //change the current draw type to the clicked draw type button.
    const handleDrawTypesClick = 
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setDrawType({type: event.currentTarget.id});

    return(  
        <div className={style} id={id}>
            <CanvasButton 
              style="border-0 hover:scale-105"
              type="button"
              id="sidebar_toggle"
              handleClick={() => setOpen(!open)}
            >
              <img src={HamburgerPNG.src}></img>
            </CanvasButton>
            <div className={`flex flex-col ${open ? "": "hidden"}`}>
                <div className="flex flex-row">
                    <CanvasInput style="grow hover:scale-100" id="c_in_file"/>
                    <CanvasLink 
                        href={RenderCanvas.toDataURL()}
                        download="basicpaint image" 
                        style="grow hover:scale-100" 
                        id="c_out_file"
                    >
                        Save
                    </CanvasLink>
                </div>
                <CanvasColorPicker  color={color} setColor={setColor} />
                <CanvasButton
                    id="clear"
                    style="my-2 hover:scale-105"
                    type="reset"
                    handleClick={() => RenderCanvas.clear(true)}
                >
                    Clear Canvas
                </CanvasButton>
                <CanvasButton
                    id="undo"
                    style="mb-2 hover:scale-105"
                    type="button"
                    handleClick={() => RenderCanvas.undo()}
                >
                    Undo
                </CanvasButton>
                <CanvasButton
                    id="redo"
                    style="mb-1 hover:scale-105"
                    type="button"
                    handleClick={() => RenderCanvas.redo()}
                >
                    Redo
                </CanvasButton>
                <CanvasSelect
                    id="lineWidth"
                    style="mb-2 mt-1 hover:scale-105"
                    value={lineWidth}
                    handleChangeItem={lWStr => setLineWidth(lWStr)}
                >
                    <option value="4">4px</option>
                    <option value="6">6px</option>
                    <option value="8">8px</option>
                </CanvasSelect>
                <div className="grid grid-rows-2 grid-cols-2 place-content-between">
                    <CanvasButton
                        id="Brush" 
                        style={brushStyle}
                        type="button" 
                        handleClick={e => handleDrawTypesClick(e)}
                    >
                        <div className="grid grid-cols-1 grid-rows-3">
                            <img className="row-span-3 place-self-center" src={BrushPNG.src}></img>
                            Brush
                        </div>
                    </CanvasButton>
                    <CanvasButton 
                        id="Line" 
                        style={lineStyle} 
                        type="button" 
                        handleClick={e => handleDrawTypesClick(e)}
                    >
                        <div className="grid grid-cols-1 grid-rows-3">
                            <img className="row-span-3 place-self-center" src={StraightLinePNG.src}></img>
                            Line
                        </div>

                    </CanvasButton>
                    <CanvasButton 
                        id="Rect" 
                        style={rectStyle} 
                        type="button" 
                        handleClick={e => handleDrawTypesClick(e)}
                    >
                        <div className="grid grid-cols-1 grid-rows-3 gap-1.5 mt-3">
                            <img className="row-span-2 place-self-center" src={RectanglePNG.src}></img>
                            Rectangle
                        </div>
                    </CanvasButton>
                    <CanvasButton 
                        id="Erase" 
                        style={eraseStyle} 
                        type="button" 
                        handleClick={e => handleDrawTypesClick(e)}
                    >
                        <div className="grid grid-cols-1 grid-rows-3 gap-1 mt-3">
                            <img className="row-span-2 place-self-center" src={ErasePNG.src}></img>
                            Erase
                        </div>
                    </CanvasButton>
                </div>
            </div> 
        </div>
    );
}

export default CanvasSidebar
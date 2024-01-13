'use client';

import RenderCanvas from "../RenderCanvas";
import CanvasButton from "./CanvasButton";
import CanvasSelect from "./CanvasSelect";
import ColorPicker from "./ColorPicker";
import getDrawTypeStyles from "../getDrawTypeStyles";
import BrushPNG from "../../images/Brush.png";
import StraightLinePNG from "../../images/Straight Line.png";
import RectanglePNG from "../../images/Rectangle.png"
import ErasePNG from "../../images/Erase.png"


interface CanvasSidebarProps {
    currColor: string,
    setCurrColor: (color: string) => void,
    lineWidth: string,
    setLineWidth: (lWStr: string) => void,
    drawType: DrawTypes,
    setDrawType: (drawType: DrawTypes) => void
}

const CanvasSidebar = ({
    currColor, setCurrColor,
    lineWidth, setLineWidth, 
    drawType, setDrawType}: CanvasSidebarProps ) => {
    
    const [brushStyle, lineStyle, rectStyle, eraseStyle] = getDrawTypeStyles(drawType);

    const handleDrawTypesClick = 
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setDrawType({type: event.currentTarget.id});

    return(  
        <div className="flex flex-col">
            <ColorPicker handleChange={setCurrColor} currColor={currColor} />
            <CanvasButton
                id="clear"
                style="my-2"
                type="reset"
                handleClick={() => RenderCanvas.clear(true)}
            >
                Clear Canvas
            </CanvasButton>
            <CanvasButton
                id="undo"
                style="mb-2"
                type="button"
                handleClick={() => RenderCanvas.undo()}
            >
                Undo
            </CanvasButton>
            <CanvasButton
                id="redo"
                style="mb-1"
                type="button"
                handleClick={() => RenderCanvas.redo()}
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
                    id="Brush" 
                    style={brushStyle}
                    type="button" 
                    handleClick={e => handleDrawTypesClick(e)}
                >
                    <img className="ml-4" src={BrushPNG.src}></img>
                    Brush
                </CanvasButton>
                <CanvasButton 
                    id="Line" 
                    style={lineStyle} 
                    type="button" 
                    handleClick={e => handleDrawTypesClick(e)}
                >
                    <img className="ml-7" src={StraightLinePNG.src}></img>
                    Line
                </CanvasButton>
                <CanvasButton 
                    id="Rect" 
                    style={rectStyle} 
                    type="button" 
                    handleClick={e => handleDrawTypesClick(e)}
                >
                    <img className="ml-[25px] my-2.5" src={RectanglePNG.src}></img>
                    Rectangle
                </CanvasButton>
                <CanvasButton 
                    id="Erase" 
                    style={eraseStyle} 
                    type="button" 
                    handleClick={e => handleDrawTypesClick(e)}
                >
                    <img className="ml-[26px] my-2.5" src={ErasePNG.src}></img>
                    Erase
                </CanvasButton>
            </div>
        </div>
    );
}

export default CanvasSidebar
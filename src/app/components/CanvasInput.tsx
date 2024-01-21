'use client';
import { RefObject } from "react";
import RenderCanvas from "../RenderCanvas";

interface CanvasInputProps {
    name?: string,
    id: string,
    style?: string,
    inputRef?: RefObject<HTMLInputElement>
}

/**
 * Renders an image to RenderCanvas's canvas.
 * @returns A button which allows the user to pick a file to input to RenderCanvas's canvas on click.
 */
const CanvasInput = ({
    name="c_input", 
    id, 
    style,
    inputRef}: CanvasInputProps) => {

    style += " text-center text-white-700 font-semibold" 
    + " hover:bg-blue-500" 
    + " rounded border border-zinc-50 transition duration-150 ease-in-out transform"
    + " hover:-translate-y-1 hover:scale-100";

    //FIX ME
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fl = event.target.files;
        if(!fl) return;
        const files = Array.from(fl);
        const isImage = (file: File) => file['type'].includes('image');
        if(!isImage(files[0])) return;
        const img = new Image();
        img.onload = () => {
            const imgObj: Image = {type: "Image", img: img};
            RenderCanvas.pushAndRender(imgObj);
            RenderCanvas.clearBuf();
        }
        img.src = URL.createObjectURL(files[0]);
      };

    return (
        <>
            <input 
                className= "w-[0.1px] h-[0.1px] opacity-0 overflow-hidden absolute z-[-1]" 
                type="file"
                id={id}
                onChange={e => handleChange(e)}
                ref={inputRef}
            />
            <label 
                className= {style} 
                htmlFor={id}
            >
                Choose file
            </label>
        </>
    );
}

export default CanvasInput;
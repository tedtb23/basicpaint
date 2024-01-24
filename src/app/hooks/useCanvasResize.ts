import { useEffect, useState } from "react";
import RenderCanvas from "../RenderCanvas";

/**
 * Finds the dimensions of the current window and rerenders
 * the canvas to fit the new dimensions.
 * 
 * @returns The width and height which the canvas should assume.
 */
export const useCanvasResize = () => {
    const [size, setSize] = useState({width: 1600, height: 600});

    useEffect(() => {
        if(typeof window === 'undefined') return;
        const { innerWidth: width, innerHeight: height } = window;
        setSize({width: width, height: height});
    }, []);
    useEffect(() => {
        if(typeof window === 'undefined') return;
        window.onresize = () => {
            const { innerWidth: width, innerHeight: height } = window;
            RenderCanvas.resizeCanvas({width: width, height: height});
        }
    });
    return size;
}
import { useEffect, useState } from "react";
import RenderCanvas from "../RenderCanvas";

/**
 * Finds the dimensions of the current window and rerenders
 * the canvas to fit the new dimensions.
 * 
 * @returns The width(x) and height(y) which the canvas should assume.
 */
export const useCanvasResize = () => {
    const [size, setSize] = useState({x: 1600, y: 600});

    useEffect(() => {
        if(typeof window === 'undefined') return;
        const { innerWidth: width, innerHeight: height } = window;
        setSize({x: width, y: height});
    }, []);
    useEffect(() => {
        if(typeof window === 'undefined') return;
        window.onresize = () => {
            const { innerWidth: width, innerHeight: height } = window;
            setSize({x: width, y: height});
            RenderCanvas.rerender({x: size.x, y: size.y});
        }
    });
    return size;
}
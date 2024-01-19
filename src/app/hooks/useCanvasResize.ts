import { useEffect, useState } from "react";
import RenderCanvas from "../RenderCanvas";

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
            const xr = (width / size.x);
            const yr = (height / size.y);
            console.log("scaleX: " + xr + " scaleY: " + yr)
            //RenderCanvas.save();
            setSize({x: width, y: height});
            //RenderCanvas.restore({x: xr, y: yr});
            RenderCanvas.rerender({x: size.x, y: size.y});
        }
    });
    return size;
}
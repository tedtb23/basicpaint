'use client';
import { useState, useEffect, RefObject } from 'react';
import RenderCanvas from '../RenderCanvas';

//FIX ME
export const useWindowDimensions = (canvasRef: RefObject<HTMLCanvasElement>) => {
  if(typeof window === 'undefined') return;

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
      if(!canvasRef.current) return;
      RenderCanvas.rerenderCanvas(canvasRef);
    }

    window.addEventListener('resize',() => handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
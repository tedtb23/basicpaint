'use client';

import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
    id?: string,
    color: string,
    setColor: (color: string) => void,
    style?: string
}

/**
 * 
 * @returns A HexColorPicker component.
 */
const CanvasColorPicker = ({color, setColor, style}: ColorPickerProps) => {
    style += " ";

    return (
    <HexColorPicker
        className={style}
        color={color}
        onChange={color => setColor(color)}
    />
    );
}

export default CanvasColorPicker;
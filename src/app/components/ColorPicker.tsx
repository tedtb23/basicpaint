"use client";

import { ChromePicker } from "react-color";

interface ColorPickerProps {
    id?: string,
    handleChange: (color: string) => void,
    currColor: string,
    style?: string
}

const ColorPicker = ({handleChange, currColor, style}: ColorPickerProps) => {
    style += " ";

    return (
    <ChromePicker
        className={style}
        disableAlpha={true}
        color={currColor}
        onChange={color => handleChange(color.hex)}
    />
    );
}

export default ColorPicker;
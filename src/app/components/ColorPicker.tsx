import { ChromePicker } from "react-color";

interface ColorPickerProps {
    id?: string,
    handleChange: (color: string) => void,
    currColor: string
}

const ColorPicker = ({handleChange, currColor}: ColorPickerProps) => {
    return (<ChromePicker
        disableAlpha={true}
        color={currColor}
        onChange={color => handleChange(color.hex)}
    />);
}

export default ColorPicker;
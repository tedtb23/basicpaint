'use client';

/**
 * Assigns and returns one of the four strings with a Tailwind style 
 * indicating it is the active draw type depending on the given draw type.
 * 
 * @param drawType The current draw type to determine which draw type button gets the active style.
 * @returns A tuple with the new Tailwind styles of each draw type button.
 */
const getDrawTypeStyles = (drawType: DrawTypes) => {

    const activeDrawStyle = "bg-blue-700 shadow-2xl shadow-blue-700";
    let brushStyle: string = "";
    let lineStyle: string = "";
    let rectStyle: string = "";
    let eraseStyle: string = "";
    
    switch(drawType.type) {
        case "Brush":
            brushStyle = activeDrawStyle;
        break;
        case "Line":
            lineStyle = activeDrawStyle;
        break;
        case "Rect":
            rectStyle = activeDrawStyle;
        break;
        case "Erase":
            eraseStyle = activeDrawStyle;
        break;
    };

    return [brushStyle, lineStyle, rectStyle, eraseStyle];
};

export default getDrawTypeStyles;
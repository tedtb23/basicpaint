'use client';
import { ReactNode, RefObject } from "react";

interface CanvasSelectProps {
    children: ReactNode,
    value: string,
    name?: string,
    id?: string,
    style?: string,
    handleChangeItem: (item: string) => void,
    selectRef?: RefObject<HTMLSelectElement>;
}

/**
 * 
 * @returns A selection component with a preset Tailwind style.
 */
const CanvasSelect = ({
    children, 
    value, 
    name = "c_select", 
    id, 
    style, 
    handleChangeItem,
    selectRef}: CanvasSelectProps) => {

    style += " py-1.5 bg-neutral-800 text-center text-white-700 font-semibold"
    + " hover:bg-blue-500"
    + " rounded border border-zinc-50";

    return (
        <select 
            className={style}
            value={value}
            name={name} 
            id={id} 
            onChange={e => handleChangeItem(e.target.value)}
            ref={selectRef}
        >
            {children}
        </select>
    );
}

export default CanvasSelect;
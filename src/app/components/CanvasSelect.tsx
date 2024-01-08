import { ReactNode } from "react";

interface CanvasSelectProps {
    children: ReactNode,
    value: number,
    name?: string
    id?: string;
    handleChangeItem: (item: string) => void
}

const CanvasSelect = ({children, value, name = "c_select", id, handleChangeItem}: CanvasSelectProps) => {
    return (
        <select className="p-2.5 bg-zinc-900 text-white-700 font-semibold hover:bg-blue-500 hover:text-white-700 rounded border border-black-500 hover:border-white rounded"
        value={value}
        name={name} 
        id={id} 
        onChange={e => handleChangeItem(e.target.value)}
        >
            {children}
        </select>
    );
}

export default CanvasSelect;
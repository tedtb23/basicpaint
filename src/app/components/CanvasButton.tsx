'use client';
import { ReactNode, RefObject } from "react";

interface buttonProps {
  children: ReactNode,
  type: "reset" | "submit" | "button",
  name?: string;
  id?: string,
  style?: string,
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  buttonRef?: RefObject<HTMLButtonElement>
}

/**
 * @returns A button component with a preset Tailwind style.
 */
const CanvasButton = ({
  children,
  type,
  name = "c_button",
  id,
  style,
  handleClick,
  buttonRef
}: buttonProps) => {
  style += " text-center text-white-700 font-semibold" 
  + " hover:bg-blue-500 hover:-translate-y-1" 
  + " rounded border border-zinc-50 transition duration-150 ease-in-out transform";

  return (
    <button
        type={type}
        name={name}
        id={id}
        className={style}
        onClick={e => handleClick(e)}
        ref={buttonRef}
    >
        {children}
    </button>
  );
};

export default CanvasButton;

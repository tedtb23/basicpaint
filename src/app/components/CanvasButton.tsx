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
  + " hover:bg-blue-500" 
  + " rounded border border-zinc-50";

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

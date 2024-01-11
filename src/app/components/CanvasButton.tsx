import { ReactNode, RefObject } from "react";

interface buttonProps {
  children: ReactNode,
  type: "reset" | "submit" | "button",
  name?: string;
  id?: string,
  style?: string,
  handleClick: () => void
}

const CanvasButton = ({
  children,
  type,
  name = "c_button",
  id,
  style,
  handleClick
}: buttonProps) => {
  style += " bg-zinc-900 text-center text-white-700 font-semibold" 
  + " hover:bg-blue-500 hover:text-white-700 hover:border-white rounded" 
  + " rounded border border-zinc-50";

  return (
    <>
      <button
          type={type}
          name={name}
          id={id}
          className={style}
          onClick={handleClick}
        >
          {children}
        </button>
    </>
  );
};

export default CanvasButton;

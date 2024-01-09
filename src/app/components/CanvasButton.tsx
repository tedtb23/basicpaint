import { ReactNode, RefObject } from "react";

interface buttonProps {
  children: ReactNode,
  type: "reset" | "submit" | "button",
  name?: string;
  id?: string,
  handleClick: () => void
}

const CanvasButton = ({
  children,
  type,
  name = "c_button",
  id,
  handleClick
}: buttonProps) => {
  return (
    <>
      <button
          type={type}
          name={name}
          id={id}
          className="p-2 mt-1 bg-zinc-900 text-white-700 font-semibold
          hover:bg-blue-500 hover:text-white-700 hover:border-white rounded
          rounded border border-black-500"
          onClick={handleClick}
        >
          {children}
        </button>
    </>
  );
};

export default CanvasButton;

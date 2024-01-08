import { ReactNode, RefObject } from "react";

interface buttonProps {
  children: ReactNode,
  type: "reset" | "submit" | "button",
  name?: string;
  id?: string,
  handleClick: (canvasRef: RefObject<HTMLCanvasElement>) => void,
  canvasRef: RefObject<HTMLCanvasElement>
}

const CanvasButton = ({
  children,
  type,
  name = "c_button",
  id,
  handleClick,
  canvasRef
}: buttonProps) => {
  const onClick = () => handleClick(canvasRef);
  
  return (
    <>
      <button
          type={type}
          name={name}
          id={id}
          className="p-2 bg-zinc-900 text-white-700 font-semibold hover:bg-blue-500 hover:text-white-700 rounded border border-black-500 hover:border-white rounded"
          onClick={onClick}
        >
          {children}
        </button>
    </>
  );
};

export default CanvasButton;

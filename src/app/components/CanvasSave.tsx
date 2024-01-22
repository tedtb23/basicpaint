'use client';
import { ReactNode, RefObject, useState } from "react";
import RenderCanvas from "../RenderCanvas";

interface buttonProps {
  children: ReactNode,
  id?: string,
  style?: string,
  linkRef?: RefObject<HTMLAnchorElement>,
  download: string,
}

/**
 * @returns A link component with a preset Tailwind style.
 */
const CanvasSave = ({
  children,
  id,
  style,
  linkRef,
  download
}: buttonProps) => {
  style += " text-center text-white-700 font-semibold" 
  + " hover:bg-blue-500 hover:-translate-y-1 hover:scale-100" 
  + " rounded border border-zinc-50 transition duration-150 ease-in-out transform";

  const [href, setHref] = useState(RenderCanvas.toDataURL());
  const handleClick = () => setHref(RenderCanvas.toDataURL());

  return (
    <a
        href={href}
        id={id}
        className={style}
        ref={linkRef}
        download={download}
        onClick={handleClick}
    >
        {children}
    </a>
  );
};

export default CanvasSave;

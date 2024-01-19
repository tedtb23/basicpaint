'use client';
import { ReactNode, RefObject } from "react";

interface buttonProps {
  children: ReactNode,
  id?: string,
  style?: string,
  href: string,
  linkRef?: RefObject<HTMLAnchorElement>,
  download?: string
}

/**
 * @returns A link component with a preset Tailwind style.
 */
const CanvasLink = ({
  children,
  id,
  style,
  href,
  linkRef,
  download
}: buttonProps) => {
  style += " text-center text-white-700 font-semibold" 
  + " hover:bg-blue-500" 
  + " rounded border border-zinc-50";

  return (
    <a
        href={href}
        id={id}
        className={style}
        ref={linkRef}
        download={download}
    >
        {children}
    </a>
  );
};

export default CanvasLink;

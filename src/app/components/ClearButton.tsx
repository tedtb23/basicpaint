import { ReactNode } from "react";

interface buttonProps {
  children: ReactNode;
  onClick: () => void;
  currName: string;
  currID: string;
  typeName?: "primary" | "secondary" | "danger";
}

const Button = ({
  children,
  onClick,
  currName,
  currID,
  typeName = "primary",
}: buttonProps) => {
  return (
    <>
      <button>{children}</button>
    </>
  );
};

export default Button;

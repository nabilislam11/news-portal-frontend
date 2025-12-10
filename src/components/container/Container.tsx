import React, { type ReactNode } from "react";
interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={`container w-full md:w-[1400px] mx-auto px-4 md:px-0 ${className}`}>
      {children}
    </div>
  );
};

export default Container;

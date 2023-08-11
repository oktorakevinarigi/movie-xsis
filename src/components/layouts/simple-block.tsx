import { ReactNode, DetailedHTMLProps, HTMLAttributes } from "react";

import { cn } from "@/utils";

type SimpleBlockProps = {
  children: ReactNode;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function SimpleBlock({ children, ...restProps }: SimpleBlockProps) {
  const { className, ...rest } = restProps;
  return (
    <div className={cn("me-auto ms-auto w-full max-w-[1200px] px-5 xl:px-0", className)} {...rest}>
      {children}
    </div>
  );
}

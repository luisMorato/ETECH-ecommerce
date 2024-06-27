import { ComponentProps } from "react";

interface boxProps extends ComponentProps<"div">{}

const Box = ({ ...props }: boxProps) => {
  return (
    <div { ...props } className="flex items-center gap-4 flex-1 justify-between border-b pb-1" />
  )
}

export default Box;
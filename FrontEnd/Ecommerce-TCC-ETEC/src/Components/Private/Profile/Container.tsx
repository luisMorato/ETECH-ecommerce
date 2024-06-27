import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface containerProps extends ComponentProps<"div">{}

const Container = ({ ...props }: containerProps) => {
  return (
    <div { ...props } className={twMerge("bg-white flex-1 max-w-[250px] p-3 rounded-xl", props.className)}/>
  )
}

export default Container;
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface buttonProps extends ComponentProps<"button">{
  outline?: boolean
}

const Button = ({outline, ...props}: buttonProps) => {
  return (
    <button 
      {...props}
      className={twMerge(props.className, `text-nowrap font-medium px-5 py-1.5 rounded-3xl cursor-pointer ${!outline ? "bg-mainBlue text-white hover:bg-[#1678BE]" : "bg-transparent text-black border border-mainBlue hover:border-[#1678BE] hover:text-[#1678BE]"}`)}
    />
  )
}

export default Button;
import { ComponentProps } from "react";

interface tableButtonProps extends ComponentProps<"button"> {
    disabled?: boolean,
}

const TableButton = ({ disabled, ...props }: tableButtonProps) => {
  return (
    <button { ...props } disabled={disabled} className={`${disabled ? "text-neutral-500 hover:scale-100" : "text-black hover:scale-110"}`}/>
  )
}

export default TableButton;
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface fixedButtonProps extends ComponentProps<"button"> {}

const FixedButton = ({ ...props }: fixedButtonProps) => {
    return (
        <button { ...props } className={twMerge(props.className, "fixed z-40 flex items-center justify-center rounded-full")} />
    )
}

export default FixedButton;
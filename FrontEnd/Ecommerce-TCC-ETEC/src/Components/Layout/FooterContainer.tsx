import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface footerContainerProps extends ComponentProps<"div">{}

const FooterContainer = ({ ...props }: footerContainerProps) => {
  return (
    <div className={twMerge(props.className, "font-medium w-full px-3 md:px-0 md:w-1/4")} { ...props }/>
  )
}

export default FooterContainer
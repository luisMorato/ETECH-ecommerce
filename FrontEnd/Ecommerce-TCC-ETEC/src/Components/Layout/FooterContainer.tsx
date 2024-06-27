import { ComponentProps } from "react"

interface footerContainerProps extends ComponentProps<"div">{}

const FooterContainer = ({ ...props }: footerContainerProps) => {
  return (
    <div className="w-1/4 font-medium" { ...props }/>
  )
}

export default FooterContainer
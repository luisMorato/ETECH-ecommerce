import { ComponentProps } from "react";

interface footerListProps extends ComponentProps<"ul">{}

const FooterList = ({ ...props }: footerListProps) => {
  return (
    <ul { ...props } className="flex flex-col gap-3 mt-3 list-disc translate-x-5"/>
  )
}

export default FooterList;
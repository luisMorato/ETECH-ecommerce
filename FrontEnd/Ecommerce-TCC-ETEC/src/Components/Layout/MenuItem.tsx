import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface menuItemProps extends ComponentProps<'a'> {
    children: string | React.ReactElement,
}

const MenuItem = (props: menuItemProps) => {
  return (
    <a { ...props } className={twMerge("cursor-pointer border-r border-r-[#1678BE] text-lg font-medium py-3 px-6 hover:bg-[#1678BE]", props.className)}>
        <li>{ props.children }</li>
    </a>
  )
}

export default MenuItem;
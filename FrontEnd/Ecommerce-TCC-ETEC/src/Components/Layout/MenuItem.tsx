import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface menuItemProps extends ComponentProps<'a'> {}

const MenuItem = (props: menuItemProps) => {
  return (
    <a { ...props } className={twMerge("cursor-pointer border-r border-r-[#1678BE] text-lg text-nowrap font-medium py-2 px-6 hover:bg-[#1678BE]", props.className)}>
        <li>{ props.children }</li>
    </a>
  )
}

export default MenuItem;
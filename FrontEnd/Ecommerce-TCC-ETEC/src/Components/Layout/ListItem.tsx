import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface listItemProps extends ComponentProps<'a'> {
    isLastItem?: boolean,
    isSelected?: boolean,
    children: string | React.ReactElement,
}

const ListItem = ({ isLastItem, isSelected, ...props }: listItemProps) => {
  return (
    <a { ...props } className={twMerge("", props.className)}>
        <li className={`text-neutral-400 text-nowrap w-full hover:text-black hover:bg-neutral-200 last:border-none ${isSelected && "bg-neutral-200 text-black"}`}>
            <div className={`w-[90%] py-2 mx-auto ${isLastItem ? '' : 'border-b'}`}>
                { props.children }
            </div>
        </li>
    </a>
  )
}

export default ListItem;
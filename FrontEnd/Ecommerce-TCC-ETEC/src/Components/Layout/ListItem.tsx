import { Link, LinkProps } from 'react-router-dom';
import { twMerge } from "tailwind-merge";

interface listItemProps extends LinkProps {
    isLastItem?: boolean,
    isSelected?: boolean,
}

const ListItem = ({ isLastItem, isSelected, ...props }: listItemProps) => {
  return (
    <Link { ...props } className={twMerge("", props.className)}>
        <li className={`text-neutral-400 text-nowrap w-full hover:text-black hover:bg-neutral-200 last:border-none ${isSelected && "bg-neutral-200 text-black"}`}>
            <div className={`w-[90%] py-2 mx-auto ${isLastItem ? '' : 'border-b'}`}>
                { props.children }
            </div>
        </li>
    </Link>
  )
}

export default ListItem;
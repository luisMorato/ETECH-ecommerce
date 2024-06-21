import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface tableCellsProps extends ComponentProps<'td'>{}

const TableCells = ({ ...props }: tableCellsProps) => {
  return (
    <td { ...props } className={twMerge('px-4 py-2 font-medium text-left', props.className)}/>
  )
}

export default TableCells;
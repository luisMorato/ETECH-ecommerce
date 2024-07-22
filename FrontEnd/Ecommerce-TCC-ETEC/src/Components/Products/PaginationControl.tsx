import { SetStateAction } from "react";
import { 
    MdArrowBackIosNew, 
    MdOutlineArrowForwardIos,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight
} from "react-icons/md";

interface paginationProps {
    page: number,
    setPage: React.Dispatch<SetStateAction<number>>
    quantity: number,
    perPage: number
}

const PaginationControl = ({ page, setPage, quantity, perPage }: paginationProps) => {
    const pages = Math.ceil((quantity / perPage));
  
    const nextPage = () => {
        setPage((prevValue) => prevValue === pages ? prevValue : prevValue + 1);
    }

    const prevPage = () => {
        setPage((prevValue) => prevValue <= 1 ? prevValue : prevValue - 1);
    }

    const goToLastPage = () => {
        setPage(pages);
    }

    const goToFirstPage = () => {
        setPage(1);
    }

    return (
        <div className="absolute bottom-2 right-0 flex items-center justify-end gap-4 w-4/5 mx-auto mb-3 font-medium">
            <span className="max-sm:text-lg text-xl text-black">Page {page}/{pages}</span>
            <div className="flex items-center">
                <button
                    onClick={goToFirstPage}
                >
                    <MdKeyboardDoubleArrowLeft className={`max-sm:size-6 size-8 ${page === 1 ? "text-neutral-500 hover:scale-100" : "text-black hover:scale-110"}`} />
                </button>
                <button
                    onClick={prevPage}
                >
                    <MdArrowBackIosNew className={`max-sm:size-4 size-6 ${page === 1 ? "text-neutral-500 hover:scale-100" : "text-black hover:scale-110"}`} />
                </button>
            </div>
            <span className="max-sm:text-lg text-xl text-black">{page}</span>
            <div className="flex items-center gap-1">
                <button
                    onClick={nextPage}
                >
                    <MdOutlineArrowForwardIos className={`max-sm:size-4 size-6 ${page >= pages ? "text-neutral-500 hover:scale-100" : "text-black hover:scale-110"}`} />
                </button>
                <button
                    onClick={goToLastPage}
                >
                    <MdKeyboardDoubleArrowRight className={`max-sm:size-6 size-8 ${page >= pages ? "text-neutral-500 hover:scale-100" : "text-black hover:scale-110"}`} />
                </button>
            </div>
        </div>
    )
}

export default PaginationControl;
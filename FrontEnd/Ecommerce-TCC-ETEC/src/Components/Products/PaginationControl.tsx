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
    //const perPage = 8;
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
            <span className="text-xl text-black">Page {page}/{pages}</span>
            <div className="flex items-center">
                <button
                    onClick={goToFirstPage}
                >
                    <MdKeyboardDoubleArrowLeft size={30} className={`${page === 1 ? "text-neutral-500 hover:scale-100" : "text-black hover:scale-110"}`} />
                </button>
                <button
                    onClick={prevPage}
                >
                    <MdArrowBackIosNew size={20} className={`${page === 1 ? "text-neutral-500 hover:scale-100" : "text-black hover:scale-110"}`} />
                </button>
            </div>
            <span className="text-xl text-black">{page}</span>
            <div className="flex items-center gap-1">
                <button
                    onClick={nextPage}
                >
                    <MdOutlineArrowForwardIos size={20} className={`${page >= pages ? "text-neutral-500 hover:scale-100" : "text-black hover:scale-110"}`} />
                </button>
                <button
                    onClick={goToLastPage}
                >
                    <MdKeyboardDoubleArrowRight size={30} className={`${page >= pages ? "text-neutral-500 hover:scale-100" : "text-black hover:scale-110"}`} />
                </button>
            </div>
        </div>
    )
}

export default PaginationControl;
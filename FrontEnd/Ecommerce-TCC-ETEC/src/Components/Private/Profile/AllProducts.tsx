import { 
    Suspense,
    useEffect, 
    useMemo, 
    useState,
} from "react";

import { 
    MdArrowBackIosNew, 
    MdOutlineArrowForwardIos,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight
} from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";

import { productProps } from "../../../interfaces/productsProps";

import TableCells from "../../Layout/TableCells";
import Loading from "../../Layout/Loading";
import { checkTextLength } from "../../../utils/checkTextLength";
import { toast } from "react-toastify";
import TableButton from "../../Layout/TableButton";

interface allProductsProps {
    token: string | undefined
}

const AllProducts = ({ token }: allProductsProps) => {
    const currentUrl = useMemo(() => new URL(window.location.toString()), []);

    const [products, setProducts] = useState<productProps[]>([]);
    const [quantity, setQuantity] = useState<number>();

    const pages = useMemo(() => quantity && Math.ceil(quantity / 10), [quantity]) ?? 0;
    const currentPage = currentUrl.searchParams.get('page');
    const [page, setPage] = useState<number>(Number(currentPage) || 1);

    const currentSearch = currentUrl.searchParams.get('search');
    const [productSearch, setProductSearh] = useState(currentSearch || '');

    useEffect(() => {
        const fetchProducts = async () => {
            const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/products`);

            url.searchParams.set('perPage', String(10));
            url.searchParams.set('pageIndex', String(page - 1));
            if(productSearch.length > 0){
                currentUrl.searchParams.set('search', productSearch);
                window.history.pushState(null, '', currentUrl);

                url.searchParams.set('query', productSearch);
                setPage(1);
            }

            currentUrl.searchParams.set('page', String(page));
            window.history.pushState(null, '', currentUrl);

            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json"
                    }
                });
    
                if(response.ok){
                    const resJson = await response.json();
                    const { products: apiProducts, quantity: apiQuantity } = resJson;

                    setQuantity(apiQuantity);
                    setProducts(apiProducts);
                }
            } catch (error) {
                console.log('Error: ', error);
            }
        }

        fetchProducts();
    }, [productSearch, currentUrl, page]);

    const removeDbProduct = async (productId: number) => {
        const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/products`);

       try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ productId })
            });

            const resJson = await response.json();
            const { message } = resJson;

            if(!response.ok){
                toast.error(message);
                return;
            }

            toast.success(message);
            setPage(1);
       } catch (error) {
            console.log('Error: ', error);
       }
    }

    const nextPage = () => {
        setPage((prevValue) => prevValue >= pages ? prevValue : prevValue + 1);
    }

    const goToFirstPage = () => {
        setPage(1);
    }

    const prevPage = () => {
        setPage((prevValue) => prevValue <= 1 ? prevValue : prevValue - 1);
    }

    const goToLastPage = () => {
        setPage(pages);
    }
  
    return (
        <div className="text-black py-5">
            <h1 className="text-3xl font-medium">Database Products</h1>
            <div className="relative flex items-center px-3 my-5 w-80 text-neutral-400 border border-neutral-400 rounded-2xl">
                <span className="group-focus:text-black">
                    <IoIosSearch size={25} />
                </span>
                <input
                    name="searchDbProduct"
                    type="text"
                    placeholder="Search for Database Product..."
                    value={productSearch}
                    className="bg-transparent py-1 pl-3 focus:outline-none flex-1 group"
                    onChange={(e) => setProductSearh(e.target.value)}
                />
            </div>
            {<Suspense fallback={<Loading />}>
                <div className="border border-neutral-400 rounded-2xl">
                    <table>
                        <thead>
                            <tr className="border-b border-neutral-400">
                                <TableCells>Code</TableCells>
                                <TableCells>Name</TableCells>
                                <TableCells>Price</TableCells>
                                <TableCells>Stock</TableCells>
                                <TableCells>Category</TableCells>
                                <TableCells>SubCategory</TableCells>
                                <TableCells className="text-center">Delete</TableCells>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.map((product) => (
                                <tr className="border-b border-neutral-400" key={product.id}>
                                    <TableCells className="font-normal text-center">{product.id}</TableCells>
                                    <TableCells>{checkTextLength(product.name, 50)}</TableCells>
                                    <TableCells className="font-normal">${(product.price).toFixed(2).replace('.', ',')}</TableCells>
                                    <TableCells className="font-normal text-center">{product.stock}</TableCells>
                                    <TableCells className="font-normal">{product.categories?.name}</TableCells>
                                    <TableCells className="font-normal">{product.subCategories?.name}</TableCells>
                                    <TableCells className="flex justify-center font-normal">
                                        <button
                                            onClick={() => removeDbProduct(product.id)}
                                        >
                                            <FaTrashAlt size={20} className="cursor-pointer hover:text-red-600 hover:rotate-12"/>
                                        </button>
                                    </TableCells>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={6} className="pl-4 py-2 font-medium">Showing {products.length} of {quantity} Items</td>
                                <td className="flex items-center gap-3 pr-4 py-2">
                                    <span className="text-nowrap font-medium">Page {page} of {pages}</span>
                                    <div className="flex items-center">
                                        <TableButton
                                            disabled={page === 1}
                                            onClick={goToFirstPage}
                                        >
                                            <MdKeyboardDoubleArrowLeft size={25} />
                                        </TableButton>
                                        <TableButton
                                            disabled={page === 1}
                                            onClick={prevPage}
                                        >
                                            <MdArrowBackIosNew size={15} />
                                        </TableButton>
                                        <TableButton
                                            disabled={page >= pages}
                                            onClick={nextPage}
                                        >
                                            <MdOutlineArrowForwardIos size={15} />
                                        </TableButton>
                                        <TableButton
                                            disabled={page >= pages}
                                            onClick={goToLastPage}
                                        >
                                            <MdKeyboardDoubleArrowRight size={25} />
                                        </TableButton>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </Suspense>}
        </div>
    )
}

export default AllProducts;
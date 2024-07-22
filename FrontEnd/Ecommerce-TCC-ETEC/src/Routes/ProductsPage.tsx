import { 
  useCallback, 
  useContext, 
  useEffect, 
  useMemo, 
  useState
} from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { UseSessionStorage } from "../Hooks/useSessionStorage";
import { SearchContext } from "../Context/SearchContext";

import { productProps } from "../interfaces/productsProps";

import ProductCard from "../Components/Layout/ProductCard";
import SideBar from "../Components/Products/SideBar/SideBar";
import PaginationControl from "../Components/Products/PaginationControl";
import SmallScreenFilters from "../Components/Products/SideBar/SmallScreenFilters";
import { BsSliders } from "react-icons/bs";

const ProductsPage = () => {
  const currentUrl = useMemo(() => new URL(window.location.toString()), []);
  const { token } = UseSessionStorage('token');
  const { setSearch, search } = useContext(SearchContext);

  const URLcategory = currentUrl.searchParams.get('category') ?? '';
  const URLsubCategory = currentUrl.searchParams.get('subcategory') ?? '';
  const URLbrand = currentUrl.searchParams.get('brand') ?? '';
  const URLPage = Number(currentUrl.searchParams.get('page'));
  const [priceInterval, setPriceInterval] = useState(5);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [products, setProducts] = useState<productProps[]>([]);
  const [quantity, setQuantity] = useState<number>();
  const [page, setPage] = useState<number>(URLPage || 1);
  const perPage = 8;

  const [currentWindowSize, setCurrentWindowSize] = useState(window.innerWidth);

  //Function That Adds Some Product to the User's Cart
  const addProduct = useCallback(async (productId: number) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/cart/add`;

    const product = {
      quantity: 1,
      productId,
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "authorization": `Bearer ${token || ' '}`,
          "content-type": "application/json"
        },
        body: JSON.stringify(product)
      });
  
      const resJson = await response.json();
      const { message } = resJson;
 
      if(!response.ok){
        toast.error(message);
        return;
      }

      toast.success(message);
    } catch (error) {
      console.log('Error: ', error);
    }
  }, [token]);

  //Function That Remove Some Product to the User's Cart
  const subtractProduct = useCallback(async (productId: number) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/cart/add`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "authorization": `Bearer ${token}`,
          "content-type": "application/json"
        },
        body: JSON.stringify(productId)
      });

      const resJson = await response.json();
      const { message } = resJson;

      if(!response.ok){
        toast.error(message);
        return;
      }

      toast.success(message);
    } catch (error) {
      console.log('Error: ', error);
    }
  }, [token]);

  //Remove All Filters, such as SubCategory | Brands | Free Shipping | Price Interval
  const clearFilters = () => {
    const currentUrl = new URL(window.location.toString());
    currentUrl.searchParams.delete('subcategory');
    currentUrl.searchParams.delete('brand');
    window.history.pushState(null, '', currentUrl);
    window.location.reload();
    setPriceInterval(5);
  }

  //Fetch Products Stored in the Database, Based in the Category | SubCategory | Search | Brand Passed to the Backend as a Filter Parameter
  useEffect(() => {
    const fetchProducts = async () => {
      const productURL = new URL(`${import.meta.env.VITE_BACKEND_URL}/products`);

      productURL.searchParams.set('category', URLcategory);
      productURL.searchParams.set('subcategory', URLsubCategory);
      productURL.searchParams.set('brand', URLbrand);
      productURL.searchParams.set('perPage', String(perPage));
      productURL.searchParams.set('pageIndex', String(page - 1));

      if(search !== ''){
        productURL.searchParams.set('query', search);
      }

      currentUrl.searchParams.set('page', String(page));
      window.history.pushState(null, '', currentUrl);

      try {
        const response = await fetch(productURL, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          }
        });
  
        if(response.ok){
          const resJson = await response.json();
  
          const { products: apiProducts, quantity: productQuantity } = resJson;
    
          setProducts(apiProducts);
          setQuantity(productQuantity);
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    }

    fetchProducts();
  }, [URLcategory, URLsubCategory, URLbrand, page, currentUrl, search]);

  window.addEventListener('resize', () => {
    setCurrentWindowSize(window.innerWidth);
  });

  window.addEventListener('load', () => {
    setCurrentWindowSize(window.innerWidth);
  })
  
  //ToDo: Add Skeleton Loader
  return URLcategory ? (
    <div className={`flex h-full overflow-hidden ${currentWindowSize >= 570 ? "flex-row" : "flex-col"}`}>
      {currentWindowSize >= 570 ? (
        <SideBar
          category={URLcategory}
          setPriceInterval={setPriceInterval}
          priceInterval={priceInterval}
          clearFilters={clearFilters}
        />
      )
      :
      ( 
        <>
          <div 
            className={`relative flex items-center justify-end bg-white py-3 w-full px-6
            ${isFilterModalOpen && "blur-md pointer-events-none"}`}
          >
            <button
                onClick={() => setIsFilterModalOpen(true)}
                className="flex items-center gap-2 border border-mainBlue rounded-full px-3 py-1"
            >
                <BsSliders size={20} className="text-mainBlue shrink-0" />
                <span className="text-lg text-black font-medium">Filters</span>
            </button>
          </div>
          {(isFilterModalOpen &&
            <SmallScreenFilters 
              category={URLcategory}
              setPriceInterval={setPriceInterval}
              priceInterval={priceInterval}
              setIsFilterModalOpen={setIsFilterModalOpen}
              setSearch={setSearch}
              search={search}
              clearFilters={clearFilters}
            />
          )}
        </>
      )}
      <div 
        className={`relative mx-auto pl-5
          ${currentWindowSize >= 570 ? "w-4/5" : "w-full px-3"}
          ${isFilterModalOpen && "blur-md pointer-events-none"}
        `}
      >
        <h1 className="text-3xl text-black font-medium mt-5">Products</h1>
        <div className="flex max-lg:justify-center flex-wrap gap-8 py-5 mb-12">
          {products?.length > 0 ? 
            products
            ?.filter((product) => priceInterval > 5 ? product.price <= priceInterval : product)
            ?.map((product) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  addProduct={addProduct}
                  subtractProduct={subtractProduct}
                />
            ))
            :
            (
              <div className="h-full flex-1">
                <h2 className="text-center text-2xl text-black font-medium">No Products Found</h2>
              </div>
            )
          }
        </div>
        {quantity &&
          <PaginationControl
            page={page}
            setPage={setPage}
            quantity={quantity}
            perPage={perPage}
          />
        }
      </div>
    </div>
  ) : <Navigate to="/"></Navigate>
}

export default ProductsPage;
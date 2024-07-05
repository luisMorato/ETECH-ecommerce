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

const ProductsPage = () => {
  const currentUrl = useMemo(() => new URL(window.location.toString()), []);
  const { search } = useContext(SearchContext);
  const { token } = UseSessionStorage('token');

  const URLcategory = currentUrl.searchParams.get('category') ?? '';
  const URLsubCategory = currentUrl.searchParams.get('subcategory') ?? '';
  const URLbrand = currentUrl.searchParams.get('brand') ?? '';
  const URLPage = Number(currentUrl.searchParams.get('page'));
  const [priceInterval, setPriceInterval] = useState(5);

  const [products, setProducts] = useState<productProps[]>([]);
  const [quantity, setQuantity] = useState<number>();
  const [page, setPage] = useState<number>(URLPage || 1);

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

  //Fetch Products Stored in the Database, Based in the Category | SubCategory | Search | Brand Passed to the Backend as a Filter Parameter
  useEffect(() => {
    const fetchProducts = async () => {
      const productURL = new URL(`${import.meta.env.VITE_BACKEND_URL}/products`);

      productURL.searchParams.set('category', URLcategory);
      productURL.searchParams.set('subcategory', URLsubCategory);
      productURL.searchParams.set('brand', URLbrand);
      productURL.searchParams.set('perPage', String(8));
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
  
  return URLcategory ? (
    <div className="flex h-full">
      <SideBar
        category={URLcategory}
        setPriceInterval={setPriceInterval}
        priceInterval={priceInterval}
      />
      <div className="relative w-4/5 mx-auto">
        <h1 className="text-3xl text-black font-medium mr-10 mt-5">Products</h1>
        <div className="flex flex-wrap gap-8 p-5 mb-12">
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
          />
        }
      </div>
    </div>
  ) : <Navigate to="/"></Navigate>
}

export default ProductsPage;
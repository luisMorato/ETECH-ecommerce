import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { SearchContext } from "../Context/SearchContext";
import { UseSessionStorage } from "../Hooks/useSessionStorage";

import { productProps } from "../interfaces/productsProps";

import ProductCard from "../Components/Layout/ProductCard";
import PaginationControl from "../Components/Products/PaginationControl";

const Search = () => {
  const { token } = UseSessionStorage('token');
  const { search } = useContext(SearchContext);

  const currentUrl = useMemo(() => new URL(window.location.toString()), []);
  const URLPage = Number(currentUrl.searchParams.get('page'));

  const [products, setProducts] = useState<productProps[]>([]);
  const [page, setPage] = useState(URLPage || 1);
  const [quantity, setQuantity] = useState(0);
  const perPage = 10;

  //Fetch All the Products That Corresponds to the Current Search Input Value
  useEffect(() => {
    const fetchProducts = async () => {
      const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/products`);
  
      url.searchParams.set('perPage', String(10));
      url.searchParams.set('pageIndex', String(page - 1));

      if(search.length > 0){
        url.searchParams.set('query', search);
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
          const { products: searchredProducts, quantity: apiQuantity } = resJson;

          setProducts(searchredProducts);
          setQuantity(apiQuantity);
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    }

    fetchProducts();
  }, [search, page, currentUrl]);

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
  
  return (
    <div className="relative px-8 py-8">
      <h1 className="text-2xl text-black font-medium mb-8">You Are Searching For: {search}</h1>
      <div className="flex flex-wrap gap-5 mb-8">
        {products?.length > 0 ?
          products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addProduct={addProduct}
            />
          ))
          :
          (
            <div>
              <h2 className="text-lg text-black font-medium">No Products Found</h2>
            </div>
          )
        }
      </div>
      <PaginationControl 
          setPage={setPage}
          page={page}
          quantity={quantity}
          perPage={perPage}
      />
    </div>
  )
}

export default Search;
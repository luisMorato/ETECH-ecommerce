import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { SearchContext } from "../Context/SearchContext";
import { UseSessionStorage } from "../Hooks/useSessionStorage";

import { productProps } from "../interfaces/productsProps";

import ProductCard from "../Components/Layout/ProductCard";

const Search = () => {
  const { token } = UseSessionStorage('token');
  const { search } = useContext(SearchContext);

  const [products, setProducts] = useState<productProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/products`);
  
      if(search.length > 0){
        url.searchParams.set('query', search);
        url.searchParams.set('perPage', String(100));
      }

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "content-type": "application/json"
          }
        });
    
        if(response.ok){
          const resJson = await response.json();
          const { products: searchredProducts } = resJson;

          setProducts(searchredProducts);
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    }

    fetchProducts();
  }, [search]);

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
    <div className="px-8 py-8">
      <h1 className="text-2xl text-black font-medium mb-8">You Are Searching For: {search}</h1>
      <div className="flex flex-wrap gap-5 px-10">
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
    </div>
  )
}

export default Search;
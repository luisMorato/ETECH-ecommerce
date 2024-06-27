import { FormEvent, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { UseSessionStorage } from "../Hooks/useSessionStorage";

import { productProps } from "../interfaces/productsProps";

import ProductDetails from "../Components/Products/ProductDetails";
import CommentsSection from "../Components/Products/CommentsSection";
import ProductImages from "../Components/Products/ProductImages";

interface commentProps {
  id: number,
  text: string,
  user: {
    id: number, 
    name: string, 
    image?: string,
  }
}

const IndividualProduct = () => {
  const { token } = UseSessionStorage('token');

  const { productId } = useParams();

  const [product, setProduct] = useState<productProps>();

  const [images, setImages] = useState<string[]>();
  const [currentImage, setCurrentImage] = useState(0);
  const [comments, setComments] = useState<commentProps[]>([]);

  const [text, setText] = useState('');
  const [commentAdded, setCommentAdded] = useState(false);

  //Used to Fetch Especific Product Data, based on the URL parameter called ProductId
  useEffect(() => {
    const fetchProduct = async () => {
      if(productId){
        const productsURL = new URL(`${import.meta.env.VITE_BACKEND_URL}/products/${productId}`);
        const imagesURL = new URL(`${import.meta.env.VITE_BACKEND_URL}/products/images/${productId}`);

        const [productsResponse, productsImagesResponse] = await Promise.all([
          fetch(productsURL, {
            method: "GET"
          }),
          fetch(imagesURL, {
            method: "GET",
          })
        ]);

        if(productsResponse.ok){
          const productsJson = await productsResponse.json();
          const { product: apiProduct } = productsJson;

          setProduct(apiProduct);
          setComments(apiProduct.comment);
          setCommentAdded(false);
        }

        if(productsImagesResponse.ok){
          const res = await productsImagesResponse.json();
          const { imagesBuffer } = res;

          const imageUrls: string[] = await imagesBuffer.map((imageBuffer: { type: string, data: number[] }) => {
            const imgBlob = new Blob([new Uint8Array(imageBuffer.data)], { type: 'image/jpg' });
            return URL.createObjectURL(imgBlob);
          });

          setImages(imageUrls);
        }
      }
    }
    
    fetchProduct();
  }, [productId, commentAdded]);

  const quantitySold = useMemo(() => Math.floor(Math.random() * 100), []);
  const installments = useMemo(() => Math.floor(Math.random() * 12), []);

  //Function That Adds the Current Product to the User's Cart
  const addProduct = async (productId: number | undefined) => {
    if(!productId){
      toast.error('Something Went Wrong!');
    }

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
  };

  //Function That Adds a User's comment to the Current Product
  const addComment = async (e: FormEvent<HTMLFormElement>, text: string) => {
    e.preventDefault();
    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/comments/${productId}`);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": 'application/json',
          "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ text }),
      });

      if(response.ok){
        const resJson = await response.json();
        const { message } = resJson;

        if(!response.ok){
          toast.error(message);
          return;
        }

        toast.success(message);
        setCommentAdded(true);
        setText('');
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  return product && (
    <div className="flex flex-col gap-4 text-black mx-auto py-5 w-3/5">
        <div>
          <p className="text-neutral-400 font-medium mb-1">New | {quantitySold} Sold</p>
          <div className="flex gap-5 justify-between bg-white rounded-xl py-5 px-10">
            <div className="flex flex-col">
              <h1 className="text-lg font-medium mb-3">{product.name}</h1>
              <div className="flex items-center justify-center bg-neutral-300 rounded-full w-6 h-6 mt-2">
                <span className="text-xs font-medium">{currentImage + 1}/{product.image.length}</span>
              </div>
               <ProductImages 
                  images={images}
                  product={product}
                  setCurrentImage={setCurrentImage}
                  currentImage={currentImage}
               />
            </div>
            <ProductDetails
              price={product.price}
              installments={installments}
              stock={product.stock}
              productId={product.id}
              addProduct={addProduct}
            />
          </div>
          <div className="flex flex-col bg-white rounded-xl p-5 mt-5">
              <h2 className="font-medium text-xl">Product Description</h2>
              <p className="text-neutral-400 font-medium">What You Need To Know About This Product</p>
              <ul className="flex flex-col gap-3 w-4/5 mt-3">
                {product.desc.map((descItem) => (
                  <li key={descItem}>{descItem}</li>
                ))}
              </ul>
          </div>
        </div>
        <CommentsSection
          addComment={addComment}
          setText={setText}
          text={text}
          comments={comments}
        />
    </div>
  )
}

export default IndividualProduct;
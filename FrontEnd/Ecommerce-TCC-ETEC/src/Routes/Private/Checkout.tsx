import {
  useEffect, 
  useMemo, 
  useState
} from "react";
import { useParams } from "react-router-dom";

import { cartProductsProps } from "../../interfaces/cartProps";

import OrderProducts from "../../Components/Private/Checkout/OrderProducts";
import DeliveryMethod from "../../Components/Private/Checkout/DeliveryMethod";
import PaymentMethods from "../../Components/Private/Checkout/PaymentMethods";
import CompleteOrder from "../../Components/Private/Checkout/CompleteOrder";

const Checkout = () => {
  const { userToken: token } = useParams();
  const url = useMemo(() => new URL(window.location.toString()), []);

  const [cartProducts, setCartProducts] = useState<cartProductsProps[]>([]);
  
  //Fetch The Cart Data to Render the products that will go to the Order
  useEffect(() => {
    const fetchCartData = async () => {
      const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/cart`);

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
          }
        });
  
        if(response.ok){
          const resJson = await response.json();

          const { cart } = resJson;
          setCartProducts(cart.cartProducts);
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    }
    
    fetchCartData();
  }, [token]);

  const step = url.searchParams.get('step') ?? 'orderproducts';
  
  //Set the next Step to the order (Delivery Method | payment Method | Complete Order) and store it in a URL state to persist Reaload
  // const setNextStep = useCallback((step: string) => {
  //     url.searchParams.set('step', step);
  //     window.history.pushState(null, '', url);
  //     window.location.reload();
  // }, [url]);

  return (
    <div className="min-h-screen">
      <div className="py-5">
        {step === 'orderproducts' &&
          <OrderProducts
            cartProducts={cartProducts || []}
            //setNextStep={setNextStep}
          />
        }
        {step === 'deliverymethod' &&
          <DeliveryMethod
            //setNextStep={setNextStep}
          />
        }
        {step === 'paymentmethod' &&
          <PaymentMethods 
            //setNextStep={setNextStep}
          />
        }
        {step === 'completeOrder' &&
          <CompleteOrder />
        }
      </div>
    </div>
  )
}

export default Checkout;
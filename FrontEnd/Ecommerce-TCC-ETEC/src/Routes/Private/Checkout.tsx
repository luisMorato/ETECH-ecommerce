import { 
  useCallback, 
  useEffect, 
  useMemo, 
  useState
} from "react";
import { useParams } from "react-router-dom";

import { completeOrderProps } from "../../interfaces/OrderProps";

import OrderProducts from "../../Components/Private/Checkout/OrderProducts";
import DeliveryMethod from "../../Components/Private/Checkout/DeliveryMethod";
import PaymentMethods from "../../Components/Private/Checkout/PaymentMethods";
import CompleteOrder from "../../Components/Private/Checkout/CompleteOrder";

const Checkout = () => {
  const { userToken: token } = useParams();
  const url = useMemo(() => new URL(window.location.toString()), []);

  const [order, setOrder] = useState<completeOrderProps>();
  
  useEffect(() => {
    const fetchOrder = async () => {
      const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/checkout`);

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
          }
        });
  
        if(response.ok){
          const resJson = await response.json();
          const { completeOrder } = resJson;
    
          setOrder(completeOrder);
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    }

    fetchOrder();
  }, [token]);

  const step = url.searchParams.get('step') ?? 'orderproducts';
  
  const setNextStep = useCallback((step: string) => {
      url.searchParams.set('step', step);
      window.history.pushState(null, '', url);
      window.location.reload();
  }, [url]);

  useEffect(() => {
    if(order?.status === "Payment Made"){
      setNextStep('completeOrder');
    }
  }, [order, setNextStep]);

  return (
    <div className="min-h-screen">
      <div className="py-5">
        {step === 'orderproducts' &&
          <OrderProducts
            cartProducts={order?.orderDetails.cartProducts || []}
            setNextStep={setNextStep}
          />
        }
        {step === 'deliverymethod' &&
          <DeliveryMethod 
            setNextStep={setNextStep}
          />
        }
        {step === 'paymentmethod' &&
          <PaymentMethods 
            setNextStep={setNextStep}
          />
        }
        {step === 'completeOrder' &&
          <CompleteOrder 
            orderId={order?.id}
          />
        }
      </div>
    </div>
  )
}

export default Checkout;
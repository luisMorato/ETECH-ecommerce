import { 
  useNavigate, 
  useParams
} from "react-router-dom";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";

import Button from "../../Layout/Button";

interface completeOrderProps {
  orderId: number | undefined
}

const CompleteOrder = ({ orderId }: completeOrderProps) => {
  const { userToken: token } = useParams();

  const navigate = useNavigate();

  const clearCart = async () => {
    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/checkout`);

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ orderId })
      });

      const resJson = await response.json();
      const { message } = resJson;

      if(!response.ok){
        toast.error(message);
        return;
      }

      navigate('/');
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  return (
    <div className="flex flex-col items-center bg-white w-fit rounded-xl mx-auto p-5">
        <h1 className="flex items-center gap-2 text-black text-2xl font-medium"><FaCheckCircle className="text-green-500" size={30}/>Order Completed</h1>
        <div className="flex flex-col items-center text-neutral-400 font-medium mt-8">
          <p>Your Order Has Been Placed</p>
          <p>Check Your Email For More Details</p>
        </div>
        <div className="flex mt-8 w-full">
          <Button
            onClick={clearCart}
            className="flex-1"
          >
            Back To Home
          </Button>
        </div>
    </div>
  )
}

export default CompleteOrder;
import { 
  useNavigate,
  useParams,
} from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

import Button from "../../Layout/Button";

const CompleteOrder = () => {
  const { userToken: token } = useParams();
  const navigate = useNavigate();

  const clearCartProducts = async () => {
    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/cart`);

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      }
    });
    
    if(response.ok){
      navigate('/');
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
            onClick={clearCartProducts}
            className="flex-1"
          >
            Back To Home
          </Button>
        </div>
    </div>
  )
}

export default CompleteOrder;
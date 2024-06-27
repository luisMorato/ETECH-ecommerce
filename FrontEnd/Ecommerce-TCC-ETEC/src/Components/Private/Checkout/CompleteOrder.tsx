import { 
  useNavigate,
} from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

import Button from "../../Layout/Button";

const CompleteOrder = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-white w-fit rounded-xl mx-auto p-5">
        <h1 className="flex items-center gap-2 text-black text-2xl font-medium"><FaCheckCircle className="text-green-500" size={30}/>Order Completed</h1>
        <div className="flex flex-col items-center text-neutral-400 font-medium mt-8">
          <p>Your Order Has Been Placed</p>
          <p>Check Your Email For More Details</p>
        </div>
        <div className="flex mt-8 w-full">
          <Button
            onClick={() => navigate('/')}
            className="flex-1"
          >
            Back To Home
          </Button>
        </div>
    </div>
  )
}

export default CompleteOrder;
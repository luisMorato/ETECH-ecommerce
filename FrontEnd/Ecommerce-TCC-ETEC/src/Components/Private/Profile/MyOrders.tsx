
import { FaShippingFast } from "react-icons/fa";
import { completeOrderProps } from "../../../interfaces/OrderProps";

interface myOrdersProps {
  order: completeOrderProps | undefined,
}

const MyOrders = ({ order }: myOrdersProps) => {
    return (
      <div className="flex flex-col gap-5 text-black py-5">
        <h1 className="text-3xl font-medium my-3">My Orders</h1>
        <div className="bg-white rounded-xl p-5 w-[615px]">
            <div className="flex items-center gap-3 pb-2 border-b">
                <FaShippingFast size={30}/>
                <h2 className="text-xl font-medium">Your Orders</h2>
            </div>
            <div className="mt-5">
                {order ? (
                    <div>
                        {order.orderDetails?.cartProducts.map((cartProduct) => (
                        <div key={cartProduct.products.id} className="flex flex-1 justify-between font-medium mb-3">
                            <p>{cartProduct.products.name}</p>
                            <p>${cartProduct.products.price}</p>
                        </div>
                        ))}
                        <div className="flex flex-col gap-2 font-medium text-neutral-400 mt-6 pt-2 border-t border-t-neutral-300">
                        <p>Tracking Code: {order.trackingCode}</p>
                        <p>Status: {order.status}</p>
                        <p>Ordered At: {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                    </div>)
                    :
                    (
                    <p className="text-lg text-center">No Orders</p>
                    )
                }
            </div>
        </div>
      </div>
    )
}

export default MyOrders;
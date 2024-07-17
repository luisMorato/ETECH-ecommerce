import { FaShippingFast } from "react-icons/fa";

import { completeOrderProps } from "../../../interfaces/OrderProps";

import { checkTextLength } from "../../../utils/checkTextLength";
import { useState } from "react";

interface myOrdersProps {
  orders: completeOrderProps[],
}

const MyOrders = ({ orders }: myOrdersProps) => {
    const [currentWindowWidth, setCurrentWindowWidth] = useState(window.innerWidth);

    window.addEventListener('resize', () => {
        setCurrentWindowWidth(window.innerWidth);
    })
    
    return (
      <div className="flex flex-col gap-5 text-black py-5">
        <h1 className="relative text-3xl font-medium w-fit pb-0.5
        after:absolute
        after:top-full
        after:left-0
        after:bg-mainBlue
        after:h-0.5
        after:w-full">My Orders</h1>
        <div className="bg-white rounded-xl max-sm:p-2 p-5 max-w-[615px]">
            <div className="flex items-center gap-3 pb-2 border-b">
                <FaShippingFast size={30}/>
                <h2 className="text-xl font-medium">Your Orders</h2>
            </div>
            <div className={`my-5 ${orders.length >= 3 ? "overflow-y-scroll h-[700px]" : "h-fit"}`}>
                {/* Get All User Orders Already Made */}
                {orders && orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order.id} className="border border-neutral-300 rounded-xl p-3 mb-5 last-of-type:mb-0">
                            {order.orderDetails?.orderProduct.map((product) => (
                            <div key={product.products.id} className="flex justify-between gap-1 flex-1  font-medium mb-3">
                                <p className="max-md:text-sm">{currentWindowWidth < 640 ? checkTextLength(product.products.name, 35) : product.products.name}</p>
                                <p className="max-md:text-sm">${product.products.price}</p>
                            </div>
                            ))}
                            <div className="flex flex-col gap-2 font-medium text-neutral-400 mt-6 pt-2 border-t border-t-neutral-300">
                            <p>Tracking Code: {order.trackingCode}</p>
                            <p>Status: {order.status}</p>
                            <p>Ordered At: {new Date(order.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))
                )
                :
                ( 
                    <div>
                        <p className="text-xl text-center mt-5">No Last Orders</p>
                    </div>
                )
                }
            </div>
        </div>
      </div>
    )
}

export default MyOrders;
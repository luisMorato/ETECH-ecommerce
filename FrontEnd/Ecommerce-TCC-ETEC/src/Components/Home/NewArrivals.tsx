import Slider from "./Slider"

const NewArrivals = () => {
    return (
        <div className="flex justify-center gap-4 my-14 mx-auto w-4/5 max-w-[1800px]">
            <Slider />
            <div className="grid grid-cols-2 gap-4 w-1/2">
                <div className="relative rounded-2xl overflow-hidden">
                    <div className="absolute top-1/4 left-5 z-10">
                        <h3 className="text-neutral-500 text-2xl font-bold mb-3">New Arrival</h3>
                        <h2 className="text-4xl font-bold">Apple Watch</h2>
                        <h3 className="font-bold w-4/5">From $900 or $37,50/mo. For 24 mo.</h3>
                    </div>
                    <img src="/Images/smartwatch-screen-digital.png" alt="SmartWatch" className="h-full brightness-95" />
                </div>
                <div className="relative rounded-2xl overflow-hidden">
                    <div className="absolute top-1/4 left-5 z-10">
                        <h3 className="text-rose-500 text-2xl font-bold mb-3">New Arrival</h3>
                        <h2 className="text-4xl font-bold">Iphone 14 Pro</h2>
                        <h3 className="font-bold w-4/5">From $900 or $37,50/mo. For 24 mo.</h3>
                    </div>
                    <img src="/Images/elegant-smartphone-composition.jpg" alt="Iphone" className="h-full" />
                </div>
                <div className="relative rounded-2xl overflow-hidden">
                    <div className="absolute top-1/4 left-5 z-10">
                        <h3 className="text-[#AA3F11] text-2xl font-bold mb-3">New Arrival</h3>
                        <h2 className="text-4xl font-bold">Ipad Air</h2>
                        <h3 className="font-bold w-4/5">From $900 or $37,50/mo. For 24 mo.</h3>
                    </div>
                    <img src="/Images/tablet.jpg" alt="Ipad Air" className="h-full" />
                </div>
                <div className="relative rounded-2xl overflow-hidden">
                    <div className="absolute top-1/4 left-5 z-10">
                        <h3 className="text-blue-950 text-2xl font-bold mb-3">New Arrival</h3>
                        <h3 className="font-bold w-4/5">From $900 or $37,50/mo. For 24 mo.</h3>
                    </div>
                    <img src="/Images/levitating-headphones.jpg" alt="HeadPhones" className="h-full" />
                </div>
            </div>
        </div>
    )
}

export default NewArrivals;
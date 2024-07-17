import Slider from "./Slider";

const NewArrivals = () => {
    return (
        <div
            className="flex flex-col items-center gap-5 my-8 pr-2 mx-auto w-[90%] max-w-[1800px]
            md:my-14
            md:pr-0
            lg:w-4/5
            xl:max-2xl:w-11/12
            xl:h-[480px]
            xl:flex-row
            xl:justify-center"
        >
            <Slider />
            <div
                className="flex flex-col gap-5
                md:grid
                md:grid-cols-2
                md:w-full
                xl:h-full
                xl:w-1/2"
            >
                <div className="relative flex rounded-2xl overflow-hidden h-[264px] xl:h-[228px]">
                    <div className="absolute top-1/4 left-5 z-10">
                        <h3 className="text-neutral-500 text-2xl font-bold mb-3">New Arrival</h3>
                        <h2 className="text-4xl font-bold">Apple Watch</h2>
                        <h3 className="font-bold w-4/5">From $900 or $37,50/mo. For 24 mo.</h3>
                    </div>
                    <img src="/Images/smartwatch-screen-digital.png" alt="SmartWatch" className="flex-1 brightness-95" />
                </div>
                <div className="relative flex rounded-2xl overflow-hidden h-[264px] xl:h-[228px]">
                    <div className="absolute top-1/4 left-5 z-10">
                        <h3 className="text-rose-500 text-2xl font-bold mb-3">New Arrival</h3>
                        <h2 className="text-4xl font-bold">Iphone 14 Pro</h2>
                        <h3 className="font-bold w-4/5">From $900 or $37,50/mo. For 24 mo.</h3>
                    </div>
                    <img src="/Images/elegant-smartphone-composition.jpg" alt="Iphone" className="flex-1" />
                </div>
                <div className="relative rounded-2xl flex overflow-hidden h-[264px] xl:h-[228px]">
                    <div className="absolute top-1/4 left-5 z-10">
                        <h3 className="text-[#AA3F11] text-2xl font-bold mb-3">New Arrival</h3>
                        <h2 className="text-4xl font-bold">Ipad Air</h2>
                        <h3 className="font-bold w-4/5">From $900 or $37,50/mo. For 24 mo.</h3>
                    </div>
                    <img src="/Images/tablet.jpg" alt="Ipad Air" className="flex-1" />
                </div>
                <div className="relative rounded-2xl flex overflow-hidden h-[264px] xl:h-[228px]">
                    <div className="absolute top-1/4 left-5 z-10">
                        <h3 className="text-blue-950 text-2xl font-bold mb-3">New Arrival</h3>
                        <h2 className="text-4xl font-bold">Headsets</h2>
                        <h3 className="font-bold w-4/5">From $900 or $37,50/mo. For 24 mo.</h3>
                    </div>
                    <img src="/Images/levitating-headphones.jpg" alt="HeadPhones" className="flex-1" />
                </div>
            </div>
        </div>
    )
}

export default NewArrivals;
import { Link, useNavigate } from "react-router-dom";

import Button from "../Components/Layout/Button";
import Featured from "../Components/Home/Featured";

const ErrorBoundary = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-5 min-h-screen w-full">
            <div className="flex max-lg:flex-col items-center flex-1 self-center 2xl:w-4/5">
                <div className="flex max-sm:size-[350px] max-md:size-[500px] size-[650px]">
                    <img
                        draggable={false}
                        src="/Images/illustration.png" 
                        alt="freepik-illustration"
                        className="flex-1"
                    />
                </div>
                <div className="flex flex-col gap-5 px-2">
                    <h1 className="max-md:text-9xl max-lg:text-center text-[188px] text-mainBlue my-0">404</h1>
                    <div className="space-y-2">
                        <h2 className="text-black text-2xl max-lg:text-center font-medium text-wrap">Sorry, we can't find the page you are looking for!</h2>
                        <p className="text-black text-xl max-lg:text-center text-wrap lg:w-3/5">The page you are looking for might been removed or it is temporarily unavailable.</p>
                    </div>
                    <Button
                        onClick={() => navigate('/')}
                        className="self-center"
                    >
                        Back To Home
                    </Button>
                </div>
            </div>
            <div className="flex justify-center max-lg:flex-wrap gap-5 max-xl:w-full max-md:px-3 self-center w-3/5">
                <section className="bg-white/60 text-black flex flex-col gap-3 justify-center p-5 rounded-xl max-w-[300px]">
                    <h2 className="text-xl font-medium text-center">FIND STORE</h2>
                    <p className="max-md:text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quas fugiat earum provident, cumque quod delectus</p>
                    <p></p>
                    <Button
                        outline
                    >
                        Explore
                    </Button>
                </section>
                <section className="bg-white/60 text-black flex flex-col gap-3 justify-center p-5 rounded-xl max-w-[300px]">
                    <h2 className="text-xl font-medium text-center">SUPPORT</h2>
                    <p className="max-md:text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quas fugiat earum provident, cumque quod delectus</p>
                    <p></p>
                    <Button
                        outline
                    >
                        Explore
                    </Button>
                </section>
                <section className="bg-white/60 text-black flex flex-col gap-3 justify-center p-5 rounded-xl max-w-[300px]">
                    <h2 className="text-xl font-medium text-center">ONLINE CHAT</h2>
                    <p className="max-md:text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quas fugiat earum provident, cumque quod delectus</p>
                    <p></p>
                    <Button
                        outline
                    >
                        Explore
                    </Button>
                </section>
            </div>
            <div className="-mb-8 space-y-5">
                <p className="text-center text-lg sm:text-2xl font-medium text-black">Lets Get You Back On Track...</p>
                <div className="flex max-lg:flex-wrap max-sm:items-center justify-center gap-5">
                    <section className="rounded-xl overflow-hidden shadow-md w-fit">
                        <Link to="/products?category=hardware" className="flex-1">
                            <div className="flex size-48">
                                <img src="/Images/hardware.jpg" alt="freepik-hardware-illustration" className="flex-1"/>
                            </div>
                            <h2 className="text-black text-center font-medium py-1">Hardware</h2>
                        </Link>
                    </section>
                    <section className="rounded-xl overflow-hidden shadow-md w-fit">
                        <Link to="/products?category=peripherals" className="flex-1">
                            <div className="flex size-48">
                                <img src="/Images/peripheral.jpg" alt="freepik-peripherals-illustration" />
                            </div>
                            <h2 className="text-black text-center font-medium py-1">Peripherals</h2>
                        </Link>
                    </section>
                    <section className="rounded-xl overflow-hidden shadow-md w-fit">
                        <Link to="/products?category=computers" className="flex-1">
                            <div className="flex size-48">
                                <img src="/Images/computer.jpg" alt="freepik-computers-illustration" />
                            </div>
                            <h2 className="text-black text-center font-medium py-1">Computers</h2>
                        </Link>
                    </section>
                    <section className="rounded-xl overflow-hidden shadow-md w-fit">
                        <Link to="/products?category=notebooks" className="flex-1">
                            <div className="flex size-48">
                                <img src="/Images/notebook.jpg" alt="freepik-notebooks-illustration" />
                            </div>
                            <h2 className="text-black text-center font-medium py-1">Notebooks</h2>
                        </Link>
                    </section>
                    <section className="rounded-xl overflow-hidden shadow-md w-fit">
                        <Link to="/products?category=monitors" className="flex-1">
                            <div className="flex size-48">
                                <img src="/Images/monitor.jpg" alt="freepik-monitors-illustration" />
                            </div>
                            <h2 className="text-black text-center font-medium py-1">Monitors</h2>
                        </Link>
                    </section>
                </div>
            </div>
            <div>
                <Featured />
            </div>
        </div>
    )
}

export default ErrorBoundary;
import {
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { useNavigate } from "react-router-dom";

import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoMdMenu } from "react-icons/io";

import { LoginModalContext } from "../../Context/LoginModalContext";
import { RegisterModalContext } from "../../Context/RegisterModalContext";

import { UseSessionStorage } from "../../Hooks/useSessionStorage";

import { userProps } from "../../interfaces/userProps";
import { cartProductsProps } from "../../interfaces/cartProps";

import Button from "./Button";
import Cart from "./Cart";
import UserButtons from "./UserButtons";
import ListItem from "./ListItem";

type navbarProps = {
  user?: userProps,
};

const Navbar = ({ user }: navbarProps) => {
  const { token, setToken } = UseSessionStorage('token');
  const navigate = useNavigate();

  const { setIsOpen: setLoginIsOpen } = useContext(LoginModalContext);
  const { setIsOpen: setRegisterIsOpen } = useContext(RegisterModalContext);

  const [openCart, setOpenCart] = useState(false);
  const [cartProducts, setCartProducts] = useState<cartProductsProps[]>([]);

  const [open, setOpen] = useState(false);
  
  //SignOut the user by removing the token from the session and redirecting to the HomePage
  const signOut = () => {
    setToken('');
    window.location.pathname = "/profile";
    if(window.location.pathname.includes("/profile") || window.location.pathname.includes("/checkout")){
      navigate('/');
    }
  }

  //Cehck if the User is not admin before Fetch the Cart Data 
  useEffect(() => {
    const fetchCartData = async () => {
      if(!user || user?.role === "ADMIN"){
        return;
      }

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
  }, [token, openCart, user]);

  const CartProductsQuantity = useMemo(() => cartProducts?.reduce((prev, current) => prev + current?.quantity, 0), [cartProducts]);
  const subtotal = useMemo(() => cartProducts.map((product) => product.quantity * product.products.price).reduce((prev, current) => prev + current, 0), [cartProducts]);

  return (
    <nav className="flex items-center gap-8">
        {user ? (
          <div className="relative flex items-center gap-5">
            <div className="flex gap-5">
              {user.role !== "ADMIN" && 
                <button
                  onClick={() => setOpenCart((prevValue) => !prevValue)}
                  className="relative flex items-center justify-center h-10 w-10 bg-neutral-300 rounded-full hover:bg-neutral-400"
                >
                  <div className="absolute top-0 right-0 -translate-y-1 translate-x-2 flex items-center justify-center bg-mainBlue rounded-full text-sm w-5 h-5 pointer-events-none">{CartProductsQuantity}</div>
                  <LiaShoppingBagSolid size={30} />
                </button>
              }
            </div>
            {openCart &&
              <Cart 
                cartProducts={cartProducts}
                token={token}
                subtotal={subtotal}
              />
            }
            <UserButtons
              user={user}
              signOut={signOut} 
              token={token}
            />
          </div>
        ):
        (
          <>
            <div 
              className="hidden 
              lg:flex 
              lg:gap-5"
            >
              <Button
                outline
                onClick={() => setLoginIsOpen(true)}
              >
                Sign In
              </Button>
              <Button
                onClick={() => setRegisterIsOpen(true)}
              >
                Create an Account
              </Button>
            </div>
            {/* Small Screens Menu */}
            <div className="relative flex items-end mr-3
            lg:hidden">
              <button
                onClick={() => setOpen((prevValue) => !prevValue)}
              >
                <IoMdMenu size={30} className="text-mainBlue" />
              </button>
              {open && 
              (
                <>
                  <div className="absolute z-30 top-full right-0 translate-y-1.5 flex flex-col gap-3 bg-white overflow-hidden border border-neutral-400/50 w-[120px] rounded-2xl">
                    <ul>
                      <ListItem
                        to=""
                        className="font-medium group"
                      >
                        <button onClick={() => setLoginIsOpen(true)} >Sign In</button>
                      </ListItem>
                      <ListItem
                        to=""
                        isLastItem
                        className="font-medium"
                      >
                        <button onClick={() => setRegisterIsOpen(true)} >Sign Up</button>
                      </ListItem>
                    </ul>
                  </div>
                  {/* <div className="absolute top-full right-4 pointer-events-none rotate-45 z-40 size-3 bg-white border border-neutral-400/50 border-r-0 border-b-0 group-hover:bg-neutral-200"></div> */}
                </>
              )}
            </div>
          </>
        )}
    </nav>
  )
}

export default Navbar;
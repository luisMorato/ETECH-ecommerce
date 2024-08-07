import { 
  ChangeEvent, 
  FormEvent,  
  useEffect, 
  useState
} from "react";
import { toast } from "react-toastify";

import { 
  FaClockRotateLeft, 
  FaUserCheck 
} from "react-icons/fa6";
import { 
  FaBoxOpen, 
  FaShoppingBasket
} from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { BsGraphUp } from "react-icons/bs";

import { userProps } from "../../../interfaces/userProps"
import { productProps } from "../../../interfaces/productsProps";
import { completeOrderProps } from "../../../interfaces/OrderProps";

import { UseSessionStorage } from "../../../Hooks/useSessionStorage";

import Button from "../../Layout/Button";
import Welcome from "./Welcome";
import GetPassword from "./GetPassword";
import Container from "./Container";
import Box from "./Box";
import SalesChart from "./SalesChart";
import ActiveUsersChart from "./ActiveUsersChart";

interface dashboardUserContentProps {
  user: userProps | undefined,
  setOption: (option: string) => void,
}

const DashboardAdminContent = ( { user, setOption }: dashboardUserContentProps ) => {
  const { token } = UseSessionStorage('token');

  const [productsQuantity, setProductsQuantity] = useState(0);
  const [stock, setStock] = useState(0);

  const [usersQuantity, setUsersQuantity] = useState(0);

  const [orders, setOrders] = useState<completeOrderProps[]>([]);
  const [ordersQuantity, setOrdersQuantity] = useState(0);
  const [orderSearch, setOrderSearch] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState('');

  const [userData, setUserData] = useState<Omit<userProps, 'id' | 'role' | 'createdAt' | 'updatedAt'>>({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: '',
    phoneNumber: user?.phoneNumber ?? '',
    address: user?.address ?? '',
    houseNumber: user?.houseNumber ?? null,
    city: user?.city ?? '',
    state: user?.state ?? '',
    postalCode: user?.postalCode ?? '',
    country: user?.country ?? '',
  });
  
  useEffect(() => {
    const fetchAdminDashboardData = async () => {
      if(user?.role !== 'ADMIN'){
        return;
      }

      const productsURL = new URL(`${import.meta.env.VITE_BACKEND_URL}/products`);
      const usersURL = new URL(`${import.meta.env.VITE_BACKEND_URL}/user/all`);
      const ordersURL = new URL(`${import.meta.env.VITE_BACKEND_URL}/checkout/all`);

      try {
        const [productsResponse, usersResponse, ordersResponse] = await Promise.all([
          fetch(productsURL, {
            method: "GET",
            headers: {
              "content-type": "application/json"
            }
          }),
          fetch(usersURL, {
            method: "GET",
            headers: {
              "content-type": "application/json",
              "authorization": `Bearer ${token}`
            }
          }),
          fetch(ordersURL, {
            method: "GET",
            headers: {
              "content-type": "application/json",
              "authorization": `Bearer ${token}`
            }
          })
        ]);

        const productsJson = await productsResponse.json();
        const { products: apiProducts, quantity: productsApiQuantity } = productsJson;

        const stockQuantity = apiProducts.map((product: productProps) => product.stock).reduce((prev: number, current: number) => prev + current, 0);
        
        setStock(stockQuantity);
        setProductsQuantity(productsApiQuantity);

        const usersJson = await usersResponse.json();
        const { quantity: usersApiQuantity } = usersJson;

        setUsersQuantity(usersApiQuantity - 1);

        const ordersJson = await ordersResponse.json();
        const { orders: apiOrders, quantity: ordersApiQuantity } = ordersJson;

        setOrders(apiOrders);
        setOrdersQuantity(ordersApiQuantity);
      } catch (error) {
        console.log('Error: ', error);
      }
    }

    fetchAdminDashboardData();
  }, [user?.role, token]);

  useEffect(() => {
    const updateOrdersForSearch = async () => {
      const ordersURL = new URL(`${import.meta.env.VITE_BACKEND_URL}/checkout/all`);
      if(orderSearch !== ''){
        ordersURL.searchParams.set('query', orderSearch);
      }

      try {
        const response = await fetch(ordersURL, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
          }
        });

        if(response.ok){
          const resJson = await response.json();

          const { orders: apiOrders, quantity: ordersApiQuantity } = resJson;
          setOrders(apiOrders);
          setOrdersQuantity(ordersApiQuantity);
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    }

    updateOrdersForSearch();
  }, [orderSearch, token]);

  useEffect(() => {
    //Set The Image if user already Have One;
    if(user?.image){
        setPreview(`${import.meta.env.VITE_BACKEND_URL}/public/images/user/${user.image}`);
    }
  }, [user?.image]);

  //Handle the Order Search Input change to search for some Order
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderSearch(e.target.value);
  }

  //Get the User's Password Before Allowing to proceed
  const handleGetPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({
        ...userData,
        password: e.target.value
    });
  }

  //Handle the File Input Change
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
        setUserData({...userData, 
            image: e.target.files[0]
        });
        const imageURL = URL.createObjectURL(e.target.files[0]);
        setPreview(imageURL);
        setTimeout(() => {
          setIsOpen(true);
        }, 1500);
    }
  }

  //Make the upload of the image to the BackEnd or Update it if the User Already Have One
  const handleImageChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(userData).forEach((key) => {
        const value = userData[key as keyof Omit<userProps, 'id' | 'role' | 'createdAt' | 'updatedAt'>];

        if(value instanceof File){
            formData.append('image', value);
        }else if(!value){
            formData.append(key, '');
        }else{
            formData.append(key, String(value))
        }
    });

    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/user`);

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "authorization": `Bearer ${token}`
            },
            body: formData
        });

        if(!response.ok){
            toast.error('Error Uploading Image!');
            return;
        }

        toast.success('Image Uploaded!');
    } catch (error) {
        console.log('Error: ', error);
    }
  }
  
   //ToDo: Fix the Responsiveness Design Bug
  return user && (
    <>
      <GetPassword
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          handleSubmit={handleImageChange}
          choice={'imageUpload'}
          handleGetPassword={handleGetPassword}
      />
      <div className="flex max-xl:flex-col gap-5 max-[400px]:max-w-[300px] pr-3 xl:max-2xl:max-w-[1200px] max-w-[1280px]">
        <div className="flex flex-col flex-1">
          <Welcome
              preview={preview}
              user={user}
              handleFileInputChange={handleFileInputChange}
              setOption={setOption}
          />
          <div className="bg-white p-3 rounded-xl h-full">
            <div className="flex max-sm:flex-col max-sm:gap-3 sm:items-center justify-between pb-2 border-b">
              <div className="flex items-center gap-3">
                <FaClockRotateLeft size={25}/>
                <h2 className="text-xl font-medium">Last Orders</h2>
              </div>
              <div className="flex items-center gap-1 border border-neutral-400 px-2 py-1 rounded-2xl overflow-hidden">
                <IoIosSearch size={25} className="text-neutral-400"/>
                <input 
                  type="text"
                  placeholder="Type Order Code..."
                  className="flex-1 placeholder:text-neutral-400 focus:outline-none"
                  onChange={(e) => handleSearchInputChange(e)}
                />
              </div>
            </div>
            {//Check if any order exists, if it does, render it, else show "No Last Orders"
              orders.length > 0 ? (
                <div>
                  <p className="mb-4 mt-2 font-medium text-neutral-400">Orders: {ordersQuantity}</p>
                  <div className={`${orders?.length >= 3 ? "overflow-y-scroll h-[700px]" : "h-fit overflow-y-hidden"}`}>
                    {orders.map((order) => (
                      <div key={order.id} className="flex flex-col gap-2 p-5 mb-5 bg-neutral-100 rounded-2xl">
                        <span>User: {order.cart?.user.name}</span>
                        <span>Email: {order.cart?.user.email}</span>
                        <span>Code: {order.id}</span>
                        <span>Date: {new Date(order.date).toISOString()}</span>
                        <span>Status: {order.status}</span>
                        <span>Tracking Code: {order.trackingCode}</span>
                        <div className="flex justify-end">
                          <Button>Change Status</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>)
                :
                ( 
                  <div>
                    <p className="text-xl text-center mt-5">No Last Orders</p>
                  </div> 
                )
            }
          </div>
        </div>
        <div className="flex flex-col gap-5 flex-1">
          <div className="flex max-md:flex-wrap gap-5 flex-1">
              <Container className="max-sm:max-w-[180px]">
                <Box>
                  <h2 className="text-xl md:text-2xl font-medium">Stock</h2>
                  <FaBoxOpen size={30} className="text-mainBlue shrink-0"/>
                </Box>
                <div className="flex flex-col mt-4">
                  <p className="text-4xl text-right font-medium">{stock}</p>
                </div>
              </Container>
              <Container className="max-sm:max-w-[180px]">
                <Box>
                  <h2 className="text-xl md:text-2xl font-medium">Products</h2>
                  <FaShoppingBasket size={30} className="text-mainBlue shrink-0"/>
                </Box>
                <div className="flex flex-col mt-4">
                  <p className="text-4xl text-right font-medium">{productsQuantity}</p>
                </div>
              </Container>
              <Container className="max-sm:max-w-[180px]">
                <Box>
                  <h2 className="text-xl md:text-2xl font-medium">Users</h2>
                  <FaUserCheck size={30} className="text-mainBlue shrink-0"/>
                </Box>
                <div className="flex flex-col mt-4">
                  <p className="text-4xl text-right font-medium">{usersQuantity}</p>
                </div>
              </Container>
            </div>
            <div className="max-lg:hidden bg-white p-3 pb-16 rounded-xl">
              <div className="mb-5">
                <div className="flex items-center gap-5 mb-3">
                  <BsGraphUp size={30} className="text-mainBlue"/>
                  <h2 className="text-2xl font-medium">Statistics</h2>
                </div>
                <span className="text-xl text-neutral-400 font-medium">Overview</span>
              </div>
              <div className="flex flex-col gap-16">
                <SalesChart />
                <ActiveUsersChart />
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default DashboardAdminContent;
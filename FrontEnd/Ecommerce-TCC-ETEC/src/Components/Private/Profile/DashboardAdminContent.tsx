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

import { userProps } from "../../../interfaces/userProps"
import { productProps } from "../../../interfaces/productsProps";
import { completeOrderProps } from "../../../interfaces/OrderProps";

import { UseSessionStorage } from "../../../Hooks/useSessionStorage";

import Button from "../../Layout/Button";
import Welcome from "./Welcome";
import GetPassword from "./GetPassword";
import Container from "./Container";
import Box from "./Box";

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

  const [userData, setUserData] = useState<Omit<userProps, 'id' | 'role'>>({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: '',
    phoneNumber: user?.phoneNumber ?? '',
    address: user?.address ?? '',
    houseNumber: user?.houseNumber ?? undefined,
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

        setUsersQuantity(usersApiQuantity);

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
        const value = userData[key as keyof Omit<userProps, 'id' | 'role'>];

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
  
  return user && (
    <>
      <GetPassword
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          handleSubmit={handleImageChange}
          choice={'imageUpload'}
          handleGetPassword={handleGetPassword}
      />
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <Welcome
              preview={preview}
              user={user}
              handleFileInputChange={handleFileInputChange}
              setOption={setOption}
          />
          <Container className="max-w-[200px]">
            <Box>
              <h2 className="text-2xl font-medium">Stock</h2>
              <FaBoxOpen size={30} className="text-[#2295E9]"/>
            </Box>
            <div className="flex flex-col mt-5">
              <p className="text-4xl text-right font-medium">{stock}</p>
            </div>
          </Container>
          <Container className="max-w-[200px]">
            <Box>
              <h2 className="text-2xl font-medium">Products</h2>
              <FaShoppingBasket size={30} className="text-[#2295E9]"/>
            </Box>
            <div className="flex flex-col mt-5">
              <p className="text-4xl text-right font-medium">{productsQuantity}</p>
            </div>
          </Container>
          <Container className="max-w-[200px]">
            <Box>
              <h2 className="text-2xl font-medium">Users</h2>
              <FaUserCheck size={30} className="text-[#2295E9]"/>
            </Box>
            <div className="flex flex-col mt-5">
              <p className="text-4xl text-right font-medium">{usersQuantity}</p>
            </div>
          </Container>
        </div>
        <div className="flex gap-5">
          <Container className="max-w-[620px]">
            <div className="flex items-center justify-between pb-2 border-b">
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
            <p className="mb-4 mt-2">Orders: {ordersQuantity}</p>
            <div className={`${orders?.length >= 3 ? "overflow-y-scroll h-[550px]" : "h-fit overflow-y-hidden"}`}>
              {//Check if any order exists, if it does, render it, else show "No Last Orders"
                orders ?
                orders.map((order) => (
                  <div className="flex flex-col gap-2 p-3 mb-5 bg-neutral-100 rounded-2xl" key={order.id}>
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
                ))
                :
                <div>
                  <span className="text-lg">No Last Orders</span>
                </div>
              }
            </div>
          </Container>
          <div className="bg-white flex-1 rounded-xl p-3 max-w-[640px]">
            <h2>Statistics</h2>
            <span>Overview</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardAdminContent;
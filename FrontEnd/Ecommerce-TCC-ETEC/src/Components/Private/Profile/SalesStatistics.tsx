import { 
  useEffect, 
  useState
} from "react";
import { 
  FaBoxOpen, 
  FaUserCheck 
} from "react-icons/fa6";
import { 
  FaShoppingBasket, 
  FaDollarSign 
} from "react-icons/fa";

import { productProps } from "../../../interfaces/productsProps";

import Box from "./Box";
import Container from "./Container";
import SalesChart from "./SalesChart";
import ActiveUsersChart from "./ActiveUsersChart";
import BestSellingCategoryChart from "./BestSellingCategoryChart";

interface salesStatisticsProps {
    token: string | undefined
}

const SalesStatistics = ({ token }: salesStatisticsProps) => {
  const [productsQuantity, setProductsQuantity] = useState(0);
  const [stock, setStock] = useState(0);
  const [inventoryValue, setInventoryValue] = useState(0);

  const [usersQuantity, setUsersQuantity] = useState(0);

  useEffect(() => {
    const fetchStatisticsData = async () => {
      const productsURL = new URL(`${import.meta.env.VITE_BACKEND_URL}/products`);
      const usersURL = new URL(`${import.meta.env.VITE_BACKEND_URL}/user/all`);

      const [productsResponse, usersResponse] = await Promise.all([
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
      ]);

      if(productsResponse.ok){
        const productsJson = await productsResponse.json();
        const { products, quantity: apiProductsQuantity } = productsJson;

        setProductsQuantity(apiProductsQuantity);
        
        const stockValue = (products as productProps[]).map((product: productProps) => product.price * product.stock).reduce((prev, current) => prev + current, 0);
        setInventoryValue(stockValue);

        const stockQuantity = (products as productProps[]).map((product: productProps) => product.stock).reduce((prev, current) => prev + current, 0);

        setStock(stockQuantity);
      }

      if(usersResponse.ok){
        const userJson = await usersResponse.json();
        const { quantity: apiUsersQuantity } = userJson;

        //Set the user's quantity minus 1, because one user is the ADMIN
        setUsersQuantity(apiUsersQuantity - 1);
      }
    }

    fetchStatisticsData();
  }, [token]);

  return (
    <div className="text-black bg-white p-5 my-5 rounded-xl w-[1100px]">
        <h1 
          className="relative text-3xl font-medium w-fit
          after:absolute
          after:top-full
          after:left-0
          after:bg-mainBlue
          after:h-0.5
          after:w-full"
        >Sales Statistics</h1>
        <div className="flex gap-5 my-5 border-b border-b-neutral-400 pb-8">
          <Container className="border border-neutral-400">
            <Box>
              <h2 className="text-2xl font-medium">Stock</h2>
              <FaBoxOpen size={30} className="text-mainBlue"/>
            </Box>
            <div className="flex flex-col mt-5">
              <p className="text-4xl text-right font-medium">{stock}</p>
            </div>
          </Container >
          <Container className="border border-neutral-400">
            <Box>
              <h2 className="text-2xl font-medium">Inventory Cost</h2>
              <FaDollarSign size={25} className="text-mainBlue"/>
            </Box>
            <div className="flex flex-col mt-5">
              <p className="text-3xl text-right text-nowrap font-medium">$ {inventoryValue.toLocaleString('pt-BR')}</p>
            </div>
          </Container >
          <Container className="border border-neutral-400">
            <Box>
              <h2 className="text-2xl font-medium">Products</h2>
              <FaShoppingBasket size={30} className="text-mainBlue"/>
            </Box>
            <div className="flex flex-col mt-5">
              <p className="text-4xl text-right font-medium">{productsQuantity}</p>
            </div>
          </Container >
          <Container className="border border-neutral-400">
            <Box>
              <h2 className="text-2xl font-medium">Active Users</h2>
              <FaUserCheck size={30} className="text-mainBlue"/>
            </Box>
            <div className="flex flex-col mt-5">
              <p className="text-4xl text-right font-medium">{usersQuantity}</p>
            </div>
          </Container>
        </div>
        <div className="flex-1 pb-10">
          <SalesChart />
        </div>
        <div className="flex my-5 pb-5">
          <BestSellingCategoryChart />
          <ActiveUsersChart />
        </div>
    </div>
  )
}

export default SalesStatistics;
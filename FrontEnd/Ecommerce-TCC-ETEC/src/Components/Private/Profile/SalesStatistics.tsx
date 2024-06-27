import { FaBoxOpen, FaUserCheck } from "react-icons/fa6";
import Box from "./Box";
import Container from "./Container";
import SalesChart from "./SalesChart";
import { FaShoppingBasket } from "react-icons/fa";

// interface salesStatisticsProps {
//     token: string | undefined
// }

const SalesStatistics = () => {
  return (
    <div className="text-black bg-white p-5 my-5 rounded-xl w-[1200px]">
        <h1 className="text-3xl font-medium" >Sales Statistics</h1>
        <div className="flex gap-5 my-5">
          <Container className="border border-neutral-400">
            <Box>
              <h2 className="text-2xl font-medium">Stock</h2>
              <FaBoxOpen size={30} className="text-[#2295E9]"/>
            </Box>
            <div className="flex flex-col mt-5">
              <h2 className="text-4xl text-right font-medium">780</h2>
            </div>
          </Container >
          <Container className="border border-neutral-400">
            <Box>
              <h2 className="text-2xl font-medium">Inventory Cost</h2>
              <FaShoppingBasket size={30} className="text-[#2295E9]"/>
            </Box>
            <div className="flex flex-col mt-5">
              <h2 className="text-3xl text-right text-nowrap font-medium">$ 31.863,00</h2>
            </div>
          </Container >
          <Container className="border border-neutral-400">
            <Box>
              <h2 className="text-2xl font-medium">Products</h2>
              <FaShoppingBasket size={30} className="text-[#2295E9]"/>
            </Box>
            <div className="flex flex-col mt-5">
              <h2 className="text-4xl text-right font-medium">80</h2>
            </div>
          </Container >
          <Container className="border border-neutral-400">
            <Box>
              <h2 className="text-2xl font-medium">Users</h2>
              <FaUserCheck size={30} className="text-[#2295E9]"/>
            </Box>
            <div className="flex flex-col mt-5">
              <h2 className="text-4xl text-right font-medium">2</h2>
            </div>
          </Container>
        </div>
        <SalesChart />
    </div>
  )
}

export default SalesStatistics;
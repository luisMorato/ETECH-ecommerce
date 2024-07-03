import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import { userProps } from "../../interfaces/userProps";
import { completeOrderProps } from "../../interfaces/OrderProps";

import ProfileSideBar from "../../Components/Private/Profile/ProfileSideBar";
import Dashboard from "../../Components/Private/Profile/Dashboard";
import ProfileConfig from "../../Components/Private/Profile/ProfileConfig";
import MyOrders from "../../Components/Private/Profile/MyOrders";
import ProductRegisterForm from "../../Components/Private/Profile/ProductRegisterForm";
import AllProducts from "../../Components/Private/Profile/AllProducts";
import SalesStatistics from "../../Components/Private/Profile/SalesStatistics";
import UsersList from "../../Components/Private/Profile/UsersList";
import CreditCardForm from "../../Components/Private/Profile/CreditCardForm";

const Profile = () => {
  const { userToken: token } = useParams();
  const navigate = useNavigate();
  
  if(!token){
    navigate("/");
  }

  const [orders, setOrders] = useState<completeOrderProps[]>([]);
  const [user, setUser] = useState<userProps | undefined>(undefined);

  //Sets the profile view option (dashboard, profile data config, etc) in the URL to persist reloads
  const currentUrl = new URL(window.location.toString());
  const currentOption = currentUrl.searchParams.get('option') ?? 'dashboard';
  
  //UseEffect Used to fetch the user's data everytime the token changes, that is, everytime a login is made
  useEffect(() => {
    const fetchUser = async () => {
      if(!token){
        navigate('/');
      }
      const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/user`);
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "authorization": `Bearer ${token}`
        },
      });
      const resJson = await response.json();
      
      if(response.ok){
        const { user: apiUser } = resJson;
        if(!apiUser){
          navigate("/");
          return;
        }

        setUser(apiUser);
      }
    }

    fetchUser();
  }, [token, navigate]);

  //UseEffect Used to fetch the user's orders everytime the token and user changes
  useEffect(() => {
    const fetchOrders = async () => {
      if(!token || !user || user?.role === "ADMIN"){
        return;
      }

      const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/checkout`);

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
          }
        });
  
        if(response.ok){
          const resJson = await response.json();
          const { completeOrders } = resJson;
  
          setOrders(completeOrders);
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    }

    fetchOrders();
  }, [token, user]);

  return user && (
    <div className="flex gap-12 mx-auto min-h-screen">
      <div className="flex-1 bg-white max-w-[250px]">
        <ProfileSideBar
          user={user}
        />
      </div>
      {currentOption === "dashboard" && (
         <Dashboard
         user={user}
         orders={orders}
       />
      )}
      { currentOption === "profileConfig" && (
        <div className="mb-5">
          <ProfileConfig
            user={user}
            token={token}
          />
          {user.role !== "ADMIN" && 
            <CreditCardForm
              token={token}
            />
          }
        </div>
      )}
      { currentOption === "myoders" && 
        <MyOrders
          orders={orders}
        />
      }
      { currentOption === "registerProduct" && (
        <ProductRegisterForm
          token={token}
        />
      )}
      { currentOption === 'allProducts' &&
          <AllProducts
            token={token}
          />
      }
      { currentOption === 'usersList' &&
          <UsersList
            token={token}
          />
      }
      { currentOption === 'salesStatistics' &&
          <SalesStatistics 
            token={token}
          />
      }
    </div>
  )
}

export default Profile;
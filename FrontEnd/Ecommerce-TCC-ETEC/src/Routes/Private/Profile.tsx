import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import { userProps } from "../../interfaces/userProps";

import ProfileSideBar from "../../Components/Private/Profile/ProfileSideBar";
import Dashboard from "../../Components/Private/Profile/Dashboard";
import ProfileConfig from "../../Components/Private/Profile/ProfileConfig";
import MyOrders from "../../Components/Private/Profile/MyOrders";
import ProductRegisterForm from "../../Components/Private/Profile/ProductRegisterForm";
import { completeOrderProps } from "../../interfaces/OrderProps";
import AllProducts from "../../Components/Private/Profile/AllProducts";
import SalesStatistics from "../../Components/Private/Profile/SalesStatistics";
import UsersList from "../../Components/Private/Profile/UsersList";

const Profile = () => {
  const { userToken: token } = useParams();
  const navigate = useNavigate();
  
  if(!token){
    navigate("/");
  }

  const [order, setOrder] = useState<completeOrderProps>();
  const [user, setUser] = useState<userProps | undefined>(undefined);
  const [userImage, setUserImage] = useState('');

  const currentUrl = new URL(window.location.toString());
  const currentOption = currentUrl.searchParams.get('option') ?? 'dashboard';
  
  useEffect(() => {
    const fetchUser = async () => {
      if(token){
        const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/user`);
       
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "authorization": `Bearer ${token}`
          },
        });
        const resJson = await response.json();
        
        if(response.ok){
          const { user: apiUser, imageBuffer } = resJson;
          if(!apiUser){
            navigate("/");
            return;
          }
          setUser(apiUser);

          if(imageBuffer){
            const blob = new Blob([new Uint8Array(imageBuffer.data)], { type: 'image/jpg' });
            const imageURL = URL.createObjectURL(blob);
  
            setUserImage(imageURL);
          }
        }
      }
    }

    fetchUser();
  }, [token, navigate]);

  useEffect(() => {
    const fetchOrder = async () => {
      if(!user || user?.role === "ADMIN"){
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
          const { completeOrder } = resJson;
  
          setOrder(completeOrder);
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    }

    fetchOrder();
  }, [token, user]);

  return user && (
    <div className="flex gap-12 mx-auto min-h-full">
      <div className="flex-1 bg-white max-w-[250px]">
        <ProfileSideBar
          user={user}
        />
      </div>
      {currentOption === "dashboard" && (
         <Dashboard
         user={user}
         userImage={userImage}
         order={order}
       />
      )}
      { currentOption === "profileConfig" && (
        <ProfileConfig
          user={user}
          userImage={userImage}
          token={token}
        />
      )}
      { currentOption === "myoders" && 
        <MyOrders
          order={order}
        />
      }
      <div className="min-h-screen">
        { currentOption === "registerProduct" && (
          <ProductRegisterForm
            token={token}
          />
        )}
      </div>
      <div className="min-h-screen">
        { currentOption === 'allProducts' &&
            <AllProducts
              token={token}
            />
        }
      </div>
      <div className="min-h-screen">
        { currentOption === 'usersList' &&
            <UsersList
              token={token}
            />
        }
      </div>
      <div className="min-h-screen">
        { currentOption === 'salesStatistics' &&
            <SalesStatistics
              token={token}
            />
        }
      </div>
    </div>
  )
}

export default Profile;
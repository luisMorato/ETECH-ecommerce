import { 
  useContext,
  useEffect, 
  useState
} from 'react';
import { Outlet } from 'react-router-dom';
import { IoLogoWhatsapp, IoMdChatboxes } from 'react-icons/io';
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

import { UseSessionStorage } from './Hooks/useSessionStorage';

import LoginModal from './Components/Modals/auth/LoginModal';
import RegisterModal from './Components/Modals/auth/RegisterModal';
import { ChatBoxModalContext } from './Context/ChatBoxContext';

import { userProps } from './interfaces/userProps';

import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';
import TopMenu from './Components/Layout/TopMenu';
import ChatBox from './Components/Layout/ChatBox';
import FixedButton from './Components/Layout/FixedButton';

function App() {
  const { token } = UseSessionStorage('token');

  const { isOpen, setIsOpen } = useContext(ChatBoxModalContext);

  const [user, setUser] = useState<userProps | undefined>(undefined);
  
  //Used to Fecth the User's Data and Passes to The Header and NavBar Components
  useEffect(() => {
    const getUser = async () => {
      const url = `${import.meta.env.VITE_BACKEND_URL}/user`

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "authorization": `Bearer ${token}`
          }
        });
  
        if(response.ok){
          const resJson = await response.json();
          //const { user:apiUser, imageBuffer } = resJson;
          const { user:apiUser } = resJson;
          
          setUser(apiUser);
  
          // const blob = new Blob([new Uint8Array(imageBuffer.data)], { type: 'image/jpg' });
          // const imageURL = URL.createObjectURL(blob);
          // setUserImage(imageURL);
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    }

    getUser();
  }, [token]);

  //Function That Scrolls Back to The Top of The Page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  window.addEventListener("load" , () => {
    console.log({
      id: Math.random() * 1000,
    }, "Active User");
  });

  return (
    <>
        <RegisterModal />
        <LoginModal />
        <Header
          user={user}
        />
        <TopMenu />
        <Outlet />
        <ChatBox
          user={user}
        />
        <FixedButton
          onClick={scrollToTop}
          className="bottom-5 left-1/2 border border-neutral-400 bg-white text-mainBlue animate-bounce"
        >
          <MdKeyboardDoubleArrowUp size={30} />
        </FixedButton>
        {user?.role !== 'ADMIN' &&
          <FixedButton
            className="bottom-20 right-5 p-2 bg-green-700"
          >
            <IoLogoWhatsapp size={30} />
          </FixedButton>
        }
        <div>
          {user && user.role !== 'ADMIN' && !isOpen &&
            <FixedButton className="bottom-5 right-5 p-2 bg-mainBlue"
              onClick={() => setIsOpen(true)}
            >
              <IoMdChatboxes size={30} />
            </FixedButton>
          }
        </div>
        <Footer />
    </>
  )
}

export default App;

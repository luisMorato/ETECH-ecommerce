import { 
  useContext,
  useEffect, 
  useState
} from 'react';
import { Outlet } from 'react-router-dom';

import { UseSessionStorage } from './Hooks/useSessionStorage';

import LoginModal from './Components/Modals/auth/LoginModal';
import RegisterModal from './Components/Modals/auth/RegisterModal';

import { userProps } from './interfaces/userProps';

import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';
import TopMenu from './Components/Layout/TopMenu';
import ChatButton from './Components/Layout/ChatButton';
import { ChatBoxModalContext } from './Context/ChatBoxContext';
import ChatBox from './Components/Layout/ChatBox';

function App() {
  const { token } = UseSessionStorage('token');

  const { isOpen, setIsOpen } = useContext(ChatBoxModalContext);

  const [user, setUser] = useState<userProps | undefined>(undefined);
  const [userImage, setUserImage] = useState('');
  
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
          const { user, imageBuffer } = resJson;
          
          setUser(user);
  
          const blob = new Blob([new Uint8Array(imageBuffer.data)], { type: 'image/jpg' });
          const imageURL = URL.createObjectURL(blob);
          setUserImage(imageURL);
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    }

    getUser();
  }, [token]);

  return (
    <>
        <RegisterModal />
        <LoginModal />
        <Header 
          user={user}
          userImage={userImage}
        />
        <TopMenu />
        <Outlet />
        <ChatBox
          user={user}
        />
        {user && user.role !== 'ADMIN' && !isOpen &&
          <ChatButton
            onClick={() => setIsOpen(true)}
          />
        }
        <Footer />
    </>
  )
}

export default App;

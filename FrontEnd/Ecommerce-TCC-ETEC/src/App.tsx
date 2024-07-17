import { 
  useContext,
} from 'react';
import { 
  Link,
  Outlet
} from 'react-router-dom';
import {
  IoLogoWhatsapp,
  IoMdChatboxes
} from 'react-icons/io';
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

import { ChatBoxModalContext } from './Context/ChatBoxContext';
import { UseAuth } from './Hooks/UseAuth';

import LoginModal from './Components/Modals/auth/LoginModal';
import RegisterModal from './Components/Modals/auth/RegisterModal';
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';
import TopMenu from './Components/Layout/TopMenu';
import ChatBox from './Components/Layout/ChatBox';
import FixedButton from './Components/Layout/FixedButton';

function App() {
  const { user } = UseAuth();

  const { isOpen, setIsOpen } = useContext(ChatBoxModalContext);

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
      status: "Active User"
    },);
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
          className="bottom-5 left-1/2 border border-neutral-300 bg-white text-mainBlue animate-bounce"
        >
          <MdKeyboardDoubleArrowUp size={30} />
        </FixedButton>
        {user?.role !== 'ADMIN' &&
          <FixedButton
            className="bottom-20 right-5 p-2 bg-green-700"
          >
            <Link to={`https://wa.me/${import.meta.env.VITE_PHONE_NUMBER}/`} target='_blank' rel='norefferer noopener'>
              <IoLogoWhatsapp size={30} />
            </Link>
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

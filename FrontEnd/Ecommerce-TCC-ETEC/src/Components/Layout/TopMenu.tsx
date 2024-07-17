import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPhone  } from 'react-icons/fa';
import { FiMenu } from "react-icons/fi";

import MenuItem from './MenuItem';
import ListItem from './ListItem';

const TopMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  //Handle the scroll to some point of the page and set the behavior to be smooth
  const smoothScrollTo = (id: string) => {
    const div = document.getElementById(id);

    if(div){
      div.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }

  return (
    <nav className="flex flex-1 bg-[#2295E9]">
        <div className='flex justify-between 
        lg:mx-auto 
        lg:w-5/6'>
          <ul className="flex">
              <li 
                onMouseOver={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                onTouchStart={() =>  setIsOpen(true)}
                onTouchEnd={() => setIsOpen(false)}
                className="relative cursor-pointer border-r border-r-[#1678BE] text-lg font-medium hover:bg-[#1678BE] py-3 pl-3 pr-5
                md:pr-12"
              >
                <>
                  <div
                    className="flex items-center gap-3"
                  >
                    <span>
                      <FiMenu size={25} />
                    </span>
                    <span className="cursor-pointer text-lg font-medium">
                        Categories
                    </span>
                  </div>
                  {isOpen && 
                    <div className="absolute top-full left-0 w-full h-fit z-30 bg-white border border-neutral-400/50 rounded-b-2xl overflow-hidden">
                        <ul className='relative'>
                          <ListItem 
                            onTouchStart={() => navigate('/products?category=hardware')} 
                            to='/products?category=hardware' 
                            reloadDocument
                          >
                            Hardware
                          </ListItem>
                          <ListItem 
                            onTouchStart={() => navigate('/products?category=peripherals')} 
                            to='/products?category=peripherals' 
                            reloadDocument
                          >
                            Peripherals
                          </ListItem>
                          <ListItem 
                            onTouchStart={() => navigate('/products?category=computers')} 
                            to='/products?category=computers' 
                            reloadDocument
                          >
                            Computers
                          </ListItem>
                          <ListItem 
                            onTouchStart={() => navigate('/products?category=notebooks')} 
                            to='/products?category=notebooks' 
                            reloadDocument
                          >
                            NoteBooks
                          </ListItem>
                          <ListItem 
                            onTouchStart={() => navigate('/products?category=monitors')} 
                            to='/products?category=monitors' 
                            isLastItem 
                            reloadDocument
                          >
                            Monitors
                          </ListItem>
                        </ul>
                    </div>
                  }
                </>
              </li>
              <MenuItem className='hidden min-[500px]:block' href='/'>Home</MenuItem>
              <MenuItem className='hidden min-[1175px]:block' onClick={() => smoothScrollTo('newlyReleased')}>Newly Released</MenuItem>
              <MenuItem className='hidden min-[700px]:block' onClick={() => smoothScrollTo('featured')}>Day Offers</MenuItem>
              <MenuItem className='hidden min-[550px]:block' onClick={() => smoothScrollTo('news')}>News</MenuItem>
              <MenuItem className='hidden min-[900px]:block' href='/aboutUs'>About Us</MenuItem>
          </ul>
          <div className="flex items-center gap-3 pl-3">
            <FaPhone className='hidden lg:block rotate-90' size={20} />
            <p 
              className="text-nowrap text-sm font-medium
              min-[380px]:font-normal
              min-[380px]:text-lg"
            >Phone: (99) 9 9999-9999</p>
          </div>
        </div>
    </nav>
  )
}

export default TopMenu
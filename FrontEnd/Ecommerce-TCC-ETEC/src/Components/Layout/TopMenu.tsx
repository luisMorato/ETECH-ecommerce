import { useState } from 'react';

import { FaPhone  } from 'react-icons/fa';
import { FiMenu } from "react-icons/fi";
import MenuItem from './MenuItem';
import ListItem from './ListItem';

const TopMenu = () => {
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
        <div className='flex justify-between mx-auto w-5/6'>
          <ul className="flex">
              <li 
                onMouseOver={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className="relative cursor-pointer border-r border-r-[#1678BE] text-lg font-medium py-3 px-6 hover:bg-[#1678BE] pl-3 pr-12"
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
                        <ul>
                          <ListItem to='/products?category=hardware'>Hardware</ListItem>
                          <ListItem to='/products?category=peripherals'>Peripherals</ListItem>
                          <ListItem to='/products?category=computers'>Computers</ListItem>
                          <ListItem to='/products?category=notebooks'>NoteBooks</ListItem>
                          <ListItem to='/products?category=monitors' isLastItem>Monitors</ListItem>
                        </ul>
                    </div>
                  }
                </>
              </li>
              <MenuItem href='/'>Home</MenuItem>
              <MenuItem onClick={() => smoothScrollTo('newlyReleased')}>Newly Released</MenuItem>
              <MenuItem onClick={() => smoothScrollTo('featured')}>Day Offers</MenuItem>
              <MenuItem onClick={() => smoothScrollTo('news')}>News</MenuItem>
              <MenuItem>About Us</MenuItem>
          </ul>
          <div className="flex items-center gap-3">
            <FaPhone className='rotate-90' size={20} />
            <p className="text-lg">Phone: (99) 9 9999-9999</p>
          </div>
        </div>
    </nav>
  )
}

export default TopMenu
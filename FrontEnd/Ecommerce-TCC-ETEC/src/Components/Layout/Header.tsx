import { ChangeEvent, useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

import { SearchContext } from "../../Context/SearchContext";

import { userProps } from '../../interfaces/userProps';

import Navbar from "./Navbar";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";

interface HeaderProps {
  user?: userProps,
}

const Header = ({ user }: HeaderProps) => {
  const navigate = useNavigate();

  const { search, setSearch } = useContext(SearchContext);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const pathname = window.location.pathname;

  window.addEventListener('resize', () => {
    if(window.innerWidth > 768){
      setIsSearchOpen(false);
      return;
    }
  });

  //Handle the search input change
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  //Check if the key pressed is "ENTER" to go to the search page
  const checkKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      navigate('/search');
    }
  }

  //Goes to the search page
  const handleSearchClick = () => {
    if(!window.location.pathname.includes('/search')){
      navigate('/search');
    }
  }

  return (
    <header className="bg-white py-5 w-full">
        {!isSearchOpen ? (
          <div 
            className="flex items-center justify-between flex-1 mx-auto max-lg:px-5
            lg:justify-around
            lg:max-w-4/5"
          >
            <Link to="/">
              <h1 className="max-sm:text-3xl text-4xl text-nowrap text-mainBlue font-medium">E-TECH</h1>
            </Link>
            <div
              className="relative hidden w-[500px]
              md:flex
              md:max-lg:w-[380px]"
            >
              <input
                  name="searchInput"
                  type="text"
                  placeholder="Search For Something..."
                  onChange={(e) => handleSearch(e)}
                  onKeyUp={(e) => checkKeyPressed(e)}
                  value={search}
                  className={`border border-neutral-300 rounded-full py-2 px-3 focus:outline-none text-neutral-400 flex-1
                  ${pathname.includes('/checkout') || pathname.includes('/profile') ? "hidden" : "flex"}`}
              />
              <button
                onClick={handleSearchClick}
                className={`absolute bg-neutral-300 p-2.5 rounded-full top-1/2 -translate-y-1/2 right-0 hover:bg-neutral-400
                ${pathname.includes('/checkout') || pathname.includes('/profile') ? "hidden" : "flex"}`}
              >
                <FaSearch size={20} />
              </button>
            </div>
            <div className="max-md:flex max-md:items-center">
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`flex items-center justify-center bg-neutral-300 rounded-full size-8 hover:bg-neutral-400 md:hidden
                ${pathname.includes('/checkout') || pathname.includes('/profile') ? "hidden" : "flex"}`}
              >
                <IoSearch className="size-5"/>
              </button>
              <Navbar
                user={user}
              />
            </div>
          </div>)
          : 
          (
            <div className="flex items-center gap-2 flex-1 pl-3 pr-5">
              <button
                onClick={() => setIsSearchOpen(false)}
              >
                <FaArrowLeft size={20} className="text-neutral-400 hover:text-black"/>
              </button>
              <div
                className="relative flex flex-1 max-w-[500px]"
              >
                <input
                    name="searchInput"
                    type="text"
                    placeholder="Search For Something..."
                    onChange={(e) => handleSearch(e)}
                    onKeyUp={(e) => checkKeyPressed(e)}
                    value={search}
                    className="border border-neutral-300 rounded-full py-2 px-3 focus:outline-none text-neutral-400 flex-1"
                />
                <button
                  onClick={handleSearchClick}
                  className="absolute bg-neutral-300 p-2.5 rounded-full top-1/2 -translate-y-1/2 right-0 hover:bg-neutral-400"
                >
                  <FaSearch size={20} />
                </button>
              </div>
            </div>
          )
        }
    </header>
    
  )
}

export default Header;
import { ChangeEvent, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

import { SearchContext } from "../../Context/SearchContext";

import { userProps } from '../../interfaces/userProps';

import Navbar from "./Navbar";

interface HeaderProps {
  user?: userProps,
  //userImage: string,
}

const Header = ({ user }: HeaderProps) => {
  const navigate = useNavigate();

  const { search, setSearch } = useContext(SearchContext);

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

  //const pathname = window.location.pathname;

  return (
    <header className="flex flex-1 bg-white py-5">
        <div className="flex items-center justify-around flex-1 mx-auto max-w-4/5">
          <Link to="/"><h1 className="text-mainBlue text-4xl font-medium">E-TECH</h1></Link>
          {<div className="relative flex w-[500px]">
              <input
                  name="searchInput"
                  type="text"
                  placeholder="Search For Something..."
                  onChange={(e) => handleSearch(e)}
                  onKeyUp={(e) => checkKeyPressed(e)}
                  value={search}
                  className={`border border-neutral-300 rounded-full py-2 px-3 focus:outline-none text-neutral-400 flex-1 
                  ${window.location.pathname.includes('/checkout') ? "hidden" : "flex"}`}
              />
              <button
                onClick={handleSearchClick}
                className={`absolute bg-neutral-300 p-[10px] rounded-full top-1/2 -translate-y-1/2 right-0 hover:bg-neutral-400
                ${window.location.pathname.includes('/checkout') ? "hidden" : "flex"}`}
              >
                <FaSearch size={20} />
              </button>
          </div>}
          <Navbar 
            user={user}
            //userImage={userImage}
          />
        </div>
    </header>
    
  )
}

export default Header;
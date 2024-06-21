import { FaCcMastercard,
   FaCcPaypal,
   FaCcVisa,
   FaCcApplePay,
   FaPix,
} from "react-icons/fa6";
import { GiPadlock } from "react-icons/gi";
import { ImLocation2 } from "react-icons/im";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";

import { FaInstagramSquare, FaLinkedin, FaGithub, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-t-neutral-300 py-3">
      <div className="flex justify-evenly gap-5 text-black w-4/5 mx-auto">
        <div className="w-1/4">
          <h2 className="text-2xl font-medium">About</h2>
          <div className="mb-6 mt-3 w-4/5">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo laudantium aliquid consectetur fugit atque vero aperiam delectus tenetur?</p>
          </div>
          <div>
            <ul className="flex gap-4">
              <li><FaCcMastercard size={30} /></li>
              <li><FaCcPaypal size={30} /></li>
              <li><FaCcVisa size={30} /></li>
              <li><FaCcApplePay size={30} /></li>
              <li><FaPix size={30} /></li>
            </ul>
            <span className="flex items-center gap-2 font-medium text-neutral-500"><GiPadlock size={20}/>Secure Online Payment</span>
          </div>
        </div>
        <div className="w-1/4 font-medium">
          <h2 className="text-2xl">Categories</h2>
          <ul className="flex flex-col gap-3 mt-3 list-disc translate-x-5">
            <li>Tópico 1</li>
            <li>Tópico 2</li>
            <li>Tópico 3</li>
            <li>Tópico 4</li>
            <li>Tópico 5</li>
            <li>Tópico 6</li>
          </ul>
        </div>
        <div className="w-1/4 font-medium">
          <h2 className="text-2xl">Informations</h2>
          <ul className="flex flex-col gap-3 mt-3 list-disc translate-x-5">
            <li>About Us</li>
            <li>Work With Us</li>
            <li>Term & Condition</li>
            <li>Private Policy</li>
            <li>Shipping & Delivery</li>
            <li>Return & Exchange</li>
          </ul>
        </div>
        <div className="w-1/4">
          <h2 className="text-2xl font-medium">Find Us</h2>
          <div className="mt-3">
            <span className="flex items-center gap-2 font-medium border-b border-b-neutral-400 pb-4 mb-4">
              <ImLocation2 size={20} /> 
              Adress: XYZ, São Paulo, Brazil.
            </span>
            <div className="flex flex-col gap-4">
              <span className="flex items-center gap-2 font-medium">
                <IoLogoWhatsapp size={25} />
                Phone: (99) 9 9999-9999 
              </span>
              <span className="flex items-center gap-1 font-medium text-nowrap">
                <MdEmail size={25} />
                luisfernandomorato_170701@outlook.com
              </span>
              <ul className="flex gap-3 mt-2">
                <li>
                  <Link to="">
                    <FaInstagramSquare size={30} className="hover:-translate-y-2 transition duration-150"/>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <FaLinkedin size={30} className="hover:-translate-y-2 transition duration-150"/>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <FaGithub size={30} className="hover:-translate-y-2 transition duration-150"/>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <FaYoutube size={30} className="hover:-translate-y-2 transition duration-150"/>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-[90%] border-t border-t-neutral-400 mx-auto mt-5 pt-2">
        <span className="text-black texte-center">© Powered By <strong>Luis Fernando</strong> | 2024</span>
      </div>
    </footer>
  )
}

export default Footer;
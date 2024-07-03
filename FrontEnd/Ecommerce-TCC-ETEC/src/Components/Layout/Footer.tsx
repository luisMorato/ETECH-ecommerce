import { FaCcMastercard,
   FaCcPaypal,
   FaCcVisa,
   FaCcApplePay,
   FaPix,
} from "react-icons/fa6";
import { 
  FaInstagramSquare,
  FaLinkedin,
  FaGithub,
  FaYoutube
} from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";
import { ImLocation2 } from "react-icons/im";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";

import FooterLink from "./FooterLink";
import FooterContainer from "./FooterContainer";
import FooterList from "./FooterList";

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
        <FooterContainer>
          <h2 className="text-2xl">Categories</h2>
          <FooterList>
            <li>Tópico 1</li>
            <li>Tópico 2</li>
            <li>Tópico 3</li>
            <li>Tópico 4</li>
            <li>Tópico 5</li>
            <li>Tópico 6</li>
          </FooterList>
        </FooterContainer>
        <FooterContainer>
          <h2 className="text-2xl">Informations</h2>
          <FooterList>
            <li>About Us</li>
            <li>Work With Us</li>
            <li>Term & Condition</li>
            <li>Private Policy</li>
            <li>Shipping & Delivery</li>
            <li>Return & Exchange</li>
          </FooterList>
        </FooterContainer>
        <FooterContainer>
          <h2 className="text-2xl">Find Us</h2>
          <div className="mt-3">
            <span className="flex items-center gap-2 font-medium border-b border-b-neutral-400 pb-4 mb-4">
              <ImLocation2 size={20} /> 
              Adress: XYZ, São Paulo, Brazil.
            </span>
            <div className="flex flex-col gap-4">
              <span className="flex items-center gap-2">
                <IoLogoWhatsapp size={25} />
                Phone: (99) 9 9999-9999 
              </span>
              <span className="flex items-center gap-1 text-nowrap">
                <MdEmail size={25} />
                luisfernandomorato_170701@outlook.com
              </span>
              <ul className="flex gap-3 mt-2">
                <FooterLink to="https://www.instagram.com/l0u1s_f3r/">
                  <FaInstagramSquare size={30} />
                </FooterLink>
                <FooterLink to="https://www.linkedin.com/in/luis-fernando-morato-da-conceição-985123223/">
                  <FaLinkedin size={30} />
                </FooterLink>
                <FooterLink to="https://github.com/luisMorato?tab=repositories">
                  <FaGithub size={30} />
                </FooterLink>
                <FooterLink to="https://www.youtube.com/watch?v=g3DX4p_PUSI&ab_channel=Boluz113">
                  <FaYoutube size={30} />
                </FooterLink>
              </ul>
            </div>
          </div>
        </FooterContainer>
      </div>
      <div className="flex justify-center items-center w-[90%] border-t border-t-neutral-400 mx-auto mt-5 pt-2">
        <span className="text-black texte-center">© Powered By <strong>Luis Fernando</strong> | 2024</span>
      </div>
    </footer>
  )
}

export default Footer;
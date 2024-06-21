import { 
    FaFacebookF, 
    FaGithub, 
    FaGooglePlusG
} from "react-icons/fa";
import Button from "../../Layout/Button";

const Socials = () => {
    return (
        <div className="relative flex flex-col gap-3 flex-1 border-t border-t-neutral-400 pt-5 mt-3">
            <span className="absolute top-0 -translate-y-3 left-1/2 -translate-x-1/2 text-nowrap text-neutral-400 text-sm bg-white px-1">Or SignUp With Social Media</span>
            <Button
              type="button"
              outline
              className="flex justify-center items-center gap-2"
            >
              <><FaGooglePlusG size={25} /> Google</>
            </Button>
            <Button
              type="button"
              outline
              className="flex justify-center items-center gap-2"
            >
              <><FaGithub size={20} /> GitHub</>
            </Button>
            <Button
              type="button"
              outline
              className="flex justify-center items-center gap-2"
            >
              <><FaFacebookF size={20} /> Facebook</>
            </Button>
        </div>
    )
}

export default Socials;
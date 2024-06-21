import { useContext } from "react";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { LoginModalContext } from "../../../Context/LoginModalContext";
import { RegisterModalContext } from "../../../Context/RegisterModalContext";

import { UseSessionStorage } from "../../../Hooks/useSessionStorage";

import Modal from "../Modal";
import Button from "../../Layout/Button";
import StyledInput from "../../Layout/StyledInput";
import Socials from "./Socials";

const LoginModal = () => {
  const { isOpen, setIsOpen: setLoginIsOpen } = useContext(LoginModalContext);
  const { setIsOpen: setRegisterIsOpen } = useContext(RegisterModalContext);

  const { setToken } = UseSessionStorage('token');

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const toggleToRegister = () => {
    setLoginIsOpen(false);
    setRegisterIsOpen(true);
  }

  const LoginSubmit: SubmitHandler<FieldValues> = async (data) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/user/login`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resJson = await response.json();
      if(!response.ok){
        toast.error(resJson.message);
        return;
      }

      const { token: apiToken, message } = resJson;

      setToken(apiToken);
      toast.success(message);
      
      setTimeout(() => {
        setLoginIsOpen(false);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log("Error: ", error);
      toast.error('Something Went Wrong');
    }
  }
  
  const header: React.ReactElement = (
    <div className="flex items-center border-b border-b-neutral-400 py-2">
        <h2 className='text-black text-xl text-center font-medium flex-1'>Login</h2>
    </div>
  );
  
  const body: React.ReactElement = (
    <>
      <h2 className='text-black text-2xl font-medium'>Welcome Back</h2>
      <form onSubmit={handleSubmit(LoginSubmit)} className="flex flex-col gap-3 mt-5">
          <StyledInput
            name="email"
            label="Email:"
            register={register}
            options={{
              required: true
            }}
            type="email"
            placeholder="johnDoe@test.com"
            errors={errors}
            roundedLg
          />
          <div className="flex flex-col gap-1 mt-5">
            <StyledInput
              name="password"
              label="Password:"
              register={register}
              options={{
                required: true,
                minLength: 1
              }}
              type="password"
              placeholder="******"
              errors={errors}
              roundedLg
            />
            <Link to={""} className="text-neutral-400 hover:underline">Forgot Your Passowrd?</Link>
          </div>
          <Button
            type="submit"
          >
            Login
          </Button>
          <Socials />
      </form>
    </>
  );

  const footer: React.ReactElement = (
    <p className='text-neutral-400 font-medium'>
      Dont Have An Account? <a onClick={toggleToRegister} className='text-black font-bold hover:underline cursor-pointer'>Sign Up</a>
    </p>
  );
  
  return (
    <Modal
      isOpen={isOpen}
      body={body}
      header={header}
      footer={footer}
      onClose={() => setLoginIsOpen(false)}
    />
  )
}

export default LoginModal;
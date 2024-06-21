import { useContext } from "react";
import { 
  useForm, 
  SubmitHandler, 
  FieldValues
} from "react-hook-form"

import { RegisterModalContext } from "../../../Context/RegisterModalContext";
import { LoginModalContext } from "../../../Context/LoginModalContext";

import { toast } from "react-toastify";

import Button from "../../Layout/Button";
import Modal from "../Modal";
import Socials from "./Socials";
import StyledInput from "../../Layout/StyledInput";

const RegisterModal = () => {
  const { setIsOpen: setLoginIsOpen } = useContext(LoginModalContext);
  const { isOpen: isRegisterModalOpen, setIsOpen: setRegisterIsOpen } = useContext(RegisterModalContext);

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });
  
  const toggleToLogin = () => {
    setRegisterIsOpen(false);
    setLoginIsOpen(true);
  }

  const registerSubmit: SubmitHandler<FieldValues> = async (data) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/user`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data)
      });

      const resJson = await response.json();
    
      if(!response.ok){
        toast.error(resJson.message);
        return;
      }

      const { message } = resJson;
      toast.success(message);
    } catch (error) {
      console.log('Error: ',error);
      toast.error('Something Went Wrong!');
    }
  };

  const header: React.ReactElement = (
    <div className="flex items-center border-b border-b-neutral-400 py-2">
        <h2 className='text-black text-xl text-center font-medium flex-1'>Register</h2>
    </div>
  );
  
  const body: React.ReactElement = (
    <>
      <h2 className='text-black text-2xl font-medium'>Welcome</h2>
      <form onSubmit={handleSubmit(registerSubmit)} className="flex flex-col gap-3 mt-5">
          <div className="flex flex-col gap-8 mb-2">
            <StyledInput
              name="name"
              label="Name:"
              register={register}
              options={{
                required: true
              }}
              type="text"
              placeholder="john Doe"
              errors={errors}
              roundedLg
            />
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
            <StyledInput
              name="password"
              label="Password:"
              register={register}
              options={{
                required: true,
                minLength: 6,
                maxLength: 20,
              }}
              type="password"
              placeholder="******"
              errors={errors}
              roundedLg
            />
          </div>
          <Button
              type="submit"
            >
              Create
          </Button>
          <Socials />
      </form>
    </>
  );

  const footer: React.ReactElement = (
    <p className='text-neutral-400 font-medium'>
      Already Have An Account? <a onClick={toggleToLogin} className='text-black font-bold hover:underline cursor-pointer'>Sign In</a>
    </p>
  );
  
  return (
      <Modal
        isOpen={isRegisterModalOpen}
        header={header}
        body={body}
        footer={footer}
        onClose={() => setRegisterIsOpen(false)}
      />
  )
}

export default RegisterModal;
import { userProps } from "../../../interfaces/userProps";

import { IoLocationSharp } from "react-icons/io5";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { captilze } from "../../../utils/captalize";

import Button from "../../Layout/Button";
import AddressBox from "./AddressBox";
import StyledInput from "../../Layout/StyledInput";

interface profileConfigProps {
  user: Omit<userProps, 'password'> | undefined,
  token: string | undefined
}
 
const ProfileConfig = ({ user, token }: profileConfigProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      password: '',
      newPassword: '',
      phoneNumber: user?.phoneNumber ?? '',
      postalCode: user?.postalCode ?? '',
      city: user?.city ?? '',
      address: user?.address ?? '',
      houseNumber: user?.houseNumber ?? null,
      state: user?.state ?? '',
      country: user?.country ?? '',
    }
  });

  //Grab the edited User Data And Make a PUT Request to change it in the Database
  const EditUserDataSubmit: SubmitHandler<FieldValues> = async (data) => {
    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/user`);

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      const value = data[key as keyof Omit<FieldValues, 'role'>];
      if(!value){
        formData.append(key, '');
      }else{
          formData.append(key, String(value))
      }
    });

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          "authorization": `Bearer ${token}`
        },
        body: formData,
      });
  
      const resJson = await response.json();
      const { message } = resJson;
  
      if(!response.ok){
        toast.error(message);
        return;
      }

      toast.success(message);
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  //Make a Request to an External API to get the address Data Automatically through the Postal Code
  const fetchPostalCode = async () => {
    const data: FieldValues = getValues();

    const url = new URL(`https://viacep.com.br/ws/${data.postalCode.replace('-', '')}/json`);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "content-type":"application/json",
        }
      });

      if(!response.ok){
        toast.error('Something Went Wrong!');
        return;
      }

      const resJson = await response.json();
      const { logradouro: apiAddress, localidade: apiCity, uf: apiState } = resJson;

      setValue('address', apiAddress);
      setValue('city', apiCity);
      setValue('state', apiState);
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  //Check If user has all the address details by returning a boolean
  const hasAddressDetails = () => {
    return user?.address && user?.postalCode && user?.country && user?.city && user?.state;
  }
  
  return user && (
    <div className="flex max-xl:flex-col gap-5 my-5">
      <div className="flex flex-col min-h-[570px] h-fit w-full py-5 px-3 bg-white rounded-2xl text-black sm:w-[550px]">
        <h1 
          className="relative text-3xl font-medium w-fit mb-5
          after:absolute
          after:top-full
          after:left-0
          after:bg-mainBlue
          after:h-0.5
          after:w-full"
        >Personal Data</h1>
        <div className="flex items-center justify-center self-center rounded-full bg-neutral-400 size-24 overflow-hidden mb-5">
            {!user.image ?
                <span className="font-bold text-3xl">{captilze(user.name[0])}</span>
                :
                <img src={`${import.meta.env.VITE_BACKEND_URL}/public/images/user/${user.image}`} alt="User Profile Image" />
            }
        </div>
        <form onSubmit={handleSubmit(EditUserDataSubmit)} className="flex flex-col gap-5">
            <StyledInput
              name="name"
              label="Name:"
              register={register}
              options={{
                required: true,
              }}
              type="text"
              placeholder="John Doe"
              errors={errors}
            />
            <div className="flex max-sm:flex-col gap-5 sm:gap-3">
              <StyledInput
                name="password"
                label="Password:"
                register={register}
                options={{
                  required: true,
                }}
                type="password"
                placeholder="******"
                errors={errors}
              />
              <StyledInput
                name="newPassword"
                label="New Password:"
                register={register}
                options={{
                  minLength: 6,
                }}
                type="password"
                placeholder="******"
                errors={errors}
              />
          </div>
          <StyledInput
            name="email"
            label="Email:"
            register={register}
            options={{
              required: true,
            }}
            type="email"
            placeholder="JohnDoe@test.com"
            errors={errors}
          />
          <StyledInput
            name="phoneNumber"
            label="Phone Number:"
            register={register}
            options={{
              pattern: /^\(\d{2}\) 9 \d{4}-\d{4}$/
            }}
            type="text"
            placeholder="(99) 9 9999-9999"
            errors={errors}
          />
          <div className="flex gap-3 items-center">
            <StyledInput
              name="postalCode"
              label="Postal Code:"
              register={register}
              options={{
                pattern: /^\d{5}-\d{3}$/,
              }}
              type="text"
              placeholder="00000-000"
              errors={errors}
              className="max-sm:max-w-[180px]"
            />
            <div>
              <Button
                type="button"
                outline
                onClick={fetchPostalCode}
              >Search</Button>
            </div>
          </div>
          <div className="flex max-sm:flex-col gap-5 sm:gap-3">
            <StyledInput
              name="city"
              label="City:"
              register={register}
              type="text"
              placeholder="City"
              errors={errors}
            />
            <div className="flex max-sm:flex-col gap-5 sm:items-center sm:gap-2">
              <StyledInput
                name="address"
                label="Address:"
                register={register}
                type="text"
                placeholder="Street XYZ"
                errors={errors}
              />
              <StyledInput
                name="houseNumber"
                label="Number:"
                register={register}
                options={{
                  maxLength: 3
                }}
                type="text"
                placeholder="Ex: 123"
                className="max-w-24"
                errors={errors}
              />
            </div>
          </div>
          <StyledInput
            name="state"
            label="State:"
            register={register}
            type="text"
            placeholder="Ex: SP"
            errors={errors}
          />
          <StyledInput
            name="country"
            label="Country:"
            register={register}
            type="text"
            placeholder="Ex: Brazil, United States"
            errors={errors}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
      {user.role !== 'ADMIN' && 
        <>
          {hasAddressDetails() ?
            (<AddressBox
                user={user}
                className="max-h-[200px] border border-mainBlue sm:max-w-[300px]"
              />
            )
            : 
            (<div className="flex flex-col items-center justify-center gap-3 bg-white rounded-xl p-5 w-[250px] max-h-[200px] text-black">
              <IoLocationSharp size={30}/>
              <h2 className="text-xl font-medium">No Adresses</h2>  
            </div>)
          }
        </>
      }
    </div>
  )
}

export default ProfileConfig;
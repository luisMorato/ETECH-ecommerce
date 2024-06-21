import { Dispatch, SetStateAction } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineCancel } from "react-icons/md";

import { userProps } from "../../../interfaces/userProps";

import Button from "../../Layout/Button";
import StyledInput from "../../Layout/StyledInput";

interface deliveryMethodFormProps {
    userData: Omit<userProps, 'id' | 'role'> | undefined
    submitData: SubmitHandler<FieldValues>,
    setEditInfo: Dispatch<SetStateAction<boolean>>
}

const DeliveryMethodForm = ({ userData, submitData, setEditInfo }: deliveryMethodFormProps) => {
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: userData?.name,
            password: '',
            address: userData?.address || '',
            houseNumber: userData?.houseNumber || undefined,
            city: userData?.city || '',
            state: userData?.state || '',
            country: userData?.country || '',
            postalCode: userData?.postalCode || ''
        }
    });
  
    return (
      <div>
          <form onSubmit={handleSubmit(submitData)} className="flex flex-col gap-6 mb-5">
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
              />
              <div className="flex gap-2 items-center">
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
                    type="text"
                    placeholder="Ex: 123"
                    className="max-w-24"
                    errors={errors}
                />
              </div>
              <StyledInput
                  name="city"
                  label="City:"
                  register={register}
                  options={{
                    required: true,
                  }}
                  type="text"
                  placeholder="City"
                  errors={errors}
              />
              <StyledInput
                  name="state"
                  label="State:"
                  register={register}
                  options={{
                    required: true,
                  }}
                  type="text"
                  placeholder="Ex: SP"
                  errors={errors}
              />
              <StyledInput
                  name="country"
                  label="Country:"
                  register={register}
                  options={{
                    required: true,
                  }}
                  type="text"
                  placeholder="Ex: Brazil, United States"
                  errors={errors}
              />
              <StyledInput
                  name="postalCode"
                  label="Postal Code:"
                  register={register}
                  options={{
                    required: true,
                    pattern: /^\d{5}-\d{3}$/,
                  }}
                  type="text"
                  placeholder="Ex: 00000-000"
                  errors={errors}
              />
              <button
                  type="button"
                  className="flex items-center gap-1 font-medium text-neutral-400 -mt-2 w-fit hover:underline"
                  onClick={() => setEditInfo(false)}
              ><MdOutlineCancel size={15}/>Cancel Edit</button>
              <Button
                type="submit"
                className="self-end w-fit"
              >
                Save Changes
              </Button>
          </form>
      </div>
    )
}

export default DeliveryMethodForm;
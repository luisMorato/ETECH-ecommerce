import { 
    FieldValues, 
    useForm,
    SubmitHandler
} from "react-hook-form";
import StyledInput from "../../Layout/StyledInput";
import { toast } from "react-toastify";
import Button from "../../Layout/Button";

interface creditCardFormProps {
    token: string | undefined
}

const CreditCardForm = ({ token }: creditCardFormProps) => {
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            number: '',
            bank: '',
            expiresAt: '',
            cardCode: '',
        }
    });

    const submitCreditCardForm: SubmitHandler<FieldValues> = async (data) => {
        const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/creditCard`);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
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
            }, 3500)
        } catch (error) {
            console.log('Error: ', error);   
        }
    }
  
    return (
        <div className="h-fit py-5 px-3 bg-white w-[550px] rounded-2xl text-black">
            <h2 className="text-xl font-medium mb-7">Credit Card</h2>
            <form onSubmit={handleSubmit(submitCreditCardForm)} className="flex flex-col gap-8">
                <div className="flex items-center gap-5">
                    <StyledInput
                        name="number"
                        label="Number:"
                        register={register}
                        options={{
                            required: true,
                            pattern: /^\d{4} \d{4} \d{4} \d{4}$/
                        }}
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        errors={errors}
                    />
                    <StyledInput
                        name="bank"
                        label="Bank:"
                        register={register}
                        options={{
                            required: true,
                        }}
                        type="text"
                        placeholder="Bank Name"
                        errors={errors}
                    />
                </div>
                <div className="flex items-center gap-5">
                    <StyledInput
                        name="expiresAt"
                        label="Expiration (MM/YY):"
                        register={register}
                        options={{
                            required: true,
                            pattern: /^(0[1-9]|1[0-2])\/\d{2}$/
                        }}
                        type="text"
                        placeholder="MM/YY"
                        errors={errors}
                    />
                    <StyledInput
                        name="cardCode"
                        label="Card Security Code:"
                        register={register}
                        options={{
                            required: true,
                            minLength: 1,
                            maxLength: 3,
                        }}
                        type="text"
                        placeholder="Ex: 355"
                        errors={errors}
                    />
                </div>
                <Button
                    type="submit"
                    className="w-fit self-end"
                >
                    Save
                </Button>
            </form>
        </div>
    )
}

export default CreditCardForm;
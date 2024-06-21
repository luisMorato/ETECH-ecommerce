import { ComponentProps, useState } from "react";
import { 
    FieldErrors, 
    FieldValues, 
    UseFormRegister,
    ValidationRule
} from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface styledInputProps extends ComponentProps<"input"> {
    name: string,
    label: string,
    register: UseFormRegister<FieldValues>,
    options?: {
        minLength?: number,
        maxLength?: number,
        pattern?: ValidationRule<RegExp>,
        required?: boolean
    },
    errors: FieldErrors,
    roundedLg?: boolean
}

const StyledInput = ({ name, label, register, options, errors, roundedLg, ...props }: styledInputProps) => {
    const currentUrl = new URL(window.location.toString());
    const option = currentUrl.searchParams.get('option');

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={`relative flex flex-1 border border-neutral-400 ${roundedLg ? "rounded-lg" : "rounded-2xl"} ${errors[name] && "border-rose-500"}`}>
            <label 
                htmlFor={name} 
                className={`absolute top-0 left-3 px-1 text-black font-medium bg-white 
                ${roundedLg ? "text-base -translate-y-3.5" : "text-sm -translate-y-3"}`}
            >
                {label}
            </label>
            <input
                {...register(name, { 
                    required: options?.required, 
                    minLength: options?.minLength, 
                    pattern: options?.pattern 
                })}
                {...props}
                type={showPassword ? "text" : props.type}
                className={twMerge(props.className, "placeholder:text-neutral-400 text-neutral-800 px-3 py-2 flex-1 rounded-2xl focus:outline-none")}
            />
            {props.type === "password" && option !== "profileConfig" && (
                <button
                    type="button"
                    onClick={() => setShowPassword((prevValue) => !prevValue)}
                    className="mr-3 text-neutral-400"
                >
                    {showPassword ?
                        <FaEye size={15} className="hover:text-black transition duration-75" />
                        :
                        <FaEyeSlash size={15} className="hover:text-black transition duration-75" />
                    }
                </button>
            )

            }
        </div>
    )
}

export default StyledInput;
import { ComponentProps } from "react"
import { IoMdChatboxes } from "react-icons/io"

interface chatButtonProps extends ComponentProps<"button"> {}

const ChatButton = ({ ...props }: chatButtonProps) => {
    return (
        <button { ...props } className='fixed z-40 bottom-5 right-5 flex items-center justify-center rounded-full text-white border bg-mainBlue p-2'>
            <IoMdChatboxes size={30} />
        </button>
    )
}

export default ChatButton;
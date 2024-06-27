import { 
    useCallback,
    useEffect,
    useState,
 } from 'react';
import { FaX } from 'react-icons/fa6';

interface modalProps {
    isOpen: boolean,
    header: React.ReactElement,
    body: React.ReactElement,
    footer: React.ReactElement,
    onClose: () => void
}

const Modal = ({ isOpen, header, body, footer, onClose }: modalProps) => {
    const [showModal, setShowModal] = useState<boolean>(isOpen);
    
    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    //Awaits 300ms before set the IsOpen to false, to anable the animation of the modal translating
    const handleClose = useCallback(() => {
        setShowModal(false);

        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);

    return (
        <div className={`${isOpen ? "opacity-100 fixed z-50 flex items-center justify-center w-full h-full bg-black/80" : "opacity-0 hidden"} `}>
            <div
                className={`bg-white text-black rounded-2xl translate opacity duration-300 px-3 w-[400px]
                    ${showModal ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`
                }
            >
                {/* Header */}
                <div className="relative">
                    <button onClick={handleClose} className='absolute top-1/2 -translate-y-1/2 left-3 text-neutral-400 hover:text-black'>
                        <FaX size={15} />
                    </button> 
                    {header}
                </div>
                {/* Body */}
                <div className="flex flex-col px-5 py-2">
                    {body}
                </div>
                {/* Footer */}
                <div className='px-5 py-3'>
                    {footer}
                </div>
            </div>
        </div>
    )
}

export default Modal;
import { ChangeEvent, FormEvent, SetStateAction } from "react";
import Button from "../Layout/Button";
import { FaUserAlt } from "react-icons/fa";
import { captilze } from "../../utils/captalize";

interface commentProps {
    id: number,
    text: string,
    user: {
      id: number, 
      name: string, 
      image?: string,
    }
}

interface commetsProps {
    addComment: (e: FormEvent<HTMLFormElement>, text: string) => void,
    setText: React.Dispatch<SetStateAction<string>>,
    text: string,
    comments: commentProps[],
}

const CommentsSection = ({ addComment, setText, text, comments }: commetsProps) => {
    const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }

    return (
        <div className="bg-white p-5 rounded-xl">
            <h2 className="text-lg font-medium mb-3">Comments</h2>
            {comments && comments.length > 0 &&
             comments.map((data) => (
                <div key={data?.id} className="flex gap-2 mb-5">
                    <div className="flex items-center justify-center self-end text-neutral-400 border border-neutral-400 rounded-full overflow-hidden size-10">
                       {!data.user.image ?
                            <FaUserAlt size={25} />
                            :
                            <img src={data.user?.image} alt={`${data?.user.name}-image`} />
                        }
                    </div>
                    <div className="relative bg-neutral-200 px-3 py-1 rounded-2xl">
                        <div className="absolute bottom-0 left-0 bg-neutral-200 w-3 h-3"></div>
                        <span className="font-medium">{captilze(data?.user.name)}</span>
                        <p>{data?.text}</p>
                    </div>
                </div>
            ))}
            <div>
                <form onSubmit={(e) => addComment(e, text)} className="flex flex-col gap-3">
                    <textarea 
                        name="comment" 
                        id="comment"
                        placeholder="Type Your Comment"
                        className="border border-neutral-400 rounded-xl text-neutral-400 py-1 px-3 focus:outline-none h-[120px]"
                        value={text}
                        onChange={(e) => handleCommentChange(e)}
                    ></textarea>
                    <Button
                        type="submit"
                    >Public</Button>
                </form>
            </div>
        </div>
    )
}

export default CommentsSection;
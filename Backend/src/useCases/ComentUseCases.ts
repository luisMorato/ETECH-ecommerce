import { db } from "../lib/db/db";

import {
  commentProps,
  commentsUseCasesProps,
} from "../interfaces/Comment.interface";
import { Comment } from "../entities/Comment";

export class CommentsUseCases implements commentsUseCasesProps {
  createComment = async ({ productId, userId, text }: commentProps) => {
    try {
      const create = await db?.comment.create({
        data: {
          productId,
          userId,
          text,
        },
      });

      if (create) {
        const comment = new Comment(create);

        return comment.getCommentData || null;
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
}

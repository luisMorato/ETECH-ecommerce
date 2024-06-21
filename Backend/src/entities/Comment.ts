import { DbcommentsProps } from "../interfaces/Comment.interface";

export class Comment {
  private props: DbcommentsProps;

  constructor(props: DbcommentsProps) {
    this.props = props;
  }

  get getCommentData(): DbcommentsProps {
    return this.props;
  }
}

import { Types } from "mongoose";

export type TGardeningPosts = {
  userId: Types.ObjectId;
  postContent: string;
  upvote: Types.ObjectId[];
  downvote: Types.ObjectId[];
  isDeleted: boolean;
};
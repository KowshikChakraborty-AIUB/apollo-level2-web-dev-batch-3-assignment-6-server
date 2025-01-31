import { Types } from "mongoose";

export type TGardeningPosts = {
  userId: Types.ObjectId;
  postContent: string;
  isDeleted: boolean;
};
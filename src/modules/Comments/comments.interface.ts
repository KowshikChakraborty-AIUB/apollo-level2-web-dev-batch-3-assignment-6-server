import { Types } from 'mongoose';

export type TComment = {
    userId: Types.ObjectId;
    postId: Types.ObjectId;
    commentText: string;
    isDeleted: boolean;
};
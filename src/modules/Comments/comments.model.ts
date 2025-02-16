import { Schema, model } from 'mongoose';
import { TComment } from './comments.interface';

const CommentSchema = new Schema<TComment>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'GardeningPosts',
        required: true,
    },
    commentText: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true
    }

);

export const Comments = model<TComment>('Comments', CommentSchema);
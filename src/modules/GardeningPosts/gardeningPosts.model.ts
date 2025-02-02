import { Schema, model } from 'mongoose';
import { TGardeningPosts } from './gardeningPosts.interface';

const gardeningSchema = new Schema<TGardeningPosts>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        postContent: { type: String, required: true },
        upvote: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
        downvote: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

export const GardeningPosts = model<TGardeningPosts>('GardeningPosts', gardeningSchema);
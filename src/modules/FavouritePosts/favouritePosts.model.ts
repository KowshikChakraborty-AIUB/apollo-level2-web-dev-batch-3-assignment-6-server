import { model } from 'mongoose';
import { TFavourite } from './favouritePosts.interface';
import { Schema } from 'mongoose';

const favouriteSchema = new Schema<TFavourite>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'GardeningPosts', required: true },
});

export const FavouritePosts = model<TFavourite>('FavouritePosts', favouriteSchema);
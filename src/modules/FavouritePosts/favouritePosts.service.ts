import { FavouritePosts } from './favouritePosts.model';

const createFavouritePostsIntoDB = async (userId: string, postId: string) => {

    const existingFavouritePosts = await FavouritePosts.findOne({ userId, postId });

    if (existingFavouritePosts) {
        await FavouritePosts.findByIdAndDelete(existingFavouritePosts._id);
        return { message: 'Post removed from favourites', isFavourite: false };
    } else {
        const newFavourite = new FavouritePosts({ userId, postId });
        await newFavourite.save();
        return { message: 'Post added to favourites', isFavourite: true };
    }
};

const getFavouritePostsFromDB = async (userId: string) => {
    const result = FavouritePosts.find({ userId })
        .populate({
            path: 'postId', // This will populate userId inside the postId
            populate: {
                path: 'userId',
                select: '-password' // Optionally exclude password from the populated userId
            }
        })
        .populate({
            path: 'userId',
            select: '-password',
        });
    return result;
};

export const FavouritePostsServices = {
    createFavouritePostsIntoDB,
    getFavouritePostsFromDB
};
import { ObjectId } from 'mongodb';
import { TGardeningPosts } from "./gardeningPosts.interface";
import { GardeningPosts } from "./gardeningPosts.model";

const createGardeningPostsIntoDB = async (payload: TGardeningPosts) => {
    const result = GardeningPosts.create(payload);
    return result;
};

const getAllGardeningPostsFromDB = async () => {
    const result = GardeningPosts.find({ isDeleted: false }).populate('userId');
    return result;
};


const getGardeningPostsByUserIdFromDB = async (id: string) => {
    const result = await GardeningPosts.find({ userId: id, isDeleted: false })
        .populate("userId")
    return result;
};

const gardeningPostsUpvote = async (postId: string, userId: string) => {
    const gardeningPost = await GardeningPosts.findById(postId);

    if (!gardeningPost) throw new Error('Post not found');

    const userIdObjectId = new ObjectId(userId);


    if (gardeningPost.upvote.includes(userIdObjectId)) {
        return { message: 'Already upvoted the post' };
    }

    gardeningPost.downvote = gardeningPost.downvote.filter(
        (id) => id.toString() !== userId,
    );

    gardeningPost.upvote.push(userIdObjectId);

    await gardeningPost.save();
    return { message: 'Upvoted successfully', post: gardeningPost };
};

const gardeningPostsDownvote = async (postId: string, userId: string) => {
    const gardeningPost = await GardeningPosts.findById(postId);

    if (!gardeningPost) throw new Error('Post not found');

    const userIdObjectId = new ObjectId(userId);

    if (gardeningPost.downvote.includes(userIdObjectId)) {
        return { message: 'Already downvoted the post' };
    }

    gardeningPost.upvote = gardeningPost.upvote.filter(
        (id) => id.toString() !== userId,
    );

    gardeningPost.downvote.push(userIdObjectId);

    await gardeningPost.save();
    return { message: 'Post downvoted successfully', post: gardeningPost };
};

export const GardeningPostsServices = {
    createGardeningPostsIntoDB,
    getAllGardeningPostsFromDB,
    getGardeningPostsByUserIdFromDB,
    gardeningPostsUpvote,
    gardeningPostsDownvote
};
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

export const GardeningPostsServices = {
    createGardeningPostsIntoDB,
    getAllGardeningPostsFromDB,
    getGardeningPostsByUserIdFromDB
};
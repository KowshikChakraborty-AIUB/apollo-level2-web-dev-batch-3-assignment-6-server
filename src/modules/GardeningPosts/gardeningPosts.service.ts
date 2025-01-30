import { TGardeningPosts } from "./gardeningPosts.interface";
import { GardeningPosts } from "./gardeningPosts.model";

const createGardeningPostsIntoDB = async (payload: TGardeningPosts) => {
    const result = GardeningPosts.create(payload);
    return result;
};

const getAllGardeningPostsFromDB = async () => {
    const result = GardeningPosts.find({ isDeleted: false })
    return result;
  };

export const GardeningPostsServices = {
    createGardeningPostsIntoDB,
    getAllGardeningPostsFromDB
};
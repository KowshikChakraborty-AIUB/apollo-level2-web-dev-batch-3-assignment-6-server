import httpStatus from "http-status";
import AppError from "../../Errors/AppError";
import { GardeningPosts } from "../GardeningPosts/gardeningPosts.model";
import { Comments } from "./comments.model";
import { TComment } from "./comments.interface";

const createcommentsIntoDB = async (payload: TComment) => {
    const postData = await GardeningPosts.findById(payload.postId);

    if (!postData) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'This gardening post is not exist!',
        );
    }

    const result = Comments.create(payload);
    return result;
};

export const CommentsServices = {
    createcommentsIntoDB,
};
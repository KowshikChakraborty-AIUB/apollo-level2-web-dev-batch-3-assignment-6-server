import catchAsync from "../../Utils/catchAsync";
import sendResponse from "../../Utils/sendResponse";
import { GardeningPostsServices } from "./gardeningPosts.service";

const createGardeningPosts = catchAsync(async (req, res) => {
    const result = await GardeningPostsServices.createGardeningPostsIntoDB(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Post created successfully! Check Out News Feed or Your Feed',
        data: result,
    });
});

const getAllGardeningPosts = catchAsync(async (req, res) => {
    const result = await GardeningPostsServices.getAllGardeningPostsFromDB();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All Posts retrieved successfully",
        data: result,
    });
});

const getGardeningPostsByUserId = catchAsync(async (req, res) => {
    const result = await GardeningPostsServices.getGardeningPostsByUserIdFromDB(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User's Posts retrieved successfully",
        data: result,
    });
});

export const GardeningPostsControllers = {
    createGardeningPosts,
    getAllGardeningPosts,
    getGardeningPostsByUserId
};
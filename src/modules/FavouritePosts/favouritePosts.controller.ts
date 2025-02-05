import catchAsync from "../../Utils/catchAsync";
import sendResponse from "../../Utils/sendResponse";
import { FavouritePostsServices } from "./favouritePosts.service";


const createFavouritePosts = catchAsync(async (req, res) => {
    const { userId, postId } = req.body;

    const result = await FavouritePostsServices.createFavouritePostsIntoDB(userId, postId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: result.isFavourite ? 'Post added to favourites' : 'Post removed from favourites',
        data: result,
    });
});

const getFavouritePosts = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const result = await FavouritePostsServices.getFavouritePostsFromDB(userId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User favourite posts retrieved successfully',
        data: result,
    });

});


export const FavouritePostsControllers = {
    createFavouritePosts,
    getFavouritePosts
};
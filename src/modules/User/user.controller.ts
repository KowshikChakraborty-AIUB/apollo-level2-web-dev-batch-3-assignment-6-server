import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../Utils/sendResponse";
//import sendResponse from "../../Utils/sendResponse";

const registerUser = catchAsync(async (req, res) => {
    const result = await UserServices.registerUserIntoDB(req.body);
    const { _id, name, email, phone, address, profileImg, role, verified, following, followers } = result.result;
    const token = result.accessToken

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'User registered successfully',
        data: { _id, name, email, phone, address, profileImg, role, verified, following, followers },
        token: token
    });
});

const getUsersByUserId = catchAsync(async (req, res) => {
    const { useId } = req.params;

    const result = await UserServices.getUsersByUserIdFromDB(useId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Users by user Id retrieved successfully',
        data: result,
    });
});

const followUnfollowUsers = catchAsync(async (req, res) => {
    const { userId, userIWantToFolllowId, action } = req.params;

    let result;
    if (action === 'follow') {
        result = await UserServices.followUser(userId, userIWantToFolllowId);
    } else if (action === 'unfollow') {
        result = await UserServices.unfollowUser(userId, userIWantToFolllowId);
    } else {
        return sendResponse(res, {
            statusCode: 400,
            success: false,
            message: 'Error! "follow" or "unfollow" should be expected',
            data: null,
        });
    }

    sendResponse(res, {
        statusCode: 200,
        success: result.success,
        message: result.message,
        data: result.data,
    });
});

export const UserControllers = {
    registerUser,
    getUsersByUserId,
    followUnfollowUsers
};
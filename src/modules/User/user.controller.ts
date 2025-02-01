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

export const UserControllers = {
    registerUser,
    getUsersByUserId
};
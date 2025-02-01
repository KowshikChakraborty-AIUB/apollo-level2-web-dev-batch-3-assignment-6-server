import catchAsync from "../../Utils/catchAsync";
import sendResponse from "../../Utils/sendResponse";
import { CommentsServices } from "./comments.service";

const createComments = catchAsync(async (req, res) => {
    const result = await CommentsServices.createcommentsIntoDB(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Comment added successfully',
        data: result,
    });
});

export const CommentsControllers = {
    createComments
};
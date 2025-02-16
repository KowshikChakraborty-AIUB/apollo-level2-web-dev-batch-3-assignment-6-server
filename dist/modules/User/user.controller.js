"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../Utils/catchAsync"));
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../Utils/sendResponse"));
const user_model_1 = require("./user.model");
//import sendResponse from "../../Utils/sendResponse";
const registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.registerUserIntoDB(req.body);
    const { _id, name, email, phone, address, profileImg, role, verified, following, followers } = result.result;
    const token = result.accessToken;
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User registered successfully',
        data: { _id, name, email, phone, address, profileImg, role, verified, following, followers },
        token: token
    });
}));
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.getAllUsersFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'All users retrieved successfully',
        data: result,
    });
}));
const getUsersByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { useId } = req.params;
    const result = yield user_service_1.UserServices.getUsersByUserIdFromDB(useId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Users by user Id retrieved successfully',
        data: result,
    });
}));
const getUserByEmailId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const result = yield user_service_1.UserServices.getUserByEmailIdFromDB(email);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User retrieved successfully',
        data: result,
    });
}));
const updateUserByEmailId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const updateData = req.body;
    const result = yield user_service_1.UserServices.updateUserByEmailId(email, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User updated successfully',
        data: result,
    });
}));
const followUnfollowUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, userIWantToFolllowId, action } = req.params;
    let result;
    if (action === 'follow') {
        result = yield user_service_1.UserServices.followUser(userId, userIWantToFolllowId);
    }
    else if (action === 'unfollow') {
        result = yield user_service_1.UserServices.unfollowUser(userId, userIWantToFolllowId);
    }
    else {
        return (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: 'Error! "follow" or "unfollow" should be expected',
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: result.success,
        message: result.message,
        data: result.data,
    });
}));
const updateUserRole = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield user_service_1.UserServices.updateUserRoleIntoDB((_a = req.params) === null || _a === void 0 ? void 0 : _a.userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Role updated successfully",
        data: result,
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const result = yield user_service_1.UserServices.deleteUserFromDB((_b = req.params) === null || _b === void 0 ? void 0 : _b.userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User deleted successfully",
        data: result,
    });
}));
const getTotalUsersCount = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const totalUsers = yield user_model_1.User.countDocuments();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Total Users retrieved successfully',
        data: totalUsers,
    });
}));
exports.UserControllers = {
    registerUser,
    getAllUsers,
    getUsersByUserId,
    followUnfollowUsers,
    getUserByEmailId,
    updateUserByEmailId,
    updateUserRole,
    deleteUser,
    getTotalUsersCount
};

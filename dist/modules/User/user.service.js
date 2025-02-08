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
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const user_model_1 = require("./user.model");
const auth_utils_1 = require("../Auth/auth.utils");
const config_1 = __importDefault(require("../../config"));
const mongoose_1 = require("mongoose");
const registerUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    // checking if the user is exist
    const user = yield (user_model_1.User === null || user_model_1.User === void 0 ? void 0 : user_model_1.User.isUserExistsByEmail(payload.email));
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User is not found');
    }
    //create token and sent to the  client
    const jwtPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profileImg: user.profileImg,
        address: user.address,
        payment: user.payment,
        verified: user.verified,
        followers: user.followers,
        following: user.following,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        result,
        accessToken,
    };
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_model_1.User.find({ isDeleted: { $ne: true } }).select('-password');
    return result;
});
const getUsersByUserIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({ _id: userId });
    return result;
});
const getUserByEmailIdFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ email: email }).select('-password');
    return result;
});
const updateUserByEmailId = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield user_model_1.User.findOne({ email: email });
    if (!userData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found');
    }
    const updatedUser = yield user_model_1.User.findOneAndUpdate({ email }, { $set: payload }, { new: true, runValidators: true });
    return updatedUser;
});
const followUser = (userId, userIWantToFolllowId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    const userIWantToFolllow = yield user_model_1.User.findById(userIWantToFolllowId);
    if (!user || !userIWantToFolllow) {
        return {
            success: false,
            message: 'User is not found',
            data: null,
        };
    }
    const isAlreadyFollowing = user.following.includes(new mongoose_1.Types.ObjectId(userIWantToFolllowId));
    const isAlreadyFollower = userIWantToFolllow.followers.includes(new mongoose_1.Types.ObjectId(userId));
    if (isAlreadyFollowing || isAlreadyFollower) {
        return {
            success: false,
            message: 'You are already following this user',
            data: null,
        };
    }
    user.following.push(new mongoose_1.Types.ObjectId(userIWantToFolllowId));
    userIWantToFolllow.followers.push(new mongoose_1.Types.ObjectId(userId));
    yield user.save();
    yield userIWantToFolllow.save();
    return {
        success: true,
        message: 'You are following this user now',
        data: { following: user.following, followers: userIWantToFolllow.followers },
    };
});
const unfollowUser = (userId, userIWantToFolllowId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    const userIWantToFollow = yield user_model_1.User.findById(userIWantToFolllowId);
    if (!user || !userIWantToFollow) {
        return {
            success: false,
            message: 'User not found',
            data: null,
        };
    }
    const isFollowing = user.following.includes(new mongoose_1.Types.ObjectId(userIWantToFolllowId));
    const isFollower = userIWantToFollow.followers.includes(new mongoose_1.Types.ObjectId(userId));
    if (!isFollowing || !isFollower) {
        return {
            success: false,
            message: 'You are not following this user',
            data: null,
        };
    }
    user.following = user.following.filter((id) => !id.equals(new mongoose_1.Types.ObjectId(userIWantToFolllowId)));
    userIWantToFollow.followers = userIWantToFollow.followers.filter((id) => !id.equals(new mongoose_1.Types.ObjectId(userId)));
    yield user.save();
    yield userIWantToFollow.save();
    return {
        success: true,
        message: 'You unfollowed this user',
        data: { following: user.following, followers: userIWantToFollow.followers },
    };
});
const updateUserRoleIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ _id: id });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User is not found');
    }
    if ((user === null || user === void 0 ? void 0 : user.role) === "user") {
        return yield user_model_1.User.findByIdAndUpdate(id, { role: "admin" }, { new: true, runValidators: true });
    }
    if ((user === null || user === void 0 ? void 0 : user.role) === "admin") {
        return yield user_model_1.User.findByIdAndUpdate(id, { role: "user" }, { new: true, runValidators: true });
    }
});
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findByIdAndUpdate(id, { isDeleted: true }, { new: true, upsert: true });
});
exports.UserServices = {
    registerUserIntoDB,
    getAllUsersFromDB,
    getUsersByUserIdFromDB,
    followUser,
    unfollowUser,
    getUserByEmailIdFromDB,
    updateUserByEmailId,
    updateUserRoleIntoDB,
    deleteUserFromDB
};

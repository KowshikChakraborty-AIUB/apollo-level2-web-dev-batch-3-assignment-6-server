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
exports.GardeningPostsControllers = void 0;
const catchAsync_1 = __importDefault(require("../../Utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../Utils/sendResponse"));
const gardeningPosts_service_1 = require("./gardeningPosts.service");
const createGardeningPosts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gardeningPosts_service_1.GardeningPostsServices.createGardeningPostsIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Post created successfully! Check Out News Feed or Your Feed',
        data: result,
    });
}));
const getAllGardeningPosts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gardeningPosts_service_1.GardeningPostsServices.getAllGardeningPostsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "All Posts retrieved successfully",
        data: result,
    });
}));
const getGardeningPostsByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gardeningPosts_service_1.GardeningPostsServices.getGardeningPostsByUserIdFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User's Posts retrieved successfully",
        data: result,
    });
}));
const gardeningPostsUpvoteControllers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, userId } = req.params;
    const result = yield gardeningPosts_service_1.GardeningPostsServices.gardeningPostsUpvote(postId, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Post upvoted successfully',
        data: result,
    });
}));
const gardeningPostsDownvoteControllers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, userId } = req.params;
    const result = yield gardeningPosts_service_1.GardeningPostsServices.gardeningPostsDownvote(postId, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Post downvoted successfully',
        data: result,
    });
}));
exports.GardeningPostsControllers = {
    createGardeningPosts,
    getAllGardeningPosts,
    getGardeningPostsByUserId,
    gardeningPostsUpvoteControllers,
    gardeningPostsDownvoteControllers,
};

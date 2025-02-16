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
exports.CommentsServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const gardeningPosts_model_1 = require("../GardeningPosts/gardeningPosts.model");
const comments_model_1 = require("./comments.model");
const createcommentsIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const postData = yield gardeningPosts_model_1.GardeningPosts.findById(payload.postId);
    if (!postData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This gardening post is not exist!');
    }
    const result = comments_model_1.Comments.create(payload);
    return result;
});
const getCommentsByPostIdFromDB = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield comments_model_1.Comments.find({ postId, isDeleted: false })
        .populate('postId')
        .populate({
        path: 'userId',
        select: '-password',
    });
    return comments;
});
const getPostsAndCommentsTrendFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Aggregate posts count by date
        const postsData = yield gardeningPosts_model_1.GardeningPosts.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    posts: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        // Aggregate comments count by date
        const commentsData = yield comments_model_1.Comments.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    comments: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        // Merge posts and comments data into a single trend array
        const trendMap = {};
        postsData.forEach((entry) => {
            trendMap[entry._id] = { date: entry._id, posts: entry.posts, comments: 0 };
        });
        commentsData.forEach((entry) => {
            if (trendMap[entry._id]) {
                trendMap[entry._id].comments = entry.comments;
            }
            else {
                trendMap[entry._id] = { date: entry._id, posts: 0, comments: entry.comments };
            }
        });
        // Convert trendMap to array
        const postsAndCommentsTrend = Object.values(trendMap);
        return postsAndCommentsTrend;
    }
    catch (error) {
        console.error("Error fetching analytics data:", error);
        return [];
    }
});
exports.CommentsServices = {
    createcommentsIntoDB,
    getCommentsByPostIdFromDB,
    getPostsAndCommentsTrendFromDB
};

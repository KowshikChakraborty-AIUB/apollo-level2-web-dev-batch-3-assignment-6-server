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
exports.CommentsServices = {
    createcommentsIntoDB,
    getCommentsByPostIdFromDB
};

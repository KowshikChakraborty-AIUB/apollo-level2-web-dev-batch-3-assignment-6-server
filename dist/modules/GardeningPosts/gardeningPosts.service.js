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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GardeningPostsServices = void 0;
const mongodb_1 = require("mongodb");
const gardeningPosts_model_1 = require("./gardeningPosts.model");
const createGardeningPostsIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = gardeningPosts_model_1.GardeningPosts.create(payload);
    return result;
});
const getAllGardeningPostsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = gardeningPosts_model_1.GardeningPosts.find({ isDeleted: false }).populate('userId');
    return result;
});
const getGardeningPostsByUserIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gardeningPosts_model_1.GardeningPosts.find({ userId: id, isDeleted: false })
        .populate("userId");
    return result;
});
const gardeningPostsUpvote = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const gardeningPost = yield gardeningPosts_model_1.GardeningPosts.findById(postId);
    if (!gardeningPost)
        throw new Error('Post not found');
    const userIdObjectId = new mongodb_1.ObjectId(userId);
    if (gardeningPost.upvote.includes(userIdObjectId)) {
        return { message: 'Already upvoted the post' };
    }
    gardeningPost.downvote = gardeningPost.downvote.filter((id) => id.toString() !== userId);
    gardeningPost.upvote.push(userIdObjectId);
    yield gardeningPost.save();
    return { message: 'Upvoted successfully', post: gardeningPost };
});
const gardeningPostsDownvote = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const gardeningPost = yield gardeningPosts_model_1.GardeningPosts.findById(postId);
    if (!gardeningPost)
        throw new Error('Post not found');
    const userIdObjectId = new mongodb_1.ObjectId(userId);
    if (gardeningPost.downvote.includes(userIdObjectId)) {
        return { message: 'Already downvoted the post' };
    }
    gardeningPost.upvote = gardeningPost.upvote.filter((id) => id.toString() !== userId);
    gardeningPost.downvote.push(userIdObjectId);
    yield gardeningPost.save();
    return { message: 'Post downvoted successfully', post: gardeningPost };
});
exports.GardeningPostsServices = {
    createGardeningPostsIntoDB,
    getAllGardeningPostsFromDB,
    getGardeningPostsByUserIdFromDB,
    gardeningPostsUpvote,
    gardeningPostsDownvote
};

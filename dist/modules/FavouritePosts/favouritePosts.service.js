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
exports.FavouritePostsServices = void 0;
const favouritePosts_model_1 = require("./favouritePosts.model");
const createFavouritePostsIntoDB = (userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingFavouritePosts = yield favouritePosts_model_1.FavouritePosts.findOne({ userId, postId });
    if (existingFavouritePosts) {
        yield favouritePosts_model_1.FavouritePosts.findByIdAndDelete(existingFavouritePosts._id);
        return { message: 'Post removed from favourites', isFavourite: false };
    }
    else {
        const newFavourite = new favouritePosts_model_1.FavouritePosts({ userId, postId });
        yield newFavourite.save();
        return { message: 'Post added to favourites', isFavourite: true };
    }
});
const getFavouritePostsFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = favouritePosts_model_1.FavouritePosts.find({ userId })
        .populate({
        path: 'postId', // This will populate userId inside the postId
        populate: {
            path: 'userId',
            select: '-password' // Optionally exclude password from the populated userId
        }
    })
        .populate({
        path: 'userId',
        select: '-password',
    });
    return result;
});
exports.FavouritePostsServices = {
    createFavouritePostsIntoDB,
    getFavouritePostsFromDB
};

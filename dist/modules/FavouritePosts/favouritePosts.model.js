"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavouritePosts = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const favouriteSchema = new mongoose_2.Schema({
    userId: { type: mongoose_2.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose_2.Schema.Types.ObjectId, ref: 'GardeningPosts', required: true },
});
exports.FavouritePosts = (0, mongoose_1.model)('FavouritePosts', favouriteSchema);

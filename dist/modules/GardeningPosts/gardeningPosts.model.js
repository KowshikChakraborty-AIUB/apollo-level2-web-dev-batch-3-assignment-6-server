"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GardeningPosts = void 0;
const mongoose_1 = require("mongoose");
const gardeningSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    postContent: { type: String, required: true },
    upvote: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'User', default: [] },
    downvote: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'User', default: [] },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.GardeningPosts = (0, mongoose_1.model)('GardeningPosts', gardeningSchema);

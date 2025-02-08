"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsValidationSchema = void 0;
const zod_1 = require("zod");
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const createCommentsValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().regex(objectIdRegex, 'Invalid user ID format'),
        postId: zod_1.z.string().regex(objectIdRegex, 'Invalid post ID format'),
        commentText: zod_1.z.string()
    }),
});
exports.commentsValidationSchema = {
    createCommentsValidationSchema
};

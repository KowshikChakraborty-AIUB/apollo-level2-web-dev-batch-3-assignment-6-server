"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createFavouritePostsValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format'),
        postId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format'),
    }),
});
exports.default = createFavouritePostsValidationSchema;

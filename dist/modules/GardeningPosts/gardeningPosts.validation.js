"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gardeningPostsValidationSchema = void 0;
const zod_1 = require("zod");
exports.gardeningPostsValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        postContent: zod_1.z.string().min(1, 'Content is required'),
    }),
});

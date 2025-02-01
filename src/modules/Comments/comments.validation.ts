import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/

const createCommentsValidationSchema = z.object({
    body: z.object({
        userId: z.string().regex(objectIdRegex, 'Invalid user ID format'),
        postId: z.string().regex(objectIdRegex, 'Invalid post ID format'),
        commentText: z.string()

    }),
});

export const commentsValidationSchema = {
    createCommentsValidationSchema
};
import { z } from 'zod';

export const gardeningPostsValidationSchema = z.object({
    body: z.object({
        postContent: z.string().min(1, 'Content is required'),
    }),
});
import { Router } from "express";
import validateRequest from "../../Middlewares/validateRequest";
import { CommentsControllers } from "./comments.controller";
import { commentsValidationSchema } from "./comments.validation";

const router = Router();

router.post(
    '/addComment',
    validateRequest(commentsValidationSchema.createCommentsValidationSchema),
    CommentsControllers.createComments,
);

router.get('/commentsByPostId/:postId', CommentsControllers.getCommentsByPostId);

export const commentsRoutes = router;
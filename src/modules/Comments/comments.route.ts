import { Router } from "express";
import validateRequest from "../../Middlewares/validateRequest";
import { CommentsControllers } from "./comments.controller";
import { commentsValidationSchema } from "./comments.validation";
import { auth } from "../../Middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = Router();

router.post(
    '/addComment',
    auth(USER_ROLE.user, USER_ROLE.admin),
    validateRequest(commentsValidationSchema.createCommentsValidationSchema),
    CommentsControllers.createComments,
);

router.get('/commentsByPostId/:postId', CommentsControllers.getCommentsByPostId);

export const commentsRoutes = router;
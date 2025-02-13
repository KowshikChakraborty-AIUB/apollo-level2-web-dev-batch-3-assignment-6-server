"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../Middlewares/validateRequest"));
const comments_controller_1 = require("./comments.controller");
const comments_validation_1 = require("./comments.validation");
const auth_1 = require("../../Middlewares/auth");
const user_constant_1 = require("../User/user.constant");
const router = (0, express_1.Router)();
router.post('/addComment', (0, auth_1.auth)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(comments_validation_1.commentsValidationSchema.createCommentsValidationSchema), comments_controller_1.CommentsControllers.createComments);
router.get('/commentsByPostId/:postId', comments_controller_1.CommentsControllers.getCommentsByPostId);
exports.commentsRoutes = router;

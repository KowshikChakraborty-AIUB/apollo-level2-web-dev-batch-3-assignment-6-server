"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gardeningPostsRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../Middlewares/validateRequest"));
const gardeningPosts_validation_1 = require("./gardeningPosts.validation");
const gardeningPosts_controller_1 = require("./gardeningPosts.controller");
const auth_1 = require("../../Middlewares/auth");
const user_constant_1 = require("../User/user.constant");
const router = (0, express_1.Router)();
router.post('/createGardeningPosts', (0, auth_1.auth)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(gardeningPosts_validation_1.gardeningPostsValidationSchema), gardeningPosts_controller_1.GardeningPostsControllers.createGardeningPosts);
router.get('/', gardeningPosts_controller_1.GardeningPostsControllers.getAllGardeningPosts);
router.get("/userSpecificPost/:id", gardeningPosts_controller_1.GardeningPostsControllers.getGardeningPostsByUserId);
router.post('/upvote/:postId/:userId', (0, auth_1.auth)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), gardeningPosts_controller_1.GardeningPostsControllers.gardeningPostsUpvoteControllers);
router.post('/downvote/:postId/:userId', (0, auth_1.auth)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), gardeningPosts_controller_1.GardeningPostsControllers.gardeningPostsDownvoteControllers);
exports.gardeningPostsRoutes = router;

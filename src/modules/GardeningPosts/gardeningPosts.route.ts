import { Router } from "express";
import validateRequest from "../../Middlewares/validateRequest";
import { gardeningPostsValidationSchema } from "./gardeningPosts.validation";
import { GardeningPostsControllers } from "./gardeningPosts.controller";
import { auth } from "../../Middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = Router();

router.post(
    '/createGardeningPosts',
    auth(USER_ROLE.user, USER_ROLE.admin),
    validateRequest(gardeningPostsValidationSchema),
    GardeningPostsControllers.createGardeningPosts,
);

router.get('/', GardeningPostsControllers.getAllGardeningPosts);

router.get("/userSpecificPost/:id", GardeningPostsControllers.getGardeningPostsByUserId);

router.post('/upvote/:postId/:userId', 
    auth(USER_ROLE.user, USER_ROLE.admin),
    GardeningPostsControllers.gardeningPostsUpvoteControllers
);

router.post('/downvote/:postId/:userId', 
    auth(USER_ROLE.user, USER_ROLE.admin),
    GardeningPostsControllers.gardeningPostsDownvoteControllers,
);

router.get('/totalPostsCount', GardeningPostsControllers.getTotalPostsCount);

export const gardeningPostsRoutes = router;
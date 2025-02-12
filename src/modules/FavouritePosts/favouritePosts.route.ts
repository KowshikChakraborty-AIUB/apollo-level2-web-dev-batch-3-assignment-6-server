import { Router } from "express";
import validateRequest from "../../Middlewares/validateRequest";
import { FavouritePostsControllers } from "./favouritePosts.controller";
import createFavouritePostsValidationSchema from "./favouritePosts.validation";
import { USER_ROLE } from "../User/user.constant";
import { auth } from "../../Middlewares/auth";

const router = Router();

router.post(
    '/createFavouritePosts',
    auth(USER_ROLE.user, USER_ROLE.admin),
    validateRequest(createFavouritePostsValidationSchema),
    FavouritePostsControllers.createFavouritePosts,
);

router.get(
    '/favouritePosts/:userId',
    FavouritePostsControllers.getFavouritePosts,
);

export const favouriteRoutes = router;
import { Router } from "express";
import validateRequest from "../../Middlewares/validateRequest";
import { FavouritePostsControllers } from "./favouritePosts.controller";
import createFavouritePostsValidationSchema from "./favouritePosts.validation";

const router = Router();

router.post(
    '/createFavouritePosts',
    validateRequest(createFavouritePostsValidationSchema),
    FavouritePostsControllers.createFavouritePosts,
);

router.get(
    '/favouritePosts/:userId',
    FavouritePostsControllers.getFavouritePosts,
);

export const favouriteRoutes = router;
import { Router } from "express";
import validateRequest from "../../Middlewares/validateRequest";
import { gardeningPostsValidationSchema } from "./gardeningPosts.validation";
import { GardeningPostsControllers } from "./gardeningPosts.controller";

const router = Router();

router.post(
    '/createGardeningPosts',
    validateRequest(gardeningPostsValidationSchema),
    GardeningPostsControllers.createGardeningPosts,
);

router.get('/', GardeningPostsControllers.getAllGardeningPosts);

router.get("/userSpecificPost/:id", GardeningPostsControllers.getGardeningPostsByUserId);

export const gardeningPostsRoutes = router;
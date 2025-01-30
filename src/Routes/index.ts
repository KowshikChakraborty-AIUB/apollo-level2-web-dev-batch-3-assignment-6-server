import { Router } from 'express';
import { userRoute } from '../modules/User/user.route';
import { gardeningPostsRoutes } from '../modules/GardeningPosts/gardeningPosts.route';

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: userRoute,
    },
    {
        path: '/posts',
        route: gardeningPostsRoutes
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
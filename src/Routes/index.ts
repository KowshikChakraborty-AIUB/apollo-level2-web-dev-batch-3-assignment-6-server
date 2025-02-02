import { Router } from 'express';
import { userRoute } from '../modules/User/user.route';
import { gardeningPostsRoutes } from '../modules/GardeningPosts/gardeningPosts.route';
import { commentsRoutes } from '../modules/Comments/comments.route';
import { authRoute } from '../modules/Auth/auth.route';

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/posts',
        route: gardeningPostsRoutes
    },
    {
        path: '/comments',
        route: commentsRoutes
    },
    {
        path: '/users',
        route: userRoute
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
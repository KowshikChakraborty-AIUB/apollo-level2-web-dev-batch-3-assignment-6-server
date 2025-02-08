"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/User/user.route");
const gardeningPosts_route_1 = require("../modules/GardeningPosts/gardeningPosts.route");
const comments_route_1 = require("../modules/Comments/comments.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const favouritePosts_route_1 = require("../modules/FavouritePosts/favouritePosts.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.authRoute,
    },
    {
        path: '/posts',
        route: gardeningPosts_route_1.gardeningPostsRoutes
    },
    {
        path: '/comments',
        route: comments_route_1.commentsRoutes
    },
    {
        path: '/users',
        route: user_route_1.userRoute
    },
    {
        path: '/favourites',
        route: favouritePosts_route_1.favouriteRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

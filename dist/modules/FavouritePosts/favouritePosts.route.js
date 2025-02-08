"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.favouriteRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../Middlewares/validateRequest"));
const favouritePosts_controller_1 = require("./favouritePosts.controller");
const favouritePosts_validation_1 = __importDefault(require("./favouritePosts.validation"));
const router = (0, express_1.Router)();
router.post('/createFavouritePosts', (0, validateRequest_1.default)(favouritePosts_validation_1.default), favouritePosts_controller_1.FavouritePostsControllers.createFavouritePosts);
router.get('/favouritePosts/:userId', favouritePosts_controller_1.FavouritePostsControllers.getFavouritePosts);
exports.favouriteRoutes = router;

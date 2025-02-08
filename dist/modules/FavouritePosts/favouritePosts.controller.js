"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavouritePostsControllers = void 0;
const catchAsync_1 = __importDefault(require("../../Utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../Utils/sendResponse"));
const favouritePosts_service_1 = require("./favouritePosts.service");
const createFavouritePosts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, postId } = req.body;
    const result = yield favouritePosts_service_1.FavouritePostsServices.createFavouritePostsIntoDB(userId, postId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: result.isFavourite ? 'Post added to favourites' : 'Post removed from favourites',
        data: result,
    });
}));
const getFavouritePosts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield favouritePosts_service_1.FavouritePostsServices.getFavouritePostsFromDB(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User favourite posts retrieved successfully',
        data: result,
    });
}));
exports.FavouritePostsControllers = {
    createFavouritePosts,
    getFavouritePosts
};

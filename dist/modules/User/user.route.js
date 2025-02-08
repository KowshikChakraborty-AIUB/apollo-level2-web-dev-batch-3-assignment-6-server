"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../Middlewares/validateRequest"));
const user_validaton_1 = require("./user.validaton");
// import validateRequest from '../../Middlewares/validateRequest';
// import userValidationSchema from './user.validaton';
// import loginValidationSchema from '../Auth/auth.validation';
// import { AuthControllers } from '../Auth/auth.controller';
const router = (0, express_1.Router)();
// router.post(
//     '/signup',
//     validateRequest(userValidationSchema),
//     UserControllers.registerUser,
// );
// router.post(
//     '/login',
//     validateRequest(loginValidationSchema),
//     AuthControllers.loginUser,
// );
router.get('/', user_controller_1.UserControllers.getAllUsers);
router.get('/usersByUserId/:userId', user_controller_1.UserControllers.getUsersByUserId);
router.get('/manageUserProfile/:email', user_controller_1.UserControllers.getUserByEmailId);
router.post('/followUnfollow/:action/:userId/:userIWantToFolllowId', user_controller_1.UserControllers.followUnfollowUsers);
router.put('/updateUserProfile/:email', (0, validateRequest_1.default)(user_validaton_1.updateUserValidationSchema), user_controller_1.UserControllers.updateUserByEmailId);
router.patch("/updateUserRole/:userId", user_controller_1.UserControllers.updateUserRole);
router.put("/deleteUser/:userId", user_controller_1.UserControllers.deleteUser);
exports.userRoute = router;

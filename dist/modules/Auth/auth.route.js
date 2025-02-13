"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../Middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const user_controller_1 = require("../User/user.controller");
const user_validaton_1 = require("../User/user.validaton");
const auth_1 = require("../../Middlewares/auth");
const user_constant_1 = require("../User/user.constant");
const router = (0, express_1.Router)();
router.post('/signup', (0, validateRequest_1.default)(user_validaton_1.userValidationSchema), user_controller_1.UserControllers.registerUser);
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.loginValidationSchema), auth_controller_1.AuthControllers.loginUser);
router.post('/changeUserPassword', (0, auth_1.auth)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(auth_validation_1.changeUserPasswordValidationSchema), auth_controller_1.AuthControllers.changeUserPassword);
exports.authRoute = router;

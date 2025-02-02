import { Router } from "express";
import validateRequest from "../../Middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import loginValidationSchema from "./auth.validation";
import { UserControllers } from "../User/user.controller";
import userValidationSchema from "../User/user.validaton";

const router = Router();

router.post(
    '/signup',
    validateRequest(userValidationSchema),
    UserControllers.registerUser,
);
router.post(
    '/login',
    validateRequest(loginValidationSchema),
    AuthControllers.loginUser,
);

export const authRoute = router
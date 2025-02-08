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
exports.auth = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const catchAsync_1 = __importDefault(require("../Utils/catchAsync"));
const user_model_1 = require("../modules/User/user.model");
const auth = (...requiredRole) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // const token = req.headers.authorization;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(http_status_1.default.UNAUTHORIZED).json({
                success: false,
                statusCode: 401,
                message: 'You have no access to this route',
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        const { role, email } = decoded;
        // console.log(decoded, 'decoded');
        const userData = yield user_model_1.User.findOne({ email });
        // console.log(userData, 'userData');
        if (!userData) {
            return res.status(http_status_1.default.UNAUTHORIZED).json({
                success: false,
                statusCode: 401,
                message: 'You have no access to this route',
            });
        }
        if (requiredRole && !requiredRole.includes(role)) {
            return res.status(http_status_1.default.UNAUTHORIZED).json({
                success: false,
                statusCode: 401,
                message: 'You have no access to this route',
            });
        }
        req.user = decoded;
        next();
    }));
};
exports.auth = auth;

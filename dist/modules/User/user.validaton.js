"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidationSchema = exports.userValidationSchema = void 0;
const zod_1 = require("zod");
exports.userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        email: zod_1.z.string().email('Invalid email address'),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
        phone: zod_1.z.string().min(1, 'Phone number is required'),
        role: zod_1.z.enum(['user', 'admin']).default('user'),
        address: zod_1.z.string().min(1, 'Address is required'),
        profileImg: zod_1.z.string().url('Invalid URL').optional(),
        verified: zod_1.z.boolean().default(false),
    }),
});
exports.updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required').nullish(),
        phone: zod_1.z.string().min(1, 'Phone number is required').nullish(),
        address: zod_1.z.string().min(1, 'Address is required').nullish(),
        profileImg: zod_1.z.string().url('Invalid URL').optional(),
    }),
});

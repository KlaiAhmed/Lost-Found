import express from "express";
const userRouter= express.Router();

import validate from "../middlewares/validateData";
import rateLimit from "../middlewares/rateLimiter";
import { loginSchema, registerSchema } from "../schemas/userSchema";
import { registerUser, loginUser, logoutUser, refreshTokenController } from "../controllers/userAuth";
import { Me } from "../controllers/userController";
import {requireAuth, requireAccess} from "../middlewares/requireAuth";

const TenMin= 10 * 60 * 1000;

userRouter.post('/auth/signin', rateLimit(5, TenMin) , validate(loginSchema) ,loginUser);

userRouter.post('/auth/signup', rateLimit(5, TenMin), validate(registerSchema), registerUser);

userRouter.post('/auth/logout', rateLimit(5, TenMin), logoutUser);

userRouter.post('/auth/refresh-token', requireAuth, rateLimit(10, TenMin), refreshTokenController);

userRouter.get('/auth/me', requireAccess, Me)

export default userRouter;
import express from "express";
const userRouter= express.Router();

import validate from "../middlewares/validateData";
import { loginSchema, userSchema } from "../schemas/userSchema";

import { registerUser } from "../services/user";


userRouter.post('/auth/signin',validate(loginSchema) ,async (req, res) => {
  try {

    return res.status(200).json({ success: true, message: 'Login successful' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

userRouter.post('/auth/signup', validate(userSchema), registerUser);

userRouter.post('/auth/logout', async (req, res) => {
  try {
    // Logout logic would go here
    return res.status(200).json({ success: true, message: 'Logout successful' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default userRouter;
import { Request, Response } from "express";
import { getUserData } from "../services/userService";

const Me = async (req: Request, res: Response) => {
  const userData = await getUserData(req.user.id);
  return res.status(200).json({ user: userData });
};


export { Me };
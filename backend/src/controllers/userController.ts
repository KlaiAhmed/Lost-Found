import { Request, Response } from "express";
import { getUserData, updateUserData } from "../services/userService";

const Me = async (req: Request, res: Response) => {
  const userData = await getUserData(req.user.id);
  if (!userData || (userData as any).success === false) {
    return res.status(400).json({ message: (userData as any).message || 'Failed to retrieve user data' });
  }
  return res.status(200).json({ user: userData });
};

const UpdateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { currentPassword, ...rest } = req.body;

  const result = await updateUserData(userId, currentPassword, rest);

  if ((result as any).success === false) {
    return res.status(400).json({ message: (result as any).message });
  }

  return res.status(200).json({ user: result });
};



export { Me, UpdateUser };
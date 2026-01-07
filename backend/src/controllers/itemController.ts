import createItem from "../services/itemService";
import { Request, Response } from "express";

const lookForItemController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({success: false,message: "Image is required"});
    }

    const imageUrl = req.file.path;

    const savedItem = await createItem(req.body, "lost", req.file, imageUrl);

    return res.status(201).json({success: true,message: "Item posted successfully",data: savedItem});

  } catch (err) {
    console.error(err);

    return res.status(500).json({success: false,message: "Internal server error"});
  }
};


export { lookForItemController };

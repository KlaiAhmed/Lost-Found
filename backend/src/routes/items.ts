import express, { Request, Response } from 'express';
const itemRouter = express.Router();

import Item from '../models/item';
import rateLimiter from '../middlewares/rateLimiter';
import validate  from '../middlewares/validateData';
import { postItemController } from '../controllers/itemController';
import { lookForItemSchema, foundItemSchema } from '../schemas/itemSchema';
import { uploadSingleToMem } from '../middlewares/uploadImgToMem';
import saveImgToDisk from '../middlewares/uploadImg';

const tenMin = 10 * 60 * 1000;
itemRouter.post('/lookforitem', rateLimiter(10,tenMin), uploadSingleToMem, validate(lookForItemSchema), saveImgToDisk, postItemController ("lost") );

itemRouter.post('/postitem', rateLimiter(10,tenMin), uploadSingleToMem, validate(foundItemSchema), saveImgToDisk, postItemController ("found") );

itemRouter.get('/items', async (req: Request, res: Response) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 }).exec();
    return res.status(200).json({ items });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default itemRouter;

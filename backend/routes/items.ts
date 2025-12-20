import express, { Request, Response, NextFunction } from 'express';
import { uploadSingle } from '../middlewares/upload';
import FoundItem from '../models/foundItem';
import LostItem from '../models/lostItem'

const router = express.Router();

function parseIfJson(value: any) {
  if (!value) return undefined;
  if (typeof value !== 'string') return value;
  try { 
    return JSON.parse(value); 
  } catch { 
    return value; 
  }
}

router.post('/postitem', uploadSingle, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;

    if (!body.title) return res.status(400).json({ error: 'title required' });

    const contact = parseIfJson(body.contact);
    const contactName = (contact && contact.name) || body.contactName || body.contact_name;
    if (!contactName) return res.status(400).json({ error: 'contact.name required' });

    const doc: any = {
      title: body.title,
      description: body.description,
      category: body.category,
      dateFound: body.dateFound ? new Date(body.dateFound) : undefined,
      timeFound: body.timeFound,
      holder: parseIfJson(body.holder),
      contact: typeof contact === 'object' ? contact : { name: contactName, phone: body.phone, email: body.email },
      delivery: parseIfJson(body.delivery),
      meetup: parseIfJson(body.meetup),
      additionalNotes: body.additionalNotes,
      status: 'found'
    };

    if (req.file) {
      doc.image = {
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path
      };
    }

    const saved = await FoundItem.create(doc);
    return res.status(201).json({ success: true, item: saved });
  } catch (err) {
    next(err);
  }
});


router.post('/lookitem', uploadSingle, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;

    if (!body.title) return res.status(400).json({ error: 'title required' });

    const contact = parseIfJson(body.contact);
    const contactName = (contact && contact.name) || body.contactName || body.contact_name;
    if (!contactName) return res.status(400).json({ error: 'contact.name required' });

    const doc: any = {
      title: body.title,
      description: body.description,
      category: body.category,
      dateFound: body.dateFound ? new Date(body.dateFound) : undefined,
      timeFound: body.timeFound,
      holder: parseIfJson(body.holder),
      contact: typeof contact === 'object' ? contact : { name: contactName, phone: body.phone, email: body.email },
      reward: body.reward,
      additionalNotes: body.additionalNotes,
      status: 'lost'
    };

    if (req.file) {
      doc.image = {
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path
      };
    }

    const saved = await LostItem.create(doc);
    return res.status(201).json({ success: true, item: saved });
  } catch (err) {
    next(err);
  }
});

export default router;

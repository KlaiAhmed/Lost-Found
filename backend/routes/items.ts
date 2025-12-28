import express, { Request, Response, NextFunction } from 'express';
import { uploadSingle } from '../middlewares/upload';
import Item from '../models/item';

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

router.post('/postitem', uploadSingle, async (req: Request, res: Response) => {
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
      dateOccurred: body.dateOccurred ? new Date(body.dateOccurred) : undefined,
      timeOccurred: body.timeOccurred,
      holder: parseIfJson(body.holder),
      contact: typeof contact === 'object' ? contact : { name: contactName, phone: body.phone, email: body.email },
      delivery: parseIfJson(body.delivery),
      meetup: parseIfJson(body.meetup),
      additionalNotes: body.additionalNotes,
      status: 'found'
    };

    if (req.file) {
      const path = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      doc.image = {
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: path
      };
    }

    const saved = await Item.create(doc);
    return res.status(201).json({ success: true, item: saved });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/lookitem', uploadSingle, async (req: Request, res: Response) => {
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
      dateOccurred: body.dateOccurred ? new Date(body.dateOccurred) : undefined,
      timeOccurred: body.timeOccurred,
      holder: parseIfJson(body.holder),
      contact: typeof contact === 'object' ? contact : { name: contactName, phone: body.phone, email: body.email },
      reward: body.reward,
      additionalNotes: body.additionalNotes,
      status: 'lost'
    };

    if (req.file) {
      const path = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      doc.image = {
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: path
      };
    }

    const saved = await Item.create(doc);
    return res.status(201).json({ success: true, item: saved });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/items', async (req: Request, res: Response) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 }).exec();
    return res.status(200).json({ items });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

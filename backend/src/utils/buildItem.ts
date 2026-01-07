import type { ItemDocument } from "../models/item";
import { LookForItemInput, FoundItemInput } from "../schemas/itemSchema";

const buildLostItem = (data: LookForItemInput): Partial<ItemDocument> => ({
  itemName: data.itemName,
  description: data.description,
  category: data.category,
  dateOccurred: new Date(data.date),
  timeOccurred: data.time,
  location: data.locationLost,
  holder: {
    state: data.state,
    address: data.address,
    postal: data.postalCode,
  },
  contact: {
    name: data.contactName,
    phone: data.phone,
    email: data.email,
    preferContact: data.contactMethod,
  },
  reward: data.reward ?? 0,
  additionalNotes: data.additionalNotes,
  status: "lost",
});


const buildFoundItem = (data: FoundItemInput): Partial<ItemDocument> => ({
  itemName: data.itemName,
  description: data.description,
  category: data.category,
  dateOccurred: data.dateOccurred
    ? new Date(data.dateOccurred)
    : undefined,
  timeOccurred: data.timeOccurred,
  holder: data.holder,
  contact: data.contact,
  delivery: data.delivery,
  meetup: data.meetup,
  additionalNotes: data.additionalNotes,
  status: "found",
});

const buildItemImage = (file: Express.Multer.File, path: string) => ({
  filename: file.filename,
  originalname: file.originalname,
  mimetype: file.mimetype,
  size: file.size,
  path,
});


export { buildLostItem, buildFoundItem, buildItemImage };

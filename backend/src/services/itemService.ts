import Item from "../models/item";
import type { ItemDocument } from "../models/item";
import { FoundItemInput, LookForItemInput } from "../schemas/itemSchema";
import { buildLostItem, buildFoundItem, buildItemImage } from "../utils/buildItem";

type ItemStatus = "lost" | "found";
type CreateItemData = LookForItemInput | FoundItemInput;

type CreateItemFunction = (
  data: CreateItemData,
  status: ItemStatus,
  file?: Express.Multer.File,
  imageUrl?: string
) => Promise<ItemDocument>;

const createItem: CreateItemFunction = async (data, status, file, imageUrl) => {
  let doc: Partial<ItemDocument>;

  if (status !== "lost" && status !== "found") {
    throw new Error("Invalid item status");
  }

  if (status === "lost") {
    doc = buildLostItem(data as LookForItemInput);
  } else {
    doc = buildFoundItem(data as FoundItemInput);
  }

  if (file && imageUrl) {
    doc.image = buildItemImage(file, imageUrl);
  }

  return Item.create(doc);
};

export default createItem;

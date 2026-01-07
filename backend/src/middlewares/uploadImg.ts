import { RequestHandler } from "express";
import path from "path";
import fs from "fs/promises";
import { v4 as uuid } from "uuid";
import sharp from "sharp";

export const UPLOAD_ROOT = path.resolve(process.cwd(), "uploads");

const saveToDisk: RequestHandler = async (req, _res, next) => {

  const files = req.file ? [req.file] : (req.files as Express.Multer.File[] | undefined);

  if (!files || files.length === 0) return next();

  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const subfolder = path.join(String(year), month, day); 
    const targetDir = path.join(UPLOAD_ROOT, subfolder);

    await fs.mkdir(targetDir, { recursive: true });

    const writePromises = files.map(async (file) => {
      const filename = `${uuid()}.webp`;
      const filepath = path.join(targetDir, filename);

      await sharp(file.buffer)
      .resize(800)
      .webp({ quality: 80 })
      .toFile(filepath);

      const relativeUrlPath = `uploads/${year}/${month}/${day}/${filename}`;

      file.filename = filename;
      file.path = relativeUrlPath;
      file.mimetype = "image/webp";
    });

    await Promise.all(writePromises);

    next();
  } catch (error) {
    next(error);
  }
};

export default saveToDisk;
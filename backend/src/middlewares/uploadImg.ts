import { RequestHandler } from "express";
import path from "path";
import fs from "fs";

export const UPLOAD_DIR = path.resolve(process.cwd(),"src/uploads");

const UploadImg: RequestHandler = (req, _res, next) => {
  if (!req.file) return next();

  fs.mkdirSync(UPLOAD_DIR, { recursive: true });

  const filename = `${Date.now()}-${req.file.originalname}`;
  const filepath = path.join(UPLOAD_DIR, filename);

  fs.writeFileSync(filepath, req.file.buffer);

  req.file.filename = filename;
  req.file.path = filepath;

  next();
};

export default UploadImg;



import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const UPLOAD_DIR = path.resolve(process.cwd(), 'C:\\WorkSpace\\Fullstack\\projet\\backend\\src\\uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const upload = multer({
  dest: UPLOAD_DIR,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only image files are allowed'));
    } else {
      cb(null, true);
    }
  }
});

export default upload;
export const uploadSingle = upload.single('image');

import multer from "multer";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

// ✅ Use /tmp for Vercel (production)
const isProd = process.env.NODE_ENV === 'production';
const uploadFolder = isProd
  ? '/tmp/upload' // Vercel allows writing here
  : path.join(__dirname, 'upload'); // Local development

// ✅ Make sure the upload folder exists
fs.mkdirSync(uploadFolder, { recursive: true });

const storage = multer.diskStorage({
  destination: function (_req, file, cb) {
    console.log("file: ", file);
    return cb(null, uploadFolder);
  },
  filename: function (_req, file, cb) {
    let originFilename = path.parse(file.originalname).name;
    let filename = originFilename + "-" + Date.now() + path.extname(file.originalname);
    console.log("filename: ", filename);
    return cb(null, filename);
  }
});

export const upload = multer({ storage });

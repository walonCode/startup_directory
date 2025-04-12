import multer from "multer";
import fs from "fs"
import { fileURLToPath } from "url"
import path from "path"

const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename)


const uploadFolder = path.join(__dirname, 'upload')
fs.mkdirSync(uploadFolder, {recursive: true})

const storage = multer.diskStorage({
  destination: function(_req, file, cb){
      console.log("file: ",file)
      return cb(null,uploadFolder )
  },
  filename: function(_req,file,cb){
      console.log("file from file function:, ", file)
      let originFilename = path.parse(file.originalname).name
      let filename = originFilename + "-" +  Date.now() + path.extname(file.originalname)
      console.log("filename: ", filename)
      return cb(null, filename)
  }
})

export const upload = multer({storage})
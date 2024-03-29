import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import mime from 'mime';

import StorageConfig from '@config/StorageConfig';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, StorageConfig.local.tempFolder);
  },
  filename(req, file, cb) {
    const ext = mime.getExtension(file.mimetype);
    cb(null, `${uuidv4()}.${ext}`);
  },
});

const uploader = multer({
  storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});

export default uploader;

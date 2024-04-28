import Multer from "multer";

const storage = Multer.memoryStorage();

export const multer = Multer({ storage });

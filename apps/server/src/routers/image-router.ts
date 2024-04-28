import { Router, Request, Response, NextFunction } from "express";
import { v4 } from "uuid";
import { multer } from "../helpers/multer";
import { ImageService } from "../modules/image/image-service";

const imageService = new ImageService();

const upload = multer.single("file");

function authenticate(req: Request, res: Response, next: NextFunction) {
  if (!req.auth?.userId) {
    return res.status(401).send("Unauthorized");
  }
  next();
}

function checkFile(req: Request, res: Response, next: NextFunction) {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  next({ req, res });
}

const router = Router();

router.post("/upload", [upload, authenticate, checkFile], async (req: Request, res: Response) => {
  console.log("req.file", req.file);
  // get auth header
  console.log("in image upload");

  const { url } = await imageService.uploadImageToMediaLibrary(
    req.file!.buffer.toString("base64"),
    `${v4()}.jpg`,
  );

  return res.status(200).json({
    url,
  });
});

export { router as imageRouter };

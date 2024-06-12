import { Router, Request, Response, NextFunction } from "express";
import { v4 } from "uuid";
import { multer } from "../helpers/multer";
import { ImageService } from "../modules/image/image.service";
import { withWorkOsAuth, withWorkOsOrgAuth } from "../middleware/auth";

const imageService = new ImageService();

const upload = multer.single("file");

function authenticate(req: Request, res: Response, next: NextFunction) {
  if (!req.session) {
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

const imageController = Router();

imageController.post("/upload", [upload, withWorkOsOrgAuth], async (req: Request, res: Response) => {
  console.log("uploading image", req.orgSession);
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    // get auth header
    const { url } = await imageService.addMediaToTeamMediaLibrary(req.orgSession, {
      base64Data: req.file.buffer.toString("base64"),
      fileName: `${v4()}.jpg`,
    });

    return res.status(200).json({
      url,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Failed to upload image");
  }
});

export { imageController };

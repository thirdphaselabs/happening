import ImageKit from "imagekit";
import { PlaventiSession } from "../auth/auth.controller";
import { ImagePersistence } from "./image.persistence";
import { SessionWithOrg } from "../../types/types";
import { Media } from "@prisma/client";

interface ImageKitUploadResponse {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
}

export class ImageService {
  private readonly imagekit: ImageKit;
  private readonly imagePersistence: ImagePersistence;

  constructor() {
    this.imagekit = new ImageKit({
      publicKey: "public_uGnz7LxdDaH0tjH0l5BmoUjog5w=",
      privateKey: "private_06wuejJpmGNYFZJycjKOd++S2Sk=",
      urlEndpoint: "https://ik.imagekit.io/tplabs",
    });
    this.imagePersistence = new ImagePersistence();
  }

  async addMediaToTeamMediaLibrary(
    session: SessionWithOrg,
    args: { base64Data: string; fileName: string },
  ): Promise<Media> {
    const response = await this.uploadImageToMediaLibrary(args.base64Data, args.fileName);

    const media = await this.imagePersistence.addMediaToTeamMediaLibrary(session, response.url);

    return media;
  }

  async uploadImageToMediaLibrary(base64Data: string, fileName: string): Promise<ImageKitUploadResponse> {
    const response = await this.imagekit.upload({
      file: base64Data,
      fileName: fileName,
      overwriteFile: true,
      useUniqueFileName: true,
    });

    return {
      fileId: response.fileId!,
      name: response.name!,
      url: response.url!,
      thumbnailUrl: response.thumbnailUrl,
    };
  }
}

import ImageKit from "imagekit";

interface ImageKitUploadResponse {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
}

export class ImageService {
  private readonly imagekit: ImageKit;

  constructor() {
    this.imagekit = new ImageKit({
      publicKey: "public_EWRX07b+a1dUKd40FwVXuBQsiVY=",
      privateKey: "private_6JmDuRVcOfva8q5OV9hZCKg/k0U=",
      urlEndpoint: "https://ik.imagekit.io/plaventi/",
    });
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

import { environment } from "~/utils/env";

export function useUploadImage() {
  return async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${environment.apiUrl}/api/image/upload`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();

      return data.url as string;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}

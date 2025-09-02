import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_APP_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function extractPublicId(url: string): string {
  const parts = url.split("/");

  const fileWithExt = parts.pop()!; // "mlqkzozbb1tw7cztfbl4.png"

  const afterUpload = parts.slice(parts.indexOf("upload") + 2);

  const fileName =
    fileWithExt.substring(0, fileWithExt.lastIndexOf(".")) || fileWithExt;

  return [...afterUpload, fileName].join("/");
}

export async function deleteFromCloudinary(url: string) {
  try {
    // Extraer el public_id de la URL
    const publicId = extractPublicId(url);

    // Eliminar en Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Cloudinary delete result:", result);
    return result;
  } catch (err) {
    console.error("Error eliminando imagen:", err);
    throw err;
  }
}

// ✅ Helper para subir imagen a Cloudinary
export async function uploadToCloudinary(
  file: File,
  folder: string,
  fileName?: string
) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: folder, filename_override: fileName },
        (err, result) => {
          if (err) return reject(err);
          resolve(result?.secure_url ?? "");
        }
      )
      .end(buffer);
  });
}

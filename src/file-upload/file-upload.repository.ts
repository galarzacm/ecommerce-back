import { Injectable } from "@nestjs/common";
import { UploadApiResponse, v2 as Cloudinary } from "cloudinary";
import * as toStream from "buffer-to-stream";
import type { Express } from "express";

@Injectable()
export class FileUploadRepository {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = Cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            return reject(
              new Error(error.message || "Cloudinary upload failed"),
            );
          }
          if (!result) {
            return reject(new Error("Cloudinary returned no result"));
          }
          resolve(result);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }
}

// @Injectable()
// export class FileUploadRepository {
//   async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
//     return new Promise((resolve, reject) => {
//       const upload = Cloudinary.uploader.upload_stream(
//         { resource_type: "auto" },
//         (error, result) => {
//           if (error) reject(error);
//           else {
//             resolve(result!);
//           }
//         },
//       );
//       toStream(file.buffer).pipe(upload);
//     });
//   }
// }

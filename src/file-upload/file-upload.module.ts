import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileUploadController } from "./file-upload.controller";
import { FileUploadRepository } from "./file-upload.repository";
import { FileUploadService } from "./file-upload.service";
import { Product } from "../product/entities/product.entity";
import { CloudianryConfig } from "../config/cloudinary";

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [FileUploadController],
  providers: [CloudianryConfig, FileUploadRepository, FileUploadService],
})
export class fileuploadModule {}

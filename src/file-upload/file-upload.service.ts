import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../product/entities/product.entity";
import { FileUploadRepository } from "./file-upload.repository";
import { Repository } from "typeorm";

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async uploadProductImage(file: Express.Multer.File, productId: string) {
    const productExist = await this.productRepository.findOneBy({
      id: productId,
    });
    if (!productExist) {
      return new NotFoundException("Product not found");
    }

    const uploadImage = await this.fileUploadRepository.uploadImage(file);

    await this.productRepository.update(productId, {
      imgUrl: uploadImage.secure_url,
    });

    const updateProduct = await this.productRepository.findOneBy({
      id: productId,
    });
    return updateProduct;
  }
}

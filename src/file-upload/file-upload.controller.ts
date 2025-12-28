import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileUploadService } from "./file-upload.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "../guards/authGuard";
import { RolesGuard } from "../guards/roles.guard";
import { RolesDecorator } from "../decorators/roles/roles.decorator";
import { RoleEnum } from "../enum/roles.enum";

@Controller("files")
@ApiTags("File-upload - endpoints / routes")
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post("uploadImage/:productId")
  @ApiBearerAuth()
  @RolesDecorator(RoleEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor("file"))
  async uploadImageProduct(
    @Param("productId") id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200 * 1024, //=204800
            message: "El archivo debe ser menor a 200kb",
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadProductImage(file, id);
  }
}

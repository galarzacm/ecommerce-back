import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { CategorieSeed } from "./seeds/categorie-seed/categorieSeed";
import { ProductSeed } from "./seeds/product-seed/productSeed";
import { ValidationPipe } from "@nestjs/common";
import { GlobalExceptionFilter } from "./middleware/http-exception.filter";
//import { AuthGuard } from "./guards/authGuard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle("eCommerce")
    .setDescription("API eCommerce M4")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup("api", app, document);

  // Aplicar el filtro global para manejar todas las excepciones HTTP
  //app.useGlobalFilters(new GlobalExceptionFilter());

  //valida entradas (ej Body). si falla => BadRequestException
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true, // Elimina propiedades que no están en el DTO
      // forbidNonWhitelisted: true, // Lanza error si llega algo extra
      // transform: true, // Convierte los tipos (string → number, etc.)
    }),
  );
  // Aplicar el Guard globalmente
  // const authGuard = app.get(AuthGuard);
  // app.useGlobalGuards(authGuard);

  if (process.env.NODE_ENV !== "production") {
    const categorieSeed = app.get(CategorieSeed);
    await categorieSeed.seed();

    const productSeed = app.get(ProductSeed);
    await productSeed.seed();
  }

  const port = process.env.PORT || 3000;
  await app.listen(port, "0.0.0.0");
}
bootstrap();

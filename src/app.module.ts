import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { CategoryModule } from "./category/category.module";
import { ProductModule } from "./product/product.module";
import { SeedModule } from "./seeds/seed.module";
import { OrderModule } from "./order/order.module";
import { AuthModule } from "./auth/auth.module";
import { fileuploadModule } from "./file-upload/file-upload.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      autoLoadEntities: true,
      synchronize: false,
    }),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "60m" },
    }),

    UserModule,
    CategoryModule,
    ProductModule,
    SeedModule,
    OrderModule,
    AuthModule,
    fileuploadModule,
  ],
})
export class AppModule {}

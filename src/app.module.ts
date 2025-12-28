import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { postgresDataSourceConfig } from "./config/data-source";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { CategoryModule } from "./category/category.module";
import { ProductModule } from "./product/product.module";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SeedModule } from "./seeds/seed.module";
import { OrderModule } from "./order/order.module";
import { Order } from "./order/entities/order.entity";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "./auth/auth.module";
import { fileuploadModule } from "./file-upload/file-upload.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "./config/data-source.ts",
      load: [postgresDataSourceConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        const config =
          await configService.get<TypeOrmModuleOptions>("postgres");

        if (!config) {
          throw new Error('Missing TypeORM config under key "postgres"');
        }
        return config;
      },
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
    Order,
    AuthModule,
    fileuploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

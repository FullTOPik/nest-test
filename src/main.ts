import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { APP_PORT } from "./constants/environment";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: "*" } });

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder().setTitle("QS-API").build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup("docs", app, document);

  await app.listen(APP_PORT, () =>
    console.log(`app started on ${APP_PORT} port`)
  );
}

bootstrap();

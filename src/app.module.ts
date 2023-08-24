import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ThrottlerModule } from "@nestjs/throttler";
import { throttlerOptions } from "./constants/constants";
import { MongooseModule } from "@nestjs/mongoose";
import { TaskModule } from "./task/task.module";

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: throttlerOptions.time,
      limit: throttlerOptions.maxRequests,
    }),
    AuthModule,
    TaskModule,
    MongooseModule.forRoot("mongodb://localhost:27018"),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

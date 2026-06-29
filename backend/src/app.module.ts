import { Module } from '@nestjs/common';
import { AuthModule } from './infrastructure/modules/auth.modules';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlModule } from './infrastructure/modules/url.modules';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AuthModule,
    UrlModule
  ],
  controllers: [],
  providers:[]  
})
export class AppModule {}
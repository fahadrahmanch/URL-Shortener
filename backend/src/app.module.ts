import { Module } from '@nestjs/common';
import { AuthModule } from './infrastructure/modules/auth.modules';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlModule } from './infrastructure/modules/url.modules';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/url-shortener'),
    AuthModule,
    UrlModule
  ],
  controllers: [],
  providers:[]  
})
export class AppModule {}
 
import { Module } from '@nestjs/common';
import { AuthModule } from './infrastructure/modules/auth.modules';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlModule } from './infrastructure/modules/url.modules';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://fahad:TypeGrid2026@typegrid.plg9xpc.mongodb.net/url-shortener?retryWrites=true&w=majority&appName=TypeGrid'),
    AuthModule,
    UrlModule
  ],
  controllers: [],
  providers:[]  
})
export class AppModule {}
 
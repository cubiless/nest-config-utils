import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { registerAs as AppConfig } from './App.config';
import { AppService } from './App.service';

@Module({
  imports: [
    ConfigModule.forFeature(AppConfig),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
}

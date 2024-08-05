import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { registerAs as AppConfig } from './App.config';
import { registerAs as YAMLConfig } from './YAML.config';
import { AppService } from './App.service';

@Module({
  imports: [
    ConfigModule.forFeature(AppConfig),
    ConfigModule.forFeature(YAMLConfig),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
}

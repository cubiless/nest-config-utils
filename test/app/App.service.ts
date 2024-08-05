import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConfig } from '../../src/decorators/InjectConfig';
import { registerAs as AppConfig, Type as AppConfigType } from '../config/App.config';

@Injectable()
export class AppService implements OnModuleInit {

  constructor(
    @InjectConfig(AppConfig) private readonly config: AppConfigType,
  ) {
  }

  onModuleInit(): any {
    console.log(this.config);
  }
}

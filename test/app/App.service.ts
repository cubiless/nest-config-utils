import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConfig } from '../../src/decorators/InjectConfig';
import { registerAs as AppConfig, Type as AppConfigType } from './App.config';
import { registerAs as YamlConfig, Type as YamlConfigType } from './YAML.config';

@Injectable()
export class AppService implements OnModuleInit {

  constructor(
    @InjectConfig(AppConfig) private readonly config: AppConfigType,
    @InjectConfig(YamlConfig) private readonly yamlConfig: YamlConfigType,
  ) {
  }

  onModuleInit(): any {
    console.log(this.config);
    console.log(this.yamlConfig);
  }
}

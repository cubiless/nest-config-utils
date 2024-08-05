import { ConfigType } from '@nestjs/config';
import { addConfig, FromEnv } from '../../src';

class AppConfig {
  @FromEnv('APP_ADDRESS')
  readonly address: string = 'localhost';

  @FromEnv('APP_PORT')
  readonly port: number = (() => 6666)();
}

export const registerAs = addConfig('app', AppConfig);
export const Key = registerAs.KEY;
export type Type = ConfigType<typeof registerAs>;

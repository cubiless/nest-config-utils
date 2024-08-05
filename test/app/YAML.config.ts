import { ConfigType } from '@nestjs/config';
import { addYamlConfig } from '../../src';
import { IsArray, IsNumber, IsPort, IsString } from 'class-validator';

class YAMLConfig {

  @IsArray()
  @IsString({ each: true })
  readonly address: string[] = [];

  @IsNumber()
  readonly port: number = (() => 6666)();
}

export const registerAs = addYamlConfig('./test/app/example.yml', 'yml', YAMLConfig);
export const Key = registerAs.KEY;
export type Type = ConfigType<typeof registerAs>;

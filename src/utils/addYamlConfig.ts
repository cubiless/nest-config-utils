import { registerAs } from '@nestjs/config';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { readFileSync } from 'fs';
import { join } from 'path';
import { load } from 'js-yaml';
import { validateConfig } from './validateConfig';
import * as process from 'process';

export function addYamlConfig<T extends object>(
  path: string,
  token: string,
  cls: ClassConstructor<T>,
  ignoreWhitelist: boolean = false,
) {
  return registerAs(token, async () => {
    const rootPath = process.cwd();
    const file = readFileSync(join(rootPath, path), 'utf8');
    const object = await load(file) as object;
    return validateConfig(object, cls, {
      strategy: 'exposeAll',
    }, {
      whitelist: !ignoreWhitelist,
    });
  });
}

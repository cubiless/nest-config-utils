import { registerAs } from '@nestjs/config';
import { ClassConstructor, ClassTransformOptions } from 'class-transformer/types/interfaces';
import * as process from 'process';
import { validateConfig } from './validateConfig';

export function addConfig<T extends object>(
  token: string,
  cls: ClassConstructor<T>,
) {
  return registerAs(token, () => {
    return validateConfig(process?.env, cls, {

    });
  });
}

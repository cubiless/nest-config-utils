import { registerAs } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { ClassConstructor, ClassTransformOptions } from 'class-transformer/types/interfaces';
import { validateSync } from 'class-validator';
import * as process from 'process';

export function addConfig<T extends object>(
  token: string,
  cls: ClassConstructor<T>,
  options?: ClassTransformOptions,
) {
  return registerAs(token, () => {
    // Read and mapped config
    const validatedConfig = plainToInstance(cls, process?.env || {}, {
      enableImplicitConversion: true,
      strategy: 'excludeAll',
      exposeDefaultValues: true,
    });

    // Validate config
    const errors = validateSync(
      validatedConfig,
      Object.assign(
        {
          skipMissingProperties: false,
          forbidUnknownValues: false,
        },
        options,
      ),
    );

    // Print error
    if (errors.length > 0) throw new Error(errors.toString());

    // Return validate object
    return validatedConfig;
  });
}

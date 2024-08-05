import { Inject } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

export function InjectConfig(config: ReturnType<typeof registerAs>) {
  return Inject(config.KEY);
}

import { Inject } from '@nestjs/common';
import { addConfig } from '../utils/addConfig';

export function InjectConfig(config: ReturnType<typeof addConfig>) {
  return Inject(config.KEY);
}

import { Expose } from 'class-transformer';

export function FromEnv(name: string) {
  return Expose({name, toClassOnly: true})
}

## Example

1. Define the config from the env
2. Define validation ([class-validator](https://github.com/typestack/class-validator))
3. Create config and put into the _ConfigModule_
4. Read typesafe the configuration at main.ts or another module.

`/App.config.ts`

```ts
import { addConfig, FromEnv } from '@cubiles/nest-config-utils';

class AppConfig {
  @FromEnv('APP_ADDRESS')
  address: string;

  @FromEnv('APP_PORT')
  port: number;
}

export const registerAs = addConfig('app', AppConfig);
export const Key = registerAs.KEY;
export type Type = ConfigType<typeof registerAs>;
```

`/Config.module.ts`

```ts
import { registerAs as AppConfig } from './App.config';

export default ConfigModule.forRoot({
  load: [
    AppConfig,
  ],
  isGlobal: true,
});
```

`/main.ts`

```ts
const appConfig = app.get<AppConfig.Type>(AppConfig.Key);
```

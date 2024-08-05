## Description

This is extended from the official Config-Module of [NestJs](https://github.com/nestjs/nest).
The main function of the packages is a typesafe
validation([class-validator](https://github.com/typestack/class-validator))  of the env.

## Installation

```
$ npm i @cubiles/nest-config-utils @nestjs/config class-validator class-transformer
```

# Features

- Extends NestJs-Config Module
- Native default values of class
- Usage class-validator
- Simple usages

## Example

1. Define the config from the env
2. Define validation ([class-validator](https://github.com/typestack/class-validator))
3. Create config and put into the _ConfigModule_
4. Read typesafe the configuration at main.ts or another module.

`/App.config.ts`

```ts
import { addConfig, FromEnv } from '@cubiles/nest-config-utils';
import { IsIP, IsPort } from 'class-validator';

class AppConfig {
  @FromEnv('APP_ADDRESS')
  @IsIP()
  readonly address: string = 'localhost';

  @FromEnv('APP_PORT')
  @IsPort()
  readonly port: number = 1234;
}

export const registerAs = addConfig('app', AppConfig);
export const Key = registerAs.KEY;
export type Type = ConfigType<typeof registerAs>;
```

`/Config.module.ts`

```ts
import { registerAs as AppConfig } from './App.config';
import { ConfigType } from '@nestjs/config';

export default ConfigModule.forRoot({
  load: [
    AppConfig,
  ],
  isGlobal: true,
});

// OR 

ConfigModule.forFeature(AppConfig);
```

`/main.ts`

```ts
const appConfig = app.get<AppConfig.Type>(AppConfig.Key);
```

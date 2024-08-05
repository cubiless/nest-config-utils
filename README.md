## Description

This is extended from the official Config-Module of [NestJs](https://github.com/nestjs/nest).
The main function of the packages is a typesafe
validation([class-validator](https://github.com/typestack/class-validator))  of the env.

## Installation

```
$ npm i @cubiles/nest-config-utils @nestjs/config class-validator class-transformer
```

> If you use yaml then must be installing the `js-yaml` library.
>  ```
> $ npm i js-yaml path
> $ npm i -D @types/js-yaml
> ```

# Features

- Extends NestJs-Config Module
- Native default values of class
- Usage class-validator
- Support of YAML
- Simple usages

## Example

1. Define the config from the env
2. Define validation ([class-validator](https://github.com/typestack/class-validator))
3. Create config and put into the _ConfigModule_
4. Read typesafe the configuration at main.ts or another module.

`/App.config.ts`

```ts
import { addConfig, FromEnv } from '@cubiles/nest-config-utils';
import { IsString, IsNumber } from 'class-validator';

class AppConfig {
  @FromEnv('APP_ADDRESS')
  @IsString()
  readonly address: string = 'localhost';

  @FromEnv('APP_PORT')
  @IsNumber()
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

`/App.service.ts`

```ts
import { registerAs as AppConfig, Type as AppConfigType } from './App.config';

@Injectable()
export class AppService {

  constructor(
    @InjectConfig(AppConfig) private readonly config: AppConfigType,
  ) {
  }
}
```

`/main.ts`

```ts
import AppConfig from './App.config';

const appConfig = app.get<AppConfig.Type>(AppConfig.Key);
```

## YAML Config

```ts
import { addYamlConfig } from '@cubiles/nest-config-utils';
import { IsString, IsNumber } from 'class-validator';

class YAMLConfig {

  @IsString()
  readonly addresses: string = 'localhost';

  @IsNumber()
  readonly port: number = 1234;
}

export const registerAs = addYamlConfig('./example.yml', 'YAMLConfig', YAMLConfig);
export const Key = registerAs.KEY;
export type Type = ConfigType<typeof registerAs>;
```

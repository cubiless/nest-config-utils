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
import { FromEnv } from '@cubiles/nest-config-utils';
import { IsString, IsNumber } from 'class-validator';

export class AppConfig {
  @FromEnv('APP_ADDRESS')
  @IsString()
  readonly address: string = 'localhost';

  @FromEnv('APP_PORT')
  @IsNumber()
  readonly port: number = 1234;
}
```
`/Yaml.config.ts`

```ts
import { IsArray, IsNumber, IsString } from 'class-validator';

export class YamlConfig {

  @IsArray()
  @IsString({each: true})
  readonly address: string[] = [];

  @IsNumber()
  readonly port: number = (() => 6666)();
}

```

`/Config.module.ts`

```ts
import { Module } from '@nestjs/common';
import { AppConfig } from './App.config';
import { YamlConfig } from './YAML.config';
import { AppService } from './App.service';
import { TypedConfig, TypedYamlConfig } from '@cubiles/nest-config-utils';

@Module({
  imports: [
    TypedConfig.forFeature(AppConfig),
    TypedYamlConfig.forFeature(YamlConfig, './test/app/example.yml'),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
}
```

`/App.service.ts`

```ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConfig } from '@cubiles/nest-config-utils';
import { AppConfig } from './App.config';
import { YamlConfig } from './YAML.config';

@Injectable()
export class AppService implements OnModuleInit {

  constructor(
    @InjectConfig(AppConfig) private readonly config: AppConfig,
    @InjectConfig(YamlConfig) private readonly yamlConfig: YamlConfig,
  ) {
  }

  onModuleInit(): any {
    console.log(this.config);
    console.log(this.yamlConfig);
  }
}
```

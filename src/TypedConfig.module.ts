import { ConfigModule, registerAs } from "@nestjs/config";
import { ClassConstructor } from "class-transformer/types/interfaces";
import { validateConfigUtils } from "./utils/validateConfig.utils";
import * as process from "process";
import { readFileSync } from "fs";
import { join } from "path";
import { load } from "js-yaml";

export class TypedConfig {
  static forFeature<T extends object>(cls: ClassConstructor<T>) {
    return ConfigModule.forFeature(registerAs(cls.name, () => {
      return validateConfigUtils(process?.env, cls);
    }));
  }
}

export class TypedYamlConfig {
  static forFeature<T extends object>(cls: ClassConstructor<T>, path: string, ignoreWhitelist: boolean = false) {
    return ConfigModule.forFeature(registerAs(cls.name, async () => {
        const rootPath: string = process.cwd();
        const file: string = readFileSync(join(rootPath, path), 'utf8');
        const object: object = await load(file) as object;
        return validateConfigUtils(object, cls, {
          strategy: 'exposeAll',
        }, {
          whitelist: !ignoreWhitelist,
        });
      })
    )
  }
}

import { pathsToModuleNameMapper, createJsWithTsPreset } from "ts-jest";
import type { Config } from "jest";

import { compilerOptions } from "./tsconfig.json";

const jestConfig: Config = {
  roots: ["<rootDir>"],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths),
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  ...createJsWithTsPreset(),
};

export default jestConfig;

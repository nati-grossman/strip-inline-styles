import typescript from "rollup-plugin-typescript2";
import * as typescript_pkg from "typescript";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  external: [],
  plugins: [
    typescript({
      typescript: typescript_pkg,
      clean: true,
    }),
  ],
};

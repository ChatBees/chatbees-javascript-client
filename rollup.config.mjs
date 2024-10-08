import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import terser from '@rollup/plugin-terser';

function modifyPackageJson(contents) {
  try {
    const packageJson = JSON.parse(contents);
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      scripts,
      private: isPrivate,
      dependencies,
      devDependencies,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...rest
    } = packageJson;

    rest.main = 'index.min.js';
    rest.module = 'index.esm.min.js';
    rest.types = 'index.d.ts';

    return JSON.stringify(rest, null, 2);
  } catch (error) {
    console.error('Error parsing package.json:', error);
    return contents;
  }
}

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.min.js',
      format: 'cjs',
      sourcemap: true,
      plugins: [terser()],
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.min.js',
      format: 'esm',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: [
    del({ targets: 'dist/*' }),
    typescript({
      exclude: ['**/*.spec.ts', '**/*.spec.d.ts'],
    }),
    copy({
      targets: [
        { src: 'LICENSE.md', dest: 'dist' },
        { src: 'README.md', dest: 'dist' },
        {
          src: 'package.json',
          dest: 'dist',
          transform: (contents) => modifyPackageJson(contents),
        },
      ],
    }),
  ],
  external: ['axios', 'dotenv'],
};

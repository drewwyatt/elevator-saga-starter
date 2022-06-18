import typescript from '@rollup/plugin-typescript'

const toConfig = fileName => ({
  input: `src/${fileName}.ts`,
  output: {
    file: `out/${fileName}.js`,
    format: 'es',
  },
  plugins: [typescript()],
})

export default [toConfig('init'), toConfig('update')]

import typescript from '@rollup/plugin-typescript';

export default {
  input: 'views/scripts/ws.ts',
  output: {
    dir: 'static/js'
  },
  plugins: [
    typescript({
      outDir: 'static/js',
      compilerOptions: {
        lib: ['es2020', 'dom'],
        module: 'esnext'
      }
    })
  ]
}

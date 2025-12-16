import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.test.jsx',
        '**/*.test.js'
      ],
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    },
    include: ['src/**/*.test.{js,jsx}'],
    exclude: ['node_modules', 'dist']
  }
})


import { defineConfig } from 'vite';

// GitHub Pages project site: https://<user>.github.io/<repo>/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/ef360_react/' : '/',
}));

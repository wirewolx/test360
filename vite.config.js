import { defineConfig } from 'vite';

// Relative base so assets resolve under https://<user>.github.io/<repo>/ when served from /docs
export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
}));

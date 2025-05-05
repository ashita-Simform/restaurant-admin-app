import { defineConfig } from 'vite';

describe('Vite Config', () => {
  it('should define the configuration correctly', () => {
    const config = defineConfig({
      plugins: [],
      resolve: {
        alias: {
          '@': './src',
        },
      },
    });
    expect(config).toHaveProperty('resolve.alias.@', './src');
  });
});

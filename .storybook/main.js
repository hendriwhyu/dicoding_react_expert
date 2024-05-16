/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook'
  ],

  framework: '@storybook/react-vite',

  core: {
    builder: '@storybook/builder-vite',
  },

  viteFinal: async (config, { configType }) => {
    // Buat perubahan kustom pada konfigurasi Vite di sini
    return config;
  },

  docs: {
    autodocs: true
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
};
export default config;

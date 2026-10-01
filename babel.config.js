module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias: {
        '@components': './src/components',
        '@screens': './src/screens',
        '@services': './src/services',
        '@stores': './src/stores',
        '@hooks': './src/hooks',
        '@constants': './src/constants',
        '@utils': './src/utils',
        '@navigation': './src/navigation',
      },
    }],
  ],
};
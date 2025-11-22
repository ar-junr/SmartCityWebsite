module.exports = {
  contextSeparator: '.',
  createOldCatalogs: false,
  defaultNamespace: 'translation',
  defaultValue: '',
  // Output paths:
  output: 'src/locales/$LOCALE/translation.json',
  input: ['src/**/*.{js,jsx}'],
  locales: ['en', 'ml'],
  namespaceSeparator: false,
  keySeparator: false,
  useKeysAsDefaultValue: true,
};

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners her
    },
    baseUrl: 'https://progresstodoserver.onrender.com/',
  },
});

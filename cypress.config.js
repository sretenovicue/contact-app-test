const { defineConfig } = require("cypress");

module.exports = defineConfig({

  reporter: 'cypress-mochawesome-reporter',
  // defaultCommandTimeout: 4000,
  // pageLoadTimeout: 30000,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    
    },
   baseUrl: 'https://thinking-tester-contact-list.herokuapp.com/'
  },
});

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "reporter": "cypress-mochawesome-reporter",
    "reporterOptions": {
      "reportDir": "cypress/reports",
      "charts": true,
      "reportPageTitle": "DriveBuddyAI Test Suite",
      "embeddedScreenshots": true,
      "inlineAssets": true
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);

    },
    chromeWebSecurity: false,
    defaultCommandTimeout: 15000,
    video: true,
    numTestsKeptInMemory: 0
  },
});

const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");

module.exports = defineConfig({
  reporter: "mocha-junit-reporter",
  reporterOptions: {
    mochaFile: "reports/junit/results-[hash].xml", // genera un XML por ejecución
    toConsole: true // muestra el resumen en consola (opcional)
  },
  e2e: {
    specPattern: "cypress/e2e/features/**/*.feature",
    baseUrl: "https://cars.vueling.com",
    viewportWidth: 430,
    viewportHeight: 932,

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },

    env: {
      cucumber: {
        stepDefinitions: "cypress/support/step_definitions"
      }
    }
  }
});

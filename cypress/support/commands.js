// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-mochawesome-reporter/register';
import addContext from 'mochawesome/addContext';
Cypress.Commands.add('addContext', (context) => {
  cy.once('test:after:run', (test) => addContext({ test }, context));
})

Cypress.Commands.add('apiLogin', (email, password) => {
  cy.request({
      method: "POST",
      url: `${Cypress.env("APIURL")}/users/login`,
      body: { "email": email, "password": password }
  },).then((response) => {
      const authorization = `bearer ${response.body.accessToken}`; // get the authorization token 
      Cypress.env('authorization', authorization)// save the authorization token for use elsewhere
  })
})

Cypress.Commands.add('validateSchema', (schema, content) => {
  const Ajv = require("ajv");
  const ajv = new Ajv({ allErrors: true });
  cy.addContext("Schema:" + JSON.stringify(schema))
  cy.addContext("Data:" + JSON.stringify(content))
  const validate = ajv.compile(schema);
  const isValid = validate(content);
  if (!isValid)
      cy.log(JSON.stringify(validate.errors))
  cy.then(() => {
      expect(isValid, `Schema validation ${isValid ? "passed" : "failed"}.`).to.be.true
  })
})

beforeEach(() => {
  if (Cypress.env("EMAIL") && Cypress.env("PASSWORD")) {
    cy.apiLogin(Cypress.env("EMAIL"), Cypress.env("PASSWORD"));
  }
  if (Cypress.env("APIKEY")) {
    const authorization = `x-api-key ${Cypress.env("APIKEY")}`;
    Cypress.env('authorization', authorization)
  }
});
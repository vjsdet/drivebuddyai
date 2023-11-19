/// <reference types="cypress" />
describe('Driver API Tests', () => {
  it('Get request to the driver api', () => {
    const request = {
      method: "GET",
      url: `${Cypress.env("APIURL")}/drivers`,
      failOnStatusCode: false,
      headers: { "authorization": Cypress.env("authorization") }
    };
    cy.addContext("Request:" + JSON.stringify(request))

    cy.request(request).then((response) => {
      cy.addContext("Response:" + JSON.stringify(response))
      expect(response.status).to.eq(200);
      expect(response.headers['content-type']).to.contain("application/json")
      cy.fixture(`/api/schema/driver/driver.json`).then((schema) => {
        cy.validateSchema(schema, response.body.data);
      })
    })
  })
})

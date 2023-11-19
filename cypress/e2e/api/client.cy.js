/// <reference types="cypress" />
describe('Client API Tests', () => {
  it('Get request to the client api', () => {
    const request = {
      method: "GET",
      url: `${Cypress.env("APIURL")}/clients`,
      failOnStatusCode: false,
      headers: { "authorization": Cypress.env("authorization") }
    };
    cy.addContext("Request:" + JSON.stringify(request))

    cy.request(request).then((response) => {
      cy.addContext("Response:" + JSON.stringify(response))
      expect(response.status).to.eq(200);
      expect(response.headers['content-type']).to.contain("application/json")
       cy.fixture(`/api/schema/client/client.json`).then((schema) => {
        cy.validateSchema(schema, response.body.data);
      }) 
    })
  })
})

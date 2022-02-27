// let user = {
//   firstname: `James_${Math.floor(Math.random() * 99) + 1}`,
//   email: `nomilen${Math.floor(Math.random() * 99) + 1}@kleogb.com`,
//   step_description: `test description ${Math.floor(Math.random() * 99) + 1}`,
//   workflow_name: `Cypress Test workflow ${Math.floor(Math.random() * 999) + 1}`,
//   workflow_name_temp: `Cypress Temp workflow ${
//     Math.floor(Math.random() * 999) + 1
//   }`,
//   workflow_description: `Cypress Test workflow description${
//     Math.floor(Math.random() * 99) + 1
//   }`,
// }

context('Support', () => {
  it('Create and select a workflow', () => {
    cy.visit('/')
    cy.get('#email', { timeout: 10000 })
      .type(Cypress.env('org_email'))
      .should('have.value', Cypress.env('org_email'))
    cy.get('#password')
      .type(Cypress.env('org_password'))
      .should('have.value', Cypress.env('org_password'))
    cy.get('#signup-submit').click()
    cy.wait(5000)
  })
})

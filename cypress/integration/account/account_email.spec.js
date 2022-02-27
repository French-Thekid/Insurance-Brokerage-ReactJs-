let user = {
  firstname: `James_${Math.floor(Math.random() * 99) + 1}`,
  email: `nomilen${Math.floor(Math.random() * 99) + 1}@kleogb.com`,
  step_description: `test description ${Math.floor(Math.random() * 99) + 1}`,
  workflow_name: `Cypress Test workflow ${Math.floor(Math.random() * 999) + 1}`,
  workflow_name_temp: `Cypress Temp workflow ${
    Math.floor(Math.random() * 999) + 1
  }`,
  workflow_description: `Cypress Test workflow description${
    Math.floor(Math.random() * 99) + 1
  }`,
}
context('Account', () => {
  it('Email create', () => {
    cy.visit('/')
    cy.get('#email', { timeout: 10000 })
      .type(Cypress.env('email'))
      .should('have.value', Cypress.env('email'))
    cy.get('#password')
      .type(Cypress.env('password'))
      .should('have.value', Cypress.env('password'))
    cy.get('#signup-submit').click()
    cy.wait(5000)

    //Find user
    cy.visit('/broker/home')
    cy.get('[data-cy="home-account"]', { timeout: 30000 }).first().click()

    //Goto emails
    cy.get('[data-cy="account-sidebar-email"]', { timeout: 5000 }).click()
    cy.contains('Compose Email').click()
  })
})

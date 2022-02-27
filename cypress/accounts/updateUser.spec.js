context('Actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Signs in to edit a user', () => {
    cy.get('#email')
      .type(Cypress.env('email'))
      .should('have.value', Cypress.env('email'))
    cy.get('#password')
      .type(Cypress.env('password'))
      .should('have.value', Cypress.env('password'))
    cy.get('[type="submit"]').click()

    cy.get('[data-testid="brokerUserLink"]').click()
    cy.get('[data-testid="checkEmail"]').first().click()
    cy.get('[data-testid="edit-user-navigation"]').first().click()

    cy.get('[data-testid="create-user-firstName"]')
      .clear()
      .type('darryl')
      .should('have.value', 'darryl')

    cy.get('[data-testid="create-user-lastName"]')
      .clear()
      .type('brown')
      .should('have.value', 'brown')

    cy.get('[data-testid="edit-user-submit"]').click()

    cy.get('[data-testid="brokerUserLink"]').click()
  })
})

/// <reference types="Cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Signs in user', () => {
    cy.get('#email')
      .type(Cypress.env('email'))
      .should('have.value', Cypress.env('email'))
    cy.get('#password')
      .type(Cypress.env('password'))
      .should('have.value', Cypress.env('password'))
    cy.get('#signup-submit').click()
  })
  it('Should produce an error for invalid credentials', () => {
    cy.get('#email')
      .type(Cypress.env('email'))
      .should('have.value', Cypress.env('email'))
    cy.get('#password').type('12345678').should('have.value', '12345678')
    cy.get('#signup-submit').click()
    cy.get('[type*="error"]').should(
      'have.text',
      'Incorrect username or password.'
    )
  })
})

/// <reference types="Cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('/forget-password')
  })
  // TODO fix to send actually email
  it('Fail to send Forget Password link to email that doesnt exist', () => {
    cy.get('#email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')
    cy.get('[data-testid="forget-password-submit"]').click()
    cy.get('[type*="error"]').should(
      'have.text',
      'Something went wrong while processing your request'
    )
  })
  it('Fail to send Forget Password link to email that doesnt exist', () => {
    cy.get('#email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')
    cy.get('[data-testid="forget-password-submit"]').click()
    cy.get('[type*="error"]').should(
      'have.text',
      'Something went wrong while processing your request'
    )
  })
})

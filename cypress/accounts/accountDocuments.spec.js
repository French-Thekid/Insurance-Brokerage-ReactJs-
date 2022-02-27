context('Actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Signs in to view documents', () => {
    cy.get('[data-testid="sign-in-email"]')
      .type('dabrown@vertisjm.com')
      .should('have.value', 'dabrown@vertisjm.com')

    cy.get('[data-testid="sign-in-password"]')
      .type('Password2')
      .should('have.value', 'Password2')

    cy.get('[data-testid="sign-in-submit"]').click()
    cy.get('[data-testid="brokerAccountLink"]').click()

    cy.wait(5000)

    cy.get('[data-testid="selecttest"]')
      .first()
      .click()

    cy.get('.accountsidebar-link-documents').click()

    cy.get('.error-notification')
      .contains('Unable to load documents')
      .should('not.be.visible')
  })
})

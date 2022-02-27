let user = {
  firstname: `James_${Math.floor(Math.random() * 99) + 1}`,
  email: `nomilen${Math.floor(Math.random() * 99) + 1}@kleogb.com`,
}
context('Account', () => {
  it('Edit account', () => {
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
    cy.get('[data-cy="home-account"]', { timeout: 10000 })
      .contains('James')
      .click()
    cy.get('button').contains('Edit Account').click()
    cy.get('#firstName')
      .click()
      .clear()
      .type(user.firstname)
      .should('have.value', user.firstname)
    cy.get('#email')
      .click()
      .clear()
      .type(user.email)
      .should('have.value', user.email)
    cy.get('button').contains('Submit').click()
    cy.get('p').contains(user.firstname)
    cy.get('p').contains(user.email)
  })
})

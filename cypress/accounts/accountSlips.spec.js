let p = {
  subject: `Slip Subject_${Math.floor(Math.random() * 99) + 1}`,
  body: `Slip Body Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit_${Math.floor(
    Math.random() * 99
  ) + 1}`,
  count: 0,
}
context('Actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Signs in to view a slip in an iframe', () => {
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

    cy.get('.accountsidebar-link-slips').click()

    cy.get('[data-testid="selecttest"]')
      .first()
      .click()

    cy.get('iframe')
  })
  it('Signs in to create a new slip', () => {
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

    cy.get('.accountsidebar-link-slips').click()

    cy.get('.slipstable')
      .find('[data-testid="selecttest"]')
      .then(listing => {
        const listingCount = Cypress.$(listing).length
        p.count = Cypress.$(listing).length
        expect(listing).to.have.length(listingCount)
      })

    cy.get('[data-testid="new-slip"]').click()

    cy.get('[data-testid="selecttest"]').should('be.visible')

    cy.get('input[title="Toggle Row Selected"]')
      .eq(0)
      .check()

    cy.get('[data-testid="generate-slip"]').click()

    cy.get('.insurer-selection-card').should('be.visible')

    cy.get('.insurer-selection-card')
      .first()
      .click()

    cy.get('[data-testid="generate-slip-submit"]').click()

    cy.get('[data-testid="genereate-slip-finalize"]').click()

    cy.get('#subject')
      .clear()
      .type(p.subject)
      .should('have.value', p.subject)

    cy.get('#body')
      .clear()
      .type(p.body)
      .should('have.value', p.body)

    cy.get('[form="SlipSubmit"]').click()

    cy.wait(4000)

    cy.get('.slipstable')
      .find('[data-testid="selecttest"]')
      .then(listing => {
        const listingCount = Cypress.$(listing).length
        expect(listing).to.have.length(p.count + 1)
      })
  })
})

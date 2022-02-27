let p = {
  title: `Event Title_${Math.floor(Math.random() * 99) + 1}`,
  streetNumber: `${Math.floor(Math.random() * 99) + 1}`,
  streetName: 'Loboda West',
  city: 'Kingston',
  parish: 'St. Andrew',
  country: 'Jamaica',
  description: `Event Description Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit_${Math.floor(
    Math.random() * 99
  ) + 1}`,
}
context('Actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Signs in to create an event', () => {
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

    cy.get('.accountsidebar-link-events').click()

    cy.get('.rbc-day-bg')
      .eq(Math.floor(Math.random() * 27) + 1)
      .click()

    cy.get('#title')
      .first()
      .clear()
      .type(p.title)
      .should('have.value', p.title)

    cy.get('#streetNumber')
      .clear()
      .type(p.streetNumber)
      .should('have.value', p.streetNumber)

    cy.get('#street')
      .clear()
      .type(p.streetName)
      .should('have.value', p.streetName)

    cy.get('#city')
      .clear()
      .type(p.city)
      .should('have.value', p.city)

    cy.get('select[name*="parish"]')
      .select(p.parish)
      .should('have.value', p.parish)

    cy.get('select[name*="country"]')
      .select(p.country)
      .should('have.value', p.country)

    cy.get('#description')
      .clear()
      .type(p.description)
      .should('have.value', p.description)

    cy.get('button[type="submit"]').click()

    cy.contains(p.title).should('be.visible')

    cy.contains(p.title).click()
  })
})

let p = {
  section: 'General',
  content: `Test note with some content generated_${
    Math.floor(Math.random() * 99) + 1
  }`,
}

let c = {
  section: 'General',
  content: `Updated Test note with some content generated_${
    Math.floor(Math.random() * 99) + 1
  }`,
}

context('Actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Signs in to create a policy in accounts', () => {
    cy.get('[data-testid="sign-in-email"]')
      .type('dabrown@vertisjm.com')
      .should('have.value', 'dabrown@vertisjm.com')

    cy.get('[data-testid="sign-in-password"]')
      .type('Password2')
      .should('have.value', 'Password2')

    cy.get('[data-testid="sign-in-submit"]').click()
    cy.get('[data-testid="brokerAccountLink"]').click()

    cy.get('[data-testid="selecttest"]').first().click()

    cy.get('.accountsidebar-link-policies').click()

    cy.get('[data-testid="new-note"]').click()

    cy.get('select[name*="noteSection"]')
      .select(p.section)
      .should('have.value', p.section)

    cy.get('#noteContent')
      .clear()
      .type(p.content)
      .should('have.value', p.content)

    cy.get('button[type*="submit"]').click()

    cy.get('[data-testid="card-close"]').click()

    cy.reload()

    cy.get('.note-list-card-content').contains(p.content).first()
  })

  //   it('Signs in to edit a note in accounts', () => {
  //     cy.get('[data-testid="sign-in-email"]')
  //       .type('dabrown@vertisjm.com')
  //       .should('have.value', 'dabrown@vertisjm.com')

  //     cy.get('[data-testid="sign-in-password"]')
  //       .type('Password2')
  //       .should('have.value', 'Password2')

  //     cy.get('[data-testid="sign-in-submit"]').click()
  //     cy.get('[data-testid="brokerAccountLink"]').click()

  //     cy.get('[data-testid="selecttest"]')
  //       .first()
  //       .click()

  //     cy.get('.accountsidebar-link-policies').click()

  //     cy.get('[data-testid="note-edit"]')
  //       .first()
  //       .click()

  //     cy.get('select[name*="noteSection"]')
  //       .select(c.section)
  //       .should('have.value', c.section)

  //     cy.get('#noteContent')
  //       .clear()
  //       .type(c.content)
  //       .should('have.value', c.content)

  //     cy.get('button[type*="submit"]').click()

  //     cy.get('[data-testid="card-close"]').click()

  //     cy.reload()
  //   })
  //   it('Signs in to delete a note in accounts', () => {
  //     cy.get('[data-testid="sign-in-email"]')
  //       .type('dabrown@vertisjm.com')
  //       .should('have.value', 'dabrown@vertisjm.com')

  //     cy.get('[data-testid="sign-in-password"]')
  //       .type('Password2')
  //       .should('have.value', 'Password2')

  //     cy.get('[data-testid="sign-in-submit"]').click()
  //     cy.get('[data-testid="brokerAccountLink"]').click()

  //     cy.get('[data-testid="selecttest"]')
  //       .first()
  //       .click()

  //     cy.get('.accountsidebar-link-notes').click()

  //     cy.get('[data-testid="note-delete"]')
  //       .first()
  //       .click()

  //     cy.get('button[type*="submit"]').click()

  //     cy.reload()

  //     cy.contains(c.content).should('not.be.visible')
  //   })
})

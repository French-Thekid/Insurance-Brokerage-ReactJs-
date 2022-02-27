let p = {
  to: 'dabrown@vertisjme.com',
  cc: 'dabrown@vertisjme.com',
  subject: `Email Subject_${Math.floor(Math.random() * 99) + 1}`,
  body: `Email Body Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit_${
    Math.floor(Math.random() * 99) + 1
  }`,
  count: 0,
}
context('Actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Signs in to send email', () => {
    cy.get('[data-testid="sign-in-email"]')
      .type(credentials().name)
      .should('have.value', 'dabrown@vertisjm.com')

    cy.get('[data-testid="sign-in-password"]')
      .type('Password2')
      .should('have.value', 'Password2')

    cy.get('[data-testid="sign-in-submit"]').click()
    cy.get('[data-testid="brokerAccountLink"]').click()

    cy.wait(5000)

    cy.get('[data-testid="selecttest"]').first().click()

    cy.get('.accountsidebar-link-email').click()

    cy.get('[data-testid="email-compose"]').click()

    cy.get('[data-placeholder="true"]').first().click()

    cy.get('[type="text"]')
      .first()
      .clear()
      .type(p.to)
      .should('have.value', p.to)

    cy.get('[data-placeholder="true"]').eq(1).click()

    cy.get('input[type="text"]')
      .eq(1)
      .clear()
      .type(p.cc)
      .should('have.value', p.cc)

    cy.get('#subject').clear().type(p.subject).should('have.value', p.subject)

    cy.get('#body').clear().type(p.body).should('have.value', p.body)

    cy.get('button[type="submit"]')

    cy.get('[data-testid="email-send"]').click()

    cy.get('.sentbox').click()

    cy.contains(p.subject).should('be.visible')
  })
  it('Signs in to send email with attachment', () => {
    cy.get('[data-testid="sign-in-email"]')
      .type('dabrown@vertisjm.com')
      .should('have.value', 'dabrown@vertisjm.com')

    cy.get('[data-testid="sign-in-password"]')
      .type('Password2')
      .should('have.value', 'Password2')

    cy.get('[data-testid="sign-in-submit"]').click()
    cy.get('[data-testid="brokerAccountLink"]').click()

    cy.wait(5000)

    cy.get('[data-testid="selecttest"]').first().click()

    cy.get('.accountsidebar-link-email').click()

    cy.get('[data-testid="email-compose"]').click()

    cy.get('[data-placeholder="true"]').first().click()

    cy.get('[type="text"]')
      .first()
      .clear()
      .type(p.to)
      .should('have.value', p.to)

    cy.get('[data-placeholder="true"]').eq(1).click()

    cy.get('input[type="text"]')
      .eq(1)
      .clear()
      .type(p.cc)
      .should('have.value', p.cc)

    cy.get('#subject').clear().type(p.subject).should('have.value', p.subject)

    cy.get('#body').clear().type(p.body).should('have.value', p.body)

    cy.get('input[type="file"]').attachFile('image.png')

    cy.wait(5000)

    cy.get('[data-testid="email-send"]').click()

    cy.get('.sentbox').click()

    cy.contains(p.subject).should('be.visible')
  })
  it('Signs in to delete an email', () => {
    cy.get('[data-testid="sign-in-email"]')
      .type('dabrown@vertisjm.com')
      .should('have.value', 'dabrown@vertisjm.com')

    cy.get('[data-testid="sign-in-password"]')
      .type('Password2')
      .should('have.value', 'Password2')

    cy.get('[data-testid="sign-in-submit"]').click()
    cy.get('[data-testid="brokerAccountLink"]').click()

    cy.wait(5000)

    cy.get('[data-testid="selecttest"]').first().click()

    cy.get('.accountsidebar-link-email').click()

    cy.get('.sentbox').click()

    cy.get('.delete-mail').should('be.visible')

    cy.get('.delete-mail').first().click()

    cy.get('#deleteConfirmation')
      .clear()
      .type('delete')
      .should('have.value', 'delete')

    cy.get('button[type="submit"]').click()
  })
})

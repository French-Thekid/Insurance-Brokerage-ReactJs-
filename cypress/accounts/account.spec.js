let fname = `James_${Math.floor(Math.random() * 99) + 1}`
let lname = `Jonas_${Math.floor(Math.random() * 99) + 1}`
let streetnumber = Math.floor(Math.random() * 999) + 1
let fullname = `${fname} ${lname}`
context('Actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Signs in to edit an Account', () => {
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

    cy.get('[data-testid="account-edit"]').click()

    cy.get('#firstName')
      .clear()
      .type(fname)
      .should('have.value', fname)

    cy.get('#lastName')
      .clear()
      .type(lname)
      .should('have.value', lname)

    cy.get('button[type*="submit"]').click()

    cy.get('[data-testid="account-edit"]').click()

    cy.get('button[type*="button"]')
      .contains('Next')
      .click()
    cy.get('button[type*="button"]')
      .contains('Next')
      .click()
    cy.get('button[type*="button"]')
      .contains('Next')
      .click()

    cy.get('#streetNumber')
      .clear()
      .type(`${streetnumber}`)
      .should('have.value', `${streetnumber}`)

    cy.get('button[type*="submit"]').click()

    cy.get('.account-name').contains(fullname)
    cy.get('#account-address').contains(streetnumber)
  })
  it('Submit button should be disabled ', () => {
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

    cy.get('[data-testid="account-edit"]').click()

    cy.get('#firstName').clear()

    cy.get('#lastName')
      .clear()
      .type(lname)
      .should('have.value', lname)

    cy.get('button[type*="submit"]').should('have.attr', 'disabled')
  })
})

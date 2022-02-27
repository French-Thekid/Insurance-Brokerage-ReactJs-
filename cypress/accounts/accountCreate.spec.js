let p = {
  fname: `James_${Math.floor(Math.random() * 99) + 1}`,
  lname: `Jonas_${Math.floor(Math.random() * 99) + 1}`,
  gender: 'Male',
  email: 'nomilen184@kleogb.com',
  drivers: 444444444,
  number: 8761234567,
  subpremise: 'Avendale Rd',
  premise: 'Kingways',
  thoroughfare: 'Hanover',
  country: 'Jamaica',
  extension: 1,
  carrier: 'Flow',
  type: 'Cell',
  streetnumber: Math.floor(Math.random() * 999) + 1,
}

context('Actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Signs in to create an Account', () => {
    cy.get('[data-testid="sign-in-email"]')
      .type('dabrown@vertisjm.com')
      .should('have.value', 'dabrown@vertisjm.com')

    cy.get('[data-testid="sign-in-password"]')
      .type('Password2')
      .should('have.value', 'Password2')

    cy.get('[data-testid="sign-in-submit"]').click()
    cy.get('[data-testid="brokerAccountLink"]').click()

    cy.get('[data-testid="new-account"]').click()

    cy.get('[data-testid="new-individual-account"]').click()

    // FILL IN INPUTS
    cy.get('#firstName')
      .clear()
      .type(p.fname)
      .should('have.value', p.fname)

    cy.get('#lastName')
      .clear()
      .type(p.lname)
      .should('have.value', p.lname)

    cy.get('#email')
      .clear()
      .type(p.email)
      .should('have.value', p.email)

    cy.get('select[name*="gender"]')
      .select(p.gender)
      .should('have.value', p.gender)

    //NEXT
    cy.get('button[type*="button"]')
      .contains('Next')
      .click()

    cy.get('#dlNumber')
      .clear()
      .type(p.drivers)

    //NEXT
    cy.get('button[type*="button"]')
      .contains('Next')
      .click()

    cy.get('#number')
      .clear()
      .type(p.drivers)

    cy.get('#extension')
      .clear()
      .type(p.extension)

    cy.get('select[name*="type"]')
      .select(p.type)
      .should('have.value', p.type)

    cy.get('select[name*="carrier"]')
      .select(p.carrier)
      .should('have.value', p.carrier)
    //NEXT
    cy.get('button[type*="button"]')
      .contains('Next')
      .click()

    cy.get('#streetNumber')
      .clear()
      .type(`${p.streetnumber}`)
      .should('have.value', `${p.streetnumber}`)

    cy.get('#subPremise')
      .clear()
      .type(`${p.subpremise}`)
      .should('have.value', `${p.subpremise}`)

    cy.get('#premise')
      .clear()
      .type(`${p.premise}`)
      .should('have.value', `${p.premise}`)

    cy.get('select[name*="thoroughfare"]')
      .select(p.thoroughfare)
      .should('have.value', p.thoroughfare)

    cy.get('select[name*="country"]')
      .select(p.country)
      .should('have.value', p.country)

    cy.get('button[type*="submit"]').click()

    cy.get('.notification-subject').should('have.text', 'Success')
  })
})

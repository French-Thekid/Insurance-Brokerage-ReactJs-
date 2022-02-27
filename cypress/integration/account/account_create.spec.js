/// <reference types="Cypress" />

let user = {
  title: `Mr.`,
  firstname: `James_${Math.floor(Math.random() * 99) + 1}`,
  middlename: `Jones_${Math.floor(Math.random() * 99) + 1}`,
  lastname: `Jonas_${Math.floor(Math.random() * 99) + 1}`,
  gender: 'Male',
  martialStatus: 'Married',
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

context('Account', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Fail to create an account with existing email', () => {
    cy.visit('/')
    cy.get('#email', { timeout: 10000 })
      .type(Cypress.env('email'))
      .should('have.value', Cypress.env('email'))
    cy.get('#password')
      .type(Cypress.env('password'))
      .should('have.value', Cypress.env('password'))
    cy.get('#signup-submit').click()
    cy.wait(5000)
    cy.visit('/broker/accounts?action=createIndividualAccount')
    cy.get('#title', { timeout: 10000 }).click()
    cy.get('[data-value="Mr."]').click()
    cy.get('#firstName')
      .click()
      .type(user.firstname)
      .should('have.value', user.firstname)
    cy.get('#middleName')
      .click()
      .type(user.middlename)
      .should('have.value', user.middlename)
    cy.get('#lastName')
      .click()
      .type(user.lastname)
      .should('have.value', user.lastname)
    cy.get('#gender').click()
    cy.get(`[data-value="${user.gender}"]`).click()
    cy.get('#maritalStatus').click()
    cy.get(`[data-value="${user.martialStatus}"]`).click()
    cy.get('#dateOfBirth')
      .click()
      .type('1992-09-09')
      .should('have.value', '1992-09-09')
    cy.get('#placeOfBirth')
      .click()
      .type('Mandeville')
      .should('have.value', 'Mandeville')
    cy.get('#employmentType').click()
    cy.get(`[data-value="Employed-Fulltime"]`).click()
    cy.get('#occupation')
      .click()
      .type('Teacher')
      .should('have.value', 'Teacher')
    cy.get('#nationality')
      .click()
      .type('Jamaican')
      .should('have.value', 'Jamaican')
    cy.get('#email').click().type(user.email).should('have.value', user.email)
    // Driver License
    cy.get('button').contains('Next').click()
    cy.get('#dlType').click()
    cy.get(`[data-value="General"]`).click()
    cy.get('#dlNumber')
      .click()
      .type('999-999-999')
      .should('have.value', '999-999-999')
    cy.get('#dlCountry').click()
    cy.get(`[data-value="Jamaica"]`).click()
    cy.get('#dlDateIssued')
      .click()
      .type('2020-09-09')
      .should('have.value', '2020-09-09')
    cy.get('#dlDateFirstIssued')
      .click()
      .type('2020-09-09')
      .should('have.value', '2020-09-09')
    cy.get('#dlExpirationDate')
      .click()
      .type('2023-09-09')
      .should('have.value', '2023-09-09')
    cy.get('button').contains('Next').click()
    // Contact
    cy.get('#type').click()
    cy.get(`[data-value="Mobile"]`).click()
    cy.get('#carrier').click()
    cy.get(`[data-value="Digicel"]`).click()
    cy.get('#number')
      .click()
      .type('8768094534')
      .should('have.value', '(876) 809-4534')
    cy.get('#extension').click().type('8009').should('have.value', '8009')
    cy.get('button').contains('Next').click()
    // Location
    cy.get('#streetNumber').click().type('32A').should('have.value', '32A')
    cy.get('#subPremise')
      .click()
      .type(user.subpremise)
      .should('have.value', user.subpremise)
    cy.get('#premise')
      .click()
      .type(user.premise)
      .should('have.value', user.premise)
    cy.get('#thoroughfare').click()
    cy.get(`[data-value="${user.thoroughfare}"]`).click()
    cy.get('#country').click()
    cy.get(`[data-value="${user.country}"]`).click()
    cy.get('button').contains('Submit').click()
  })
})

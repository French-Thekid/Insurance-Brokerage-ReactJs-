context('Actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Signs in to create a task', () => {
    cy.get('[data-testid="sign-in-email"]')
      .type('dabrown@vertisjm.com')
      .should('have.value', 'dabrown@vertisjm.com')

    cy.get('[data-testid="sign-in-password"]')
      .type('Password2')
      .should('have.value', 'Password2')

    cy.get('[data-testid="sign-in-submit"]').click()

    cy.get('[data-testid="task-input"]')
      .type('Cypress test task')
      .should('have.value', 'Cypress test task')
    cy.get('[data-testid="task-create-submit"]').click()

    cy.get('.task-content').contains('Cypress test task')
    // cy.get('#task').contains('Cypress test task')

    //     cy.get('[data-testid="checkEmail"]').first().click()

    //     cy.get('[data-testid="edit-user-navigation"]').first().click()

    //     cy.get('[data-testid="create-user-firstName"]').clear()
    //     .type('darryl')
    //     .should('have.value', 'darryl')

    //     cy.get('[data-testid="create-user-lastName"]').clear()
    //    .type('brown')
    //     .should('have.value', 'brown')

    //     cy.get('[data-testid="edit-user-submit"]').click()

    //   cy.get('[data-testid="brokerUserLink"]').click()
  })
  it('Signs in to edit a task', () => {
    cy.get('[data-testid="sign-in-email"]')
      .type('dabrown@vertisjm.com')
      .should('have.value', 'dabrown@vertisjm.com')

    cy.get('[data-testid="sign-in-password"]')
      .type('Password2')
      .should('have.value', 'Password2')

    cy.get('[data-testid="sign-in-submit"]').click()

    cy.get('.task-check')
      .first()
      .check()

    cy.get('.task-check')
      .first()
      .should('have.attr', 'checked')
  })
  it('Signs in to create and delete a user', () => {
    cy.get('[data-testid="sign-in-email"]')
      .type('dabrown@vertisjm.com')
      .should('have.value', 'dabrown@vertisjm.com')

    cy.get('[data-testid="sign-in-password"]')
      .type('Password2')
      .should('have.value', 'Password2')

    cy.get('[data-testid="sign-in-submit"]').click()

    //Create a task
    cy.get('[data-testid="task-input"]')
      .type('Cypress test task')
      .should('have.value', 'Cypress test task')

    cy.get('[data-testid="task-create-submit"]').click()

    cy.get('#task').contains('Cypress test task')
    // cy.get('.task-content').contains('Cypress test task')

    //Delete the created task
    cy.get('[data-testid="task-delete"]').dblclick({ multiple: true })
  })
})

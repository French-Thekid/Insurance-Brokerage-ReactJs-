let user = {
  firstname: `James_${Math.floor(Math.random() * 99) + 1}`,
  email: `nomilen${Math.floor(Math.random() * 99) + 1}@kleogb.com`,
  step_description: `test description ${Math.floor(Math.random() * 99) + 1}`,
  workflow_name: `Cypress Test workflow ${Math.floor(Math.random() * 999) + 1}`,
  workflow_name_temp: `Cypress Temp workflow ${
    Math.floor(Math.random() * 999) + 1
  }`,
  workflow_description: `Cypress Test workflow description${
    Math.floor(Math.random() * 99) + 1
  }`,
}
context('Account', () => {
  it('Create and select a workflow', () => {
    cy.visit('/')
    cy.get('#email', { timeout: 10000 })
      .type(Cypress.env('email'))
      .should('have.value', Cypress.env('email'))
    cy.get('#password')
      .type(Cypress.env('password'))
      .should('have.value', Cypress.env('password'))
    cy.get('#signup-submit').click()
    cy.wait(5000)

    //Create a workflow and delete it
    cy.visit('/broker/settings/workflows')
    cy.wait(5000)
    cy.get('button', { timeout: 10000 }).contains('New Workflow').click()
    cy.get('[data-cy="insert-step"]', { timeout: 10000 }).click()
    cy.wait(5000)
    cy.get('p').contains('Email', { timeout: 5000 }).click()
    cy.get('[data-cy="save"]').click()
    cy.get('#name', { timeout: 10000 })
      .clear()
      .type(user.workflow_name_temp)
      .should('have.value', user.workflow_name_temp)
    cy.get('#description', { timeout: 10000 })
      .clear()
      .type(user.workflow_description)
      .should('have.value', user.workflow_description)
    cy.get('[type="submit"]').click()
    cy.wait(5000)
    cy.contains(user.workflow_name_temp, { timeout: 10000 })
      .get('[data-cy="menu"]', { timeout: 10000 })
      .first()
      .click()
    cy.contains('Delete', { timeout: 20000 }).click()
    cy.get('#deleteConfirmation')
      .clear()
      .type('delete')
      .should('have.value', 'delete')
    cy.get('[type="submit"]').click()

    //Create workflow
    cy.visit('/broker/settings/workflows')
    cy.get('button', { timeout: 10000 }).contains('New Workflow').click()
    cy.get('[data-cy="insert-step"]', { timeout: 10000 }).click()
    cy.wait(5000)
    cy.get('p').contains('Event', { timeout: 5000 }).click()
    cy.get('[data-cy="insert-step"]', { timeout: 10000 }).click()
    cy.get('p').contains('Email', { timeout: 5000 }).click()
    cy.get('[data-cy="delete-step"]').first().click()
    cy.get('[data-cy="edit-step"]').first().click()
    cy.get('#description')
      .clear()
      .type(user.step_description)
      .should('have.value', user.step_description)
    cy.get('[type="submit"]').click()
    cy.get('[data-cy="insert-step"]', { timeout: 10000 }).click()
    cy.get('p').contains('Event', { timeout: 5000 }).click()
    cy.get('[data-cy="insert-step"]', { timeout: 10000 }).click()
    cy.get('p').contains('Email').click()
    cy.get('[data-cy="insert-step"]', { timeout: 10000 }).click()
    cy.get('p').contains('Approval', { timeout: 5000 }).click()
    cy.get('[data-cy="role-step"]').first().click()
    cy.get('[data-cy="user-card"]').first().click()
    cy.get('[data-cy="dialog-close"]').click()
    cy.get('[data-cy="insert-step"]', { timeout: 10000 }).click()
    cy.get('p').contains('Notes', { timeout: 5000 }).click()
    cy.get('[data-cy="save"]').click()
    cy.get('#name', { timeout: 10000 })
      .clear()
      .type(user.workflow_name)
      .should('have.value', user.workflow_name)
    cy.get('#description', { timeout: 10000 })
      .clear()
      .type(user.workflow_description)
      .should('have.value', user.workflow_description)
    cy.get('[type="submit"]').click()

    //Find user
    cy.visit('/broker/home')
    cy.get('[data-cy="home-account"]', { timeout: 30000 })
      .contains('James')
      .click()
    cy.get('div').contains('Actions').click()
    cy.get('button').contains('Switch Workflow').click()
    cy.get('[data-cy="workflow-select"]').select(user.workflow_name).first()
    cy.get('button').contains('Save').click()
    cy.wait(5000)
    cy.contains('Start', { timeout: 5000 }).click()
    cy.wait(5000)
    cy.contains('Next Step', { timeout: 20000 }).click()
    cy.contains('Next Step', { timeout: 20000 }).click()
    cy.wait(3000)
    cy.contains('Next Step', { timeout: 20000 }).click()
    cy.wait(3000)
    cy.contains('Next Step', { timeout: 20000 }).click()
    cy.wait(3000)
    cy.contains('Stop', { timeout: 20000 }).click()
    cy.wait(3000)
    cy.visit('/broker/home')
    cy.get('[data-cy="home-account"]', { timeout: 30000 })
      .contains('James')
      .click()
    cy.wait(3000)
    cy.get('div').contains('Actions').click()
    cy.get('button').contains('Workflow Approval').click()
    cy.wait(3000)
    cy.get('[name="password"]', { timeout: 10000 })
      .clear()
      .type(Cypress.env('password'))
      .should('have.value', Cypress.env('password'))
    cy.get('button').contains('Continue').click()
    cy.wait(3000)
    cy.get('button').contains('Deny').click()
    cy.get('#reason', { timeout: 10000 })
      .clear()
      .type('Cypress test')
      .should('have.value', 'Cypress test')
    cy.get('button').contains('Send').click()
    cy.wait(5000)
    cy.get('div').contains('Actions', { timeout: 10000 }).click()
    cy.get('button').contains('Workflow Approval').click()
    cy.wait(3000)
    cy.get('[name="password"]', { timeout: 10000 })
      .clear()
      .type(Cypress.env('password'))
      .should('have.value', Cypress.env('password'))
    cy.get('button').contains('Continue').click()
    cy.wait(3000)
    cy.get('button').contains('Approve').click()
  })
})

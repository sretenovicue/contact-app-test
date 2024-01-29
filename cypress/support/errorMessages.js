Cypress.Commands.add('ErrorMessages', (errorText) => {
    cy.get('#submit')
    .click()
    cy.get('#error')
    .should('have.text', errorText)
    })
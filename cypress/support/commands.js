// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// cypress/support/commands.js


Cypress.Commands.add('Login', () => {
    cy.visit('/')
    cy.get('#email')
    .type('sretenovicue@gmail.com')
    cy.get('#password')
    .type('Bsr@enovic25')
    cy.get('#submit')
    .click()
})


Cypress.Commands.add('loginShould', () => {
    cy.get('[id="error"]')
    .should('have.text', 'Incorrect username or password')
    cy.contains('p', 'Not yet a user? Click here to sign up!')
})


Cypress.Commands.add('loginInputPassword', () => {
cy.get('#password')
  .type('Bsr@enovic25')
  cy.get('#submit')
  .click()
})


Cypress.Commands.add('loginWelcomeMessage', () => {
cy.get('[class="welcome-message"]')
      .eq(0)
      .should('contain', 'Welcome! This application is for testing purposes only. The database will be purged as needed to keep costs down.')
      .and('have.css', 'color', 'rgb(66, 135, 245)')
    cy.get('[class="welcome-message"]').eq(1)
      .should('contain', 'The API documentation can be found')
    })

    Cypress.Commands.add('loginInputPasswordInvalid', () => {
      cy.get('#password')
        .type('Bsr@enovic')
        cy.get('#submit')
        .click()
      })
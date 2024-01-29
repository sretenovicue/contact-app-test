///    <reference types="cypress"/>

import { addContactElements } from '../support/Pom/addContactForm'

describe('Add Contact', () => {

    beforeEach('Login', () => {
        cy.Login()
    })
    it('Add Contact Header', () => {
        cy.get(addContactElements.addButton)
            .should('have.text', 'Add a New Contact')
            .should('not.be.disabled')

    })

    it('Add Contact - Submit without entering data', () => {
        cy.intercept('POST', 'https://thinking-tester-contact-list.herokuapp.com/contacts').as('validationError')
        cy.get(addContactElements.addButton)
            .click()
        cy.get(addContactElements.submitButton)
            .click()
        cy.get(addContactElements.erroro)
            .should('have.text', 'Contact validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required.')
        cy.wait('@validationError')
    })
    it('Add Contact - Submit with entering firstName only', () => {
        cy.get(addContactElements.addButton)
        .click()
        cy.get(addContactElements.firstName)
        .type('Aleksandar')
        cy.get(addContactElements.submitButton)
        .click()
        cy.get(addContactElements.erroro)
        .should('have.text', 'Contact validation failed: lastName: Path `lastName` is required.')
})
it('Add Contact - Submit with entering lastName only', () => {
    cy.get(addContactElements.addButton)
    .click() 
    cy.get(addContactElements.lastName)
    .type('Sretenovic')
    cy.get(addContactElements.submitButton)
    .click()
    cy.get(addContactElements.erroro)
    .should('have.text', 'Contact validation failed: firstName: Path `firstName` is required.')

})



it('Add Contact - Happy path', () => {
    cy.get(addContactElements.addButton)
    .click()
    cy.get(addContactElements.firstName)
    .type('Aleksandar')
    cy.get(addContactElements.lastName)
    .type('Sretenovic')
    cy.get(addContactElements.birthday)
    .type('1960-08-07')
    cy.get(addContactElements.email)
    .type('aleksa60@gmail.com')
    cy.get(addContactElements.city)
    .type('Uzice')
    cy.get(addContactElements.submitButton)
    .click()
})

 

})
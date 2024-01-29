
///                 <reference types="cypress"/>

import { signUpFormElements } from '../support/Pom/signUpForm'
import { credentials, errorMessagesSignUp } from '../support/Pom/credentialsAndMessages'



describe('Sign Up', () => {

    beforeEach('SignUp', () => {
        cy.signUpCheck()
    })

    it('Sign up with all field empty', () => {
        cy.get('#submit')
            .click()
        cy.ErrorMessages(errorMessagesSignUp.message1)

    })


    it('Type only firstname', () => {
        cy.intercept('POST', 'https://thinking-tester-contact-list.herokuapp.com/users').as('postUser')
        cy.get(signUpFormElements.firstName)
            .type(credentials.firstName)
        cy.get('#submit')
            .click()
        cy.ErrorMessages(errorMessagesSignUp.message2)
        cy.wait('@postUser')
    })


    it('Type first and lastname ', () => {
        cy.get(signUpFormElements.firstName)
            .type('Aleksa')
        cy.get(signUpFormElements.lastName)
            .type(credentials.lastName)
        cy.get('#submit')
            .click()
        cy.ErrorMessages(errorMessagesSignUp.message3)

    })


    it('Type firstname, lastname and email ', () => {
        cy.get(signUpFormElements.firstName)
            .type(credentials.firstName)
        cy.get(signUpFormElements.lastName)
            .type(credentials.lastName)
        cy.get(signUpFormElements.email)
            .type('test123@gmail.com')
        cy.get('#submit')
            .click()
        cy.ErrorMessages(errorMessagesSignUp.message4)
    })


    it('Type data in all fields - Happy path ', () => {
        const email = `testuser${Date.now()}@example.com`;
        cy.get(signUpFormElements.firstName)
            .type(credentials.firstName)
        cy.get(signUpFormElements.lastName)
            .type(credentials.lastName)
        cy.get(signUpFormElements.email)
            .type(email)
        cy.get(signUpFormElements.password)
            .type(credentials.password)
        cy.get('#submit')
            .click()
        cy.url()
            .should('eq', 'https://thinking-tester-contact-list.herokuapp.com/contactList')
        cy.get('h1')
            .should('have.text', 'Contact List')
        cy.get('[class="logout"]')
            .click()

    })

}) 

import { loginPageElements } from '../support/Pom/loginPageElements'

///    <reference types="cypress"/>


describe('Login', () => {
  it('Login without entering credentials', () => {
    cy.intercept('POST', '/users/login')
    .as('loginErrorMessage')
    cy.visit('/')
    cy.loginWelcomeMessage()
    cy.get(loginPageElements.email)
      .clear()
    cy.get(loginPageElements.password)
      .clear()
    cy.get(loginPageElements.submit)
      .click()
    cy.get(loginPageElements.error)
    cy.wait('@loginErrorMessage')
  })

  it('Login with username only', () => {
    cy.intercept('POST', '/users/login')
    .as('loginErrorMessage1')
    cy.visit('/')
    cy.get(loginPageElements.email)
      .type('sretenovicue@gmail.com')
    cy.get(loginPageElements.password)
      .clear()
    cy.get(loginPageElements.submit)
      .click()
    cy.loginShould()
    cy.wait('@loginErrorMessage1')
  })

  it('Login with password only', () => {
    cy.intercept('POST', '/users/login')
    .as('loginErrorMessage2')
    cy.visit('/')
    cy.get(loginPageElements.email)
    .clear
    cy.loginInputPassword()
    cy.loginShould()
    cy.wait('@loginErrorMessage2')
  })

  it('Login with wrong password', () => {
   cy.intercept('POST', '/users/login')
    .as('loginErrorMessage2')
    cy.visit('/')
    cy.get(loginPageElements.email)
    .type('sretenovicue@gmail.com')
    cy.loginInputPasswordInvalid()
    cy.loginShould()
    cy.wait('@loginErrorMessage2')
  })

  it('Login with wrong username', () => {
    cy.intercept('POST', '/users/login')
    .as('loginErrorMessage2')
    cy.visit('/')
    cy.get(loginPageElements.email)
    .type('sretenov@gmail.com')
    cy.loginInputPassword()
    cy.wait('@loginErrorMessage2')
  })



  it('Login - happy path', () => {
    cy.visit('/')
    cy.get(loginPageElements.email)
      .type('sretenovicue@gmail.com')
    cy.loginInputPassword()
    cy.get('h1')
      .should('have.text', 'Contact List')
    cy.get('#logout')
      .click()


  })




})





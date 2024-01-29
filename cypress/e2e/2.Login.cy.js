import { loginPageElements } from '../support/Pom/loginPageElements'

///    <reference types="cypress"/>


describe('Login', () => {
  it('Login without entering credentials', () => {
    cy.visit('https://thinking-tester-contact-list.herokuapp.com/')
    cy.get('[class="welcome-message"]')
      .eq(0)
      .should('contain', 'Welcome! This application is for testing purposes only. The database will be purged as needed to keep costs down.')
      .and('have.css', 'color', 'rgb(66, 135, 245)')
    cy.get('[class="welcome-message"]').eq(1)
      .should('contain', 'The API documentation can be found')
    cy.get(loginPageElements.email)
      .clear()
    cy.get(loginPageElements.password)
      .clear()
    cy.get(loginPageElements.submit)
      .click()
    cy.get(loginPageElements.error)

  })

  it('Login without username', () => {
    cy.visit('/')
    cy.get(loginPageElements.email)
      .type('sretenovicue@gmail.com')
    cy.get(loginPageElements.password)
      .clear()
    cy.get(loginPageElements.submit)
      .click()
    cy.loginShould()

  })

  it('Login without password', () => {
    cy.visit('/')
    cy.get(loginPageElements.email)
      .clear
    cy.loginInputPassword()
    cy.loginShould()

  })

  it('Login with wrong password', () => {
    cy.visit('/')
    cy.get(loginPageElements.email)
      .clear
    cy.loginInputPassword()
    cy.loginShould()
  })

  it('Login with wrong username', () => {
    cy.visit('/')
    cy.get(loginPageElements.email)
      .clear
    cy.loginInputPassword()
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





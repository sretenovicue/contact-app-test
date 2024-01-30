///    <reference types="cypress"/>

import { contactFormElements } from '../support/Pom/contactFormElements'

describe('Contact Form', () => {

    beforeEach('contactForm', () => {
        cy.Login()
    })

    it('Contact List Header', () => {
        cy.get('h1')
            .should('have.text', 'Contact List')
        cy.contains('p', 'Click on any contact to view the Contact Details')

    })


    it('Contact List Buttons', () => {
        cy.get(contactFormElements.addContact)
            .should('have.text', 'Add a New Contact')
            .and('not.be.disabled')
            .and('have.css', 'color', 'rgb(0, 0, 0)')
            .click()
        cy.get(contactFormElements.main)
            .find('button')
            .eq(2).click()
        cy.get(contactFormElements.logoutButton)
            .should('have.text', 'Logout')
            .and('not.be.disabled')
            .and('have.css', 'color', 'rgb(0, 0, 0)')
    })


    it('Contact List Footer', () => {
        cy.contains('p', 'Created by Kristin Jackvony, Copyright 2021')
            .and('have.css', 'color', 'rgb(136, 136, 136)')
        cy.get(contactFormElements.picture)


    })

    it('Contact List lengh', () => {
        cy.get('[class="contactTableHead"]')
        .find('tr')
        .children()
            .then(table => {
                expect(table)
                .to
                .have
                .length(7)
            })


    })




})



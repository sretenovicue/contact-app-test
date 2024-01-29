///    <reference types="cypress"/>

import { bodyObject } from '../support/Pom/apiBodyObject'

describe('API Testing', () => {
    it('Add new Contact', () => {
        //cy.Login()
        const userCredentials = {
            "email": "sretenovicue@gmail.com",
            "password": "Bsr@enovic25"
        }
        cy.request('POST', 'https://thinking-tester-contact-list.herokuapp.com/users/login', userCredentials)
            .its('body')
            .then(body => {
                console.log(body)
                const token = body.token

                cy.request({
                    url: 'https://thinking-tester-contact-list.herokuapp.com/contacts',
                    headers: { 'Authorization': 'Bearer ' + token },
                    method: 'POST',
                    body: bodyObject
                })
                    .then(response => {
                        expect(response.status).to.equal(201)
                        expect(response.body).to.haveOwnProperty('firstName')


                    })





                    
            })
    })
})




    
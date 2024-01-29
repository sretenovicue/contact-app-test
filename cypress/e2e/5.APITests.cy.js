///    <reference types="cypress"/>

import { bodyObject } from '../support/Pom/apiBodyObject'
import { userCredentials } from '../support/Pom/apiUserCredentials'

describe('API Testing', () => {
    it('Add new Contact', () => {
        cy.request('POST', '/users/login', userCredentials)
            .its('body')
            .then(body => {
                console.log(body)
                const token = body.token
                cy.request({
                    url: '/contacts',
                    headers: { 'Authorization': 'Bearer ' + token },
                    method: 'POST',
                    body: bodyObject
                })
                    .then(response => {
                        expect(response.status)
                            .to.equal(201)
                        expect(response.body)
                            .to.haveOwnProperty('firstName')

                    })
            })
    })

    it.only('Get Contact List', () => {
        cy.intercept('POST', '/contacts', { fixture: 'apiFixture.json'})
        .as('contacts')
        cy.request('POST', '/users/login', userCredentials)
            .its('body')
            .then(body => {
                console.log(body)
                const token = body.token
                cy.request({
                    url: '/contacts',
                    headers: { 'Authorization': 'Bearer ' + token },
                    method: 'GET'
                })
                    .then(response => {
                        expect(response.status)
                            .to.equal(200)
                    }).then(response => {
                        const expectedLength = response.body.length;
                        expect(response.body.length).to.equal(expectedLength);

                    })
            })
    })

    it('Add New User', () => {
        cy.request('POST', '/users/login', userCredentials)
            .its('body')
            .then(body => {
                console.log(body)
                const token = body.token
                const bodyObjectPost = {

                    "firstName": "Tester",
                    "lastName": "User",
                    "email": `testuser${Date.now()}@example.com`,
                    "password": "myPassword"
                }

                cy.request({
                    url: '/users',
                    headers: { 'Authorization': 'Bearer ' + token },
                    method: 'POST',
                    body: bodyObjectPost
                }).then(response => {
                    expect(response.status)
                        .to.equal(201)
                    expect(response.body)
                        .to.be.an('object')
                })


            })
        })

    
    it('Delete Contact', () => {
        cy.request('POST', '/users/login', userCredentials)
            .its('body')
            .then(body => {
                console.log(body)
                const token = body.token
                cy.request({

                    url: 'https://thinking-tester-contact-list.herokuapp.com/contacts',
                    headers: { 'Authorization': 'Bearer ' + token },
                    method: 'GET'
                })
                    .then(response => {
                        const recordIdsToDelete = response.body.map(record => record.id);
                        recordIdsToDelete.forEach(id => {
                            cy.request({
                                url: `https://thinking-tester-contact-list.herokuapp.com/contacts/${id}`,
                                headers: { 'Authorization': 'Bearer ' + token },
                                method: 'DELETE'
                            })
                                .then(deleteResponse => {
                                expect(deleteResponse.status).to.equal(200);



                                })
                        })

                    })
            })
        })
    })
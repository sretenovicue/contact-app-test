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

    it('Get Contact List', () => {
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

    it('Get User Profile', () => {
        cy.request('POST', '/users/login', userCredentials)
            .its('body')
            .then(body => {
                console.log(body)
                const token = body.token
                cy.request({

                    url: 'users/me',
                    headers: { 'Authorization': 'Bearer ' + token },
                    method: 'GET'
                })
                .then( response => {
                    expect( response.status )
                        .to.equal(200)
                    expect(response.body)
                        .to.be.an('object')
                        expect(response.body)
                        .to.haveOwnProperty('email')
                     
                                })
                        })

                    })
        // Kod je zakomentarisan jer updateom postojeceg korisnika 'gubim' token za autorizaciju. 
                    // it('Update User', () => {
                    //     cy.request('POST', '/users/login', userCredentials)
                    //         .its('body')
                    //         .then(body => {
                    //             console.log(body)
                    //             const token = body.token
                    //             const bodyObjectUpdate = {

                    //                     "firstName": "Mitar",
                    //                     "lastName": "Username.unique",
                    //                     "email": `testuser${Date.now()}@example.com`,
                    //                     "password": "myNewPassword"

                    //                                         }
                    //             cy.request({

                    //                 url: 'users/me',
                    //                 headers: { 'Authorization': 'Bearer ' + token },
                    //                 method: 'PATCH',
                    //                 body: bodyObjectUpdate
                                    
        //                         })
        //     //                     .then( response => {
        //     //                         expect( response.status )
        //     //                             .to.equal(200)
        //     //                         expect(response.body)
        //     //                             .to.be.an('object')
        //     //                             expect(response.body)
        //     //                             .to.haveOwnProperty('email')
        //     // })
        // })
    })

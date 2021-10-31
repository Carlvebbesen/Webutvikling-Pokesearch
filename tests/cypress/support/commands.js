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

Cypress.Commands.add('type_filter', (types) => {
    cy.get('[data-cy=type-selector]').click();
    types.forEach((type) => {
        cy.get(`[data-cy=type-option-${type}]`).click();
    })
    cy.get('[role=presentation]').click();
})

Cypress.Commands.add('verify_stat_sort_descending', (stat, stat_index) => {
    cy.get(`[data-cy=${stat}]`).click();
        let prevStatValue = 10000
        cy.get(`[data-cy=stat_${stat_index}]`).each((item, index, list) => {
            expect(prevStatValue).to.be.at.least(parseInt(Cypress.$(item).text()));
            prevStatValue = parseInt(Cypress.$(item).text());
        })
})

Cypress.Commands.add('verify_stat_sort_ascending', (stat, stat_index) => {
    cy.get(`[data-cy=${stat}]`).click();
    cy.get(`[data-cy=${stat}]`).click();
        let prevStatValue = 0
        cy.get(`[data-cy=stat_${stat_index}]`).each((item, index, list) => {
            expect(parseInt(Cypress.$(item).text())).to.be.at.least(parseInt(Cypress.$(item).text()));
            prevStatValue = parseInt(Cypress.$(item).text());
        })
})

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

Cypress.Commands.add('set_pokemon_per_page', (amount) => {
    cy.get('[data-cy=pagination-table]').find('[aria-haspopup=listbox]').click();
    cy.get(`[data-value=${amount}]`).click();
})

Cypress.Commands.add('type_filter', (types) => {
    cy.get('[data-cy=type-selector]').click();
    types.forEach((type) => {
        cy.get(`[data-cy=type-option-${type}]`).click();
    })
    cy.get('[role=presentation]').click(20, 20);
})

Cypress.Commands.add('verify_stat_sort_descending', (stat, stat_index) => {
    cy.get(`[data-cy=${stat}]`).click({force: true});
    cy.wait(500);
    let prevStatValue = 10000
    cy.get(`[data-cy=stat_${stat_index}]`).each((item, index, list) => {
        expect(prevStatValue).to.be.at.least(parseInt(Cypress.$(item).text()));
        prevStatValue = parseInt(Cypress.$(item).text());
    })
})

Cypress.Commands.add('verify_stat_sort_ascending', (stat, stat_index) => {
    cy.get(`[data-cy=${stat}]`).click({force: true});
    cy.get(`[data-cy=${stat}]`).click({force: true});
    cy.wait(500)
    let prevStatValue = 0
    cy.get(`[data-cy=stat_${stat_index}]`).each((item, index, list) => {
        expect(parseInt(Cypress.$(item).text())).to.be.at.least(parseInt(Cypress.$(item).text()));
        prevStatValue = parseInt(Cypress.$(item).text());
    })
})

Cypress.Commands.add('add_pokemon_to_current_team', (pokemonName) => {
    cy.get('[data-cy=name_input]').find('input').clear();
    cy.get('[data-cy=name_input]').type(pokemonName);
    cy.tick(200);
    cy.get(`[data-cy=${pokemonName}]`).click();
    cy.get('[data-cy=add-pokemon-to-team]').click();
})

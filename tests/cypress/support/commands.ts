
declare namespace Cypress {
    interface Chainable<Subject> {
      set_pokemon_per_page(amount: number): Cypress.Chainable<JQuery>;
      type_filter(types: string[]): Cypress.Chainable<JQuery>;
      verify_stat_sort_descending(stat: string, stat_index: number): Cypress.Chainable<JQuery>;
      verify_stat_sort_ascending(stat: string, stat_index: number): Cypress.Chainable<JQuery>;
      add_pokemon_to_current_team(pokemonName: string): Cypress.Chainable<JQuery>;
    }
  }

Cypress.Commands.add('set_pokemon_per_page', (amount: number): Cypress.Chainable<JQuery> => {
    cy.get('[data-cy=pagination-table]').find('[aria-haspopup=listbox]').click();
    return cy.get(`[data-value=${amount}]`).click();
})

Cypress.Commands.add('type_filter', (types: string[]): Cypress.Chainable<JQuery> => {
    cy.get('[data-cy=type-selector]').click();
    types.forEach((type: string) => {
        cy.get(`[data-cy=type-option-${type}]`).click();
    })
    return cy.get('[role=presentation]').click(20, 20);
})

Cypress.Commands.add('verify_stat_sort_descending', (stat: number, stat_index: number): Cypress.Chainable<JQuery> => {
    cy.get(`[data-cy=${stat}]`).click({force: true});
    cy.wait(500);
    let prevStatValue = 10000
    return cy.get(`[data-cy=stat_${stat_index}]`).each((item, index, list) => {
        expect(prevStatValue).to.be.at.least(parseInt(Cypress.$(item).text()));
        prevStatValue = parseInt(Cypress.$(item).text());
    })
})

Cypress.Commands.add('verify_stat_sort_ascending', (stat: number, stat_index: number): Cypress.Chainable<JQuery> => {
    cy.get(`[data-cy=${stat}]`).click({force: true});
    cy.get(`[data-cy=${stat}]`).click({force: true});
    cy.wait(500)
    let prevStatValue = 0
    return cy.get(`[data-cy=stat_${stat_index}]`).each((item, index, list) => {
        expect(parseInt(Cypress.$(item).text())).to.be.at.least(parseInt(Cypress.$(item).text()));
        prevStatValue = parseInt(Cypress.$(item).text());
    })
})

Cypress.Commands.add('add_pokemon_to_current_team', (pokemonName: string): Cypress.Chainable<JQuery> => {
    cy.get('[data-cy=name_input]').find('input').clear();
    cy.get('[data-cy=name_input]').type(pokemonName);
    cy.tick(200);
    cy.get(`[data-cy=${pokemonName}]`).click();
    return cy.get('[data-cy=add-pokemon-to-team]').click();
})

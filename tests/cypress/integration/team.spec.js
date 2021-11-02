describe("Verify team functionality", () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/prosjekt3/');
    })

    it("Test adding a pokemon to the team", () => {
        cy.add_pokemon_to_current_team('sceptile');
        cy.get('[data-cy=team-sceptile]');
        cy.get('[data-cy=close-popup]').click();

        cy.add_pokemon_to_current_team('arcanine');
        cy.get('[data-cy=team-sceptile]');
        cy.get('[data-cy=team-arcanine]');
        cy.get('[data-cy=close-popup]').click();

        cy.add_pokemon_to_current_team('braviary');
        cy.get('[data-cy=team-sceptile]');
        cy.get('[data-cy=team-arcanine]');
        cy.get('[data-cy=team-braviary]');
        cy.get('[data-cy=close-popup]').click();

        cy.add_pokemon_to_current_team('gallade');

        cy.get('[data-cy=team-sceptile]');
        cy.get('[data-cy=team-arcanine]');
        cy.get('[data-cy=team-braviary]');
        cy.get('[data-cy=team-gallade]');
        cy.get('[data-cy=close-popup]').click();

        cy.add_pokemon_to_current_team('snorlax');

        cy.get('[data-cy=team-sceptile]');
        cy.get('[data-cy=team-arcanine]');
        cy.get('[data-cy=team-braviary]');
        cy.get('[data-cy=team-gallade]');
        cy.get('[data-cy=team-snorlax]');
        cy.get('[data-cy=close-popup]').click();

        cy.add_pokemon_to_current_team('umbreon');

        cy.get('[data-cy=team-sceptile]');
        cy.get('[data-cy=team-arcanine]');
        cy.get('[data-cy=team-braviary]');
        cy.get('[data-cy=team-gallade]');
        cy.get('[data-cy=team-snorlax]');
        cy.get('[data-cy=team-umbreon]');
        cy.get('[data-cy=close-popup]').click();
    })

    it("Test submitting a team", () => {
        cy.add_pokemon_to_current_team('sceptile');
        cy.get('[data-cy=close-popup]').click();
        cy.add_pokemon_to_current_team('arcanine');
        cy.get('[data-cy=close-popup]').click();
        cy.add_pokemon_to_current_team('braviary');
        cy.get('[data-cy=close-popup]').click();
        cy.add_pokemon_to_current_team('gallade');
        cy.get('[data-cy=close-popup]').click();
        cy.add_pokemon_to_current_team('snorlax');
        cy.get('[data-cy=close-popup]').click();
        cy.add_pokemon_to_current_team('umbreon');
        cy.get('[data-cy=close-popup]').click();

        cy.get('[data-cy=nav-teams]').click();
        const uniqueNumber = parseInt(Math.random(1000000) * Math.random(1000000) * 1000000);
        cy.get('[data-cy=team-name-input]').type(`Team-from-testing-${uniqueNumber}`);
        cy.get('[data-cy=team-submit]').click();
        cy.clock();
        cy.tick(10000);
        cy.get(`[data-cy=team-Team-from-testing-${uniqueNumber}]`);
    })

    it("Test removing a pokemon from the team", () => {
        cy.add_pokemon_to_current_team('gallade');
        cy.get('[data-cy=trash-gallade]').click();
        cy.get('[data-cy=team-sceptile]').should('not.exist');
    })

    it("Test swap pokemon on the team", () => {
        cy.add_pokemon_to_current_team('mudkip');
        cy.get('[data-cy=close-popup]').click();
        cy.clock();
        cy.get('[data-cy=name_input]').find('input').clear();
        cy.get('[data-cy=name_input]').type('swampert');
        cy.tick(5000);
        cy.get(`[data-cy=swampert]`).click();
        cy.get('[data-cy=swap-mudkip]').click();
        cy.get('[data-cy=team-mudkip]').should('not.exist');
        cy.get('[data-cy=team-swampert]');
    })
})
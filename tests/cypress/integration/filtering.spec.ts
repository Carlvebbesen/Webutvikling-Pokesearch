describe('Verify filtering options renders correct pokemon', () => {

    beforeEach(() => {
        cy.clock();
        cy.visit('http://it2810-11.idi.ntnu.no/prosjekt3');
    })

    it("Verify resulting pokemon contain search input", () => {
        cy.get('[data-cy=name_input]').type("b");
        cy.tick(1000);
        cy.wait(500);
        let firstPagePokemons = {}
        cy.get('[data-cy=pokemon-name]').each((item, index, list) => {
            expect(Cypress.$(item).text()).to.match(/.*[bB].*/);
            firstPagePokemons[index] = (Cypress.$(item).text());
        });
        cy.get('[data-testid=KeyboardArrowRightIcon]').click();
        cy.get('[data-cy=pokemon-name]').each((item, index, list) => {
            expect(Cypress.$(item).text()).to.match(/.*[bB].*/);
        });
        cy.get('[data-testid=KeyboardArrowLeftIcon]').click();
        cy.wait(500);
        cy.get('[data-cy=pokemon-name]').each((item, index, list) => {
            expect(firstPagePokemons[index]).to.be.eq(Cypress.$(item).text());
        });
    })

    it('Verify resulting pokemon has correct type input', () => {
        cy.get('[data-cy=type-selector]').click();
        cy.get('[data-cy=type-option-electric]').click();
        cy.get('[role=presentation]').click();
        cy.get('[data-cy=type-container]').find('[data-cy=electric]').should('have.length', 10);
    })

    it('Verify resulting pokemon has both types from filter input', () => {
        cy.get('[data-cy=type-selector]').click();
        cy.get('[data-cy=type-option-grass]').click();
        cy.get('[data-cy=type-option-poison]').click();
        cy.get('[role=presentation]').click();

        cy.get('[data-cy=type-container]').find('[data-cy=grass]').should('have.length', 10);
        cy.get('[data-cy=type-container]').find('[data-cy=poison]').should('have.length', 10);
    })
})

describe('Verify filtering options renders correct pokemon', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/prosjekt3');
    })

    it("Verify resulting pokemon contain search input", () => {
        cy.clock();
        cy.get('[data-cy=name_input]').type("b");
        cy.tick(5000);
        let firstPagePokemons = []
        cy.get('[data-cy=pokemon-name]').each((item, index, list) => {
            expect(Cypress.$(item).text()).to.match(/^B/);
            firstPagePokemons.push(Cypress.$(item).text());
        });
        cy.get('[data-testid=KeyboardArrowRightIcon]').click();
        cy.get('[data-cy=pokemon-name]').each((item, index, list) => {
            expect(Cypress.$(item).text()).to.match(/^B/);
        });
        cy.get('[data-testid=KeyboardArrowLeftIcon]').click();
        cy.get('[data-cy=pokemon-name]').each((item, index, list) => {
            expect(firstPagePokemons[index]).to.be.eq(Cypress.$(item).text());
        });
    })

    it('Verify resulting pokemon has correct type input', () => {
        cy.get('[data-cy=type-selector]').click();
        cy.get('[data-cy=type-option-electric]').click();
        cy.get('[data-cy=type-container]').find('[data-cy=electric]').should('have.length', 50);

        cy.get('[data-cy=type-option-electric]').click();
        cy.get('[data-cy=type-option-grass]').click();
        cy.get('[data-cy=type-option-poison]').click();

        cy.get('[data-cy=type-container]').find('[data-cy=grass]').should('have.length', 16);
        cy.get('[data-cy=type-container]').find('[data-cy=poison]').should('have.length', 16);
    })
})

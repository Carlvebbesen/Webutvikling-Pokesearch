describe("Verify filtering gives correct pokemon", () => {

    beforeEach(() => {
        cy.visit('http://it2810-11.idi.ntnu.no/prosjekt3/');
    })

    it("Test filter on name", () => {
        cy.clock();
        cy.get('[data-cy=name_input]').type("b");
        cy.tick(5000);

        cy.get('[data-cy=pokemon]').each((item, index, list) => {
            expect(Cypress.$(item)).to.match(/^B/);
        })
    })

    it("Test filter on type", () => {
        cy.get('[data-cy=type-selector]').click();
        cy.get('[data-cy=poison]').click();
        cy.get('[data-cy=grass]').click();

        cy.get('[data-cy=pokemon').find('[data-cy=grass]').to.have.length(16);
        cy.get('[data-cy=pokemon').find('[data-cy=poison]').to.have.length(16);
    })
})

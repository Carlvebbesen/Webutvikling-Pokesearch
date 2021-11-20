describe("Verify that a pokemon recieves rating", () => {
    
    beforeEach(() => {
        cy.visit('http://it2810-11.idi.ntnu.no/prosjekt3');
    })

    it("Test user gives rating", () => {
        cy.get('[data-cy=blastoise]').click();
        cy.get('[data-cy=rating-input]').find('[name=simple-controlled]').each((item, index, list) => {
            if (index === 2) {
                Cypress.$(item).trigger('click');
            }
        });
        cy.get('[data-cy=rating-submit]').click();
    })
})

describe("Verify that a pokemon recieves rating", () => {
    
    beforeEach(() => {
        cy.visit('http://localhost:3000/prosjekt3');
    })

    it("Test user gives rating", () => {
        cy.get('[data-cy=blastoise]').click();
        cy.get('[data-cy=rating-input]').find('[name=simple-controlled]').each((item, index, list) => {
            if (index === 2) {
                Cypress.$(item).click();
            }
        });
        cy.get('[data-cy=rating-submit]').click();
    })
})

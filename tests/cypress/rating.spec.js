describe("Verify that a pokemon recieves rating", () => {
    
    beforeEach(() => {
        cy.visit('http://it2810-11.idi.ntnu.no/prosjekt3/');
    })

    it("Test user gives rating", () => {
        cy.get('[data-cy=rating_input]').click();

        cy.get('[data-cy=rating_submit]').click();
    })
})

describe("Verify that pokemon is correctly sorted", () => {
    
    beforeEach(() => {
        cy.visit('http://it2810-11.idi.ntnu.no/prosjekt3/');
    })

    it("Test sort on stats", () => {
        cy.get('[data-cy=hp]').click();
        let previousValue = 10000
        cy.get('[data-cy=stat_0]').each((item, index, list) => {
            expect(previousValue).to.be.at.least(parseInt(Cypress.$(item).text()));
            previousValue = parseInt(Cypress.$(item).text());
        })

        cy.get('[data-cy=attack]').click();
        previousValue = 10000
        cy.get('[data-cy=stat_1]').each((item, index, list) => {
            expect(previousValue).to.be.at.least(parseInt(Cypress.$(item).text()));
            previousValue = parseInt(Cypress.$(item).text());
        })

        cy.get('[data-cy=defense]').click();
        previousValue = 10000
        cy.get('[data-cy=stat_2]').each((item, index, list) => {
            expect(previousValue).to.be.at.least(parseInt(Cypress.$(item).text()));
            previousValue = parseInt(Cypress.$(item).text());
        })

        cy.get('[data-cy=special-attack]').click();
        previousValue = 10000
        cy.get('[data-cy=stat_3]').each((item, index, list) => {
            expect(previousValue).to.be.at.least(parseInt(Cypress.$(item).text()));
            previousValue = parseInt(Cypress.$(item).text());
        })

        cy.get('[data-cy=special-defense]').click();
        previousValue = 10000
        cy.get('[data-cy=stat_4]').each((item, index, list) => {
            expect(previousValue).to.be.at.least(parseInt(Cypress.$(item).text()));
            previousValue = parseInt(Cypress.$(item).text());
        })

        cy.get('[data-cy=speed]').click();
        previousValue = 10000
        cy.get('[data-cy=stat_5]').each((item, index, list) => {
            expect(previousValue).to.be.at.least(parseInt(Cypress.$(item).text()));
            previousValue = parseInt(Cypress.$(item).text());
        })

        cy.get('[data-cy=total]').click();
        previousValue = 10000
        cy.get('[data-cy=stat_6]').each((item, index, list) => {
            expect(previousValue).to.be.at.least(parseInt(Cypress.$(item).text()));
            previousValue = parseInt(Cypress.$(item).text());
        })
    })
})
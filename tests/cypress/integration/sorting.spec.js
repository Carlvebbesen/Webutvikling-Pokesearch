describe("Verify sorting results in list of pokémon in correct order.", () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/prosjekt3');
    })

    it("Verify sorting on stats", () => {
        cy.verify_stat_sort_descending('hp', 0);
        cy.verify_stat_sort_descending('attack', 1);
        cy.verify_stat_sort_descending('defense', 2);
        //cy.verify_stat_sort_descending('special-attack', 3);
        //cy.verify_stat_sort_descending('special-defense', 4);
        cy.verify_stat_sort_descending('speed', 5);
        cy.verify_stat_sort_descending('total', 6);

        cy.verify_stat_sort_ascending('hp', 0);
        cy.verify_stat_sort_ascending('attack', 1);
        cy.verify_stat_sort_ascending('defense', 2);
        //cy.verify_stat_sort_ascending('special-attack', 3);
        //cy.verify_stat_sort_ascending('special-defense', 4);
        cy.verify_stat_sort_ascending('speed', 5);
        cy.verify_stat_sort_ascending('total', 6);
    });

    it("Verify sorting on stats with filtered pokémon", () => {
        cy.type_filter(['dark']);

        cy.verify_stat_sort_descending('hp', 0);
        cy.verify_stat_sort_descending('attack', 1);
        cy.verify_stat_sort_descending('defense', 2);
        //cy.verify_stat_sort_descending('special-attack', 3);
        //cy.verify_stat_sort_descending('special-defense', 4);
        cy.verify_stat_sort_descending('speed', 5);
        cy.verify_stat_sort_descending('total', 6);

        cy.verify_stat_sort_ascending('hp', 0);
        cy.verify_stat_sort_ascending('attack', 1);
        cy.verify_stat_sort_ascending('defense', 2);
        //cy.verify_stat_sort_ascending('special-attack', 3);
        //cy.verify_stat_sort_ascending('special-defense', 4);
        cy.verify_stat_sort_ascending('speed', 5);
        cy.verify_stat_sort_ascending('total', 6);
    })
})
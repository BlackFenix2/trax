describe("Playlist", () => {
  context("Playlist", () => {
    // // sign in
    before(() => {
      cy.visit("http://localhost:3000");
    });
    it("should navigate to a valid playlist", () => {
      cy.get("a").contains("Playlist #1").click();
      cy.url().should("include", "/playlist/2");
      cy.get("h2").should("contain", "Playlist #2");
    });
  });
});

export {};

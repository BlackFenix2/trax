/// <reference types="cypress"/>

context("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should render the sign in page on anonymous user", () => {
    cy.get("p").contains("insert logo here");
  });
});
export {};

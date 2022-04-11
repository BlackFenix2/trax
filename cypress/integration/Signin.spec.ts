/// <reference types="cypress"/>

import {} from "node:assert";

const user = {
  email: "user@test.com",
  password: "password",
};

const badUser = {
  email: "mehmen@msn.com",
  password: "1234",
};
describe("Sign in", () => {
  context("user is visiting the webpage for the first time", () => {
    // visit homepage, redirect to signin page with no cookie
    before(() => {
      // visit site
      cy.visit("http://localhost:3000");
    });

    beforeEach(() => {
      // get alias
      cy.get("input[type=email]").as("email");
      cy.get("input[type=password]").as("password");
    });

    afterEach(() => {
      cy.clearCookies();
      cy.get("@email").clear();
      cy.get("@password").clear();
      cy.get('div[role="alert"]').should("not.be.visible");
    });

    it("should render the sign in page on anonymous user", () => {
      cy.title().should("contain", "Sign in");
      cy.url().should("include", "/Signin");
      cy.get("h2").contains("Log in");
      cy.get("form").should("have.length", 1);
      cy.get("input").should("have.length", 2);
    });

    it("should require a email address (not blank)", () => {
      cy.get("button").contains("Log in").click();
      cy.get("@email")
        .invoke("prop", "validity")
        .its("valueMissing")
        .should("be.true");
    });

    it("should require valid email string (not verified)", () => {
      cy.get("@email").type("bademail");
      cy.get("@password").type(badUser.password);
      cy.get("button").contains("Log in").click();
      cy.get("@email")
        .invoke("prop", "validationMessage")
        .should("contain", "Please include an '@' in the email address.");
    });

    it("should enter an invalid email/password", () => {
      // intercept unauthorized response
      cy.intercept("POST", "/api/signin", {
        statusCode: 401,
        body: {
          error: "Email or password incorrect",
        },
      }).as("api");

      // type email/password
      cy.get("@email").type(badUser.email);
      cy.get("@password").type(badUser.password);

      // submit form
      cy.get("button").click();

      // check if alert is shown
      cy.get('div[role="alert"]').should("be.visible");
      cy.contains("Email or password incorrect");
      cy.get("@email").should("have.value", badUser.email);
      cy.get("@password").should("have.value", badUser.password);
    });

    it("should enter valid email address and password", () => {
      cy.intercept("POST", "/api/signin", {
        statusCode: 200,
        body: { id: "1", email: user.email },
      }).as("api");
      cy.get("@email").type(user.email);
      cy.get("@password").type(user.password);
      cy.get("button").click();
      cy.wait("@api");
      cy.url().should("include", "/");
    });
  });
});

export {};

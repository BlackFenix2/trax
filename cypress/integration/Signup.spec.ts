/// <reference types="cypress"/>

const user = {
  email: "user@test.com",
  password: "password",
};

const signupUser = {
  firstname: "john",
  lastname: "doe",
  email: "test@test.com",
  password: "1234",
  confirmPassword: "1234",
};

const badUser = {
  email: "mehmen@msn.com",
  password: "1234",
};
describe("Sign up", () => {
  before(() => {
    // visit site
    cy.visit("http://localhost:3000");

    // navigate to sign up page
    cy.get("a").contains("Sign Up").click();
  });

  beforeEach(() => {
    // get alias
    cy.get("input[placeholder='First Name']").as("firstname");
    cy.get("input[placeholder='Last Name']").as("lastname");
    cy.get("input[type=email]").as("email");
    cy.get("input[placeholder=Password]").as("password");
    cy.get("input[placeholder='Confirm password']").as("confirmPassword");
  });
  context("user is going to sign up on our webpage (Failure)", () => {
    // visit homepage, redirect to signin page with no cookie

    afterEach(() => {
      cy.get("@firstname").clear();
      cy.get("@lastname").clear();
      cy.get("@email").clear();
      cy.get("@password").clear();
      cy.get("@confirmPassword").clear();
      cy.get('div[role="alert"]').should("not.be.visible");
    });

    it("should render the sign up page on anonymous user", () => {
      cy.title().should("contain", "Sign up");
      cy.url().should("include", "/Signup");
      cy.get("h2").contains("Create an account");
      cy.get("form").should("have.length", 1);
      cy.get("input").should("have.length", 5);
    });

    it("should require a email address (not blank)", () => {
      cy.get("button").contains("Create account").click();
      cy.get("@email")
        .invoke("prop", "validity")
        .its("valueMissing")
        .should("be.true");
    });

    it("should require valid email string (not verified)", () => {
      cy.get("@email").type("bademail");
      cy.get("@password").type(badUser.password);
      cy.get("button").contains("Create account").click();
      cy.get("@email")
        .invoke("prop", "validationMessage")
        .should("contain", "Please include an '@' in the email address.");
    });

    it("should require a password (not blank)", () => {
      cy.get("@firstname").type(signupUser.firstname);
      cy.get("@lastname").type(signupUser.lastname);
      cy.get("@email").type(signupUser.email);
      cy.get("button").contains("Create account").click();
      cy.get("@password")
        .invoke("prop", "validity")
        .its("valueMissing")
        .should("be.true");
    });

    it("should check for non-matched passwords", () => {
      // type email/password
      cy.get("@email").type(badUser.email);
      cy.get("@password").type(badUser.password);
      cy.get("@confirmPassword").type("1rfjnfwhje fjwhe");

      // submit form
      cy.get("button").click();

      // check if alert is shown
      cy.get('div[role="alert"]').should("be.visible");
      cy.contains("Passwords do not match");
      cy.get("@email").should("have.value", badUser.email);
      cy.get("@password").should("have.value", badUser.password);
    });

    it("should not sign up user with existing email", () => {
      cy.intercept("POST", "/api/signup", {
        statusCode: 400,
        body: { error: "Email already in use" },
      }).as("api");
      cy.get("@firstname").type(signupUser.firstname);
      cy.get("@lastname").type(signupUser.lastname);
      cy.get("@email").type(user.email);
      cy.get("@password").type(user.password);
      cy.get("@confirmPassword").type(user.password);
      cy.get("button").click();
      cy.wait("@api");
    });
  });

  context("user is going to sign up on our webpage (Success)", () => {
    it("should sign up for an account", () => {
      cy.intercept("POST", "/api/signup", {
        statusCode: 200,
        body: {
          id: 1,
          firstname: signupUser.firstname,
          lastname: signupUser.lastname,
          email: signupUser.email,
        },
      }).as("api");
      cy.get("@firstname").type(signupUser.firstname);
      cy.get("@lastname").type(signupUser.lastname);
      cy.get("@email").type(signupUser.email);
      cy.get("@password").type(signupUser.password);
      cy.get("@confirmPassword").type(signupUser.password);
      cy.get("button").click();
      cy.wait("@api");
    });
  });
});

export {};

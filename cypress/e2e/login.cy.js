/*
  Login spec
  - should display login page correctyly
  - should display alert when email is empty
  - should display alert when password is empty
  - should dispay alert when username or password is invalid
  - should display threadpage when username and password is valid

*/
describe('login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctyly', () => {
    cy.get('input[placeholder="Email Address"]').should('be.visible');
    cy.get('input[placeholder="Enter Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });
  it('should display alert when email is empty', () => {
    // click login button without typing username
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // verified window alert for show message from API
    cy.on('window:alert', (text) => {
      expect(text).to.equal('"email" is not allowed to be empty');
    });
  });
  it('should display alert when password is empty', () => {
    // fill email
    cy.get('input[placeholder="Email Address"]').type('hendriwp123@gmail.com');
    // click login button without typing password
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // verified window alert for show message from API
    cy.on('window:alert', (text) => {
      expect(text).to.equal('"password" is not allowed to be empty');
    });
  });
  it('should display alert when username and password are wrong', () => {
    // fill email
    cy.get('input[placeholder="Email Address"]').type('hendriwp123@gmail.com');
    // fill password
    cy.get('input[placeholder="Enter Password"]').type('wrongpassword');
    // click login button
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // verified window alert for show message from API
    cy.on('window:alert', (text) => {
      expect(text).to.equal('email or password is wrong');
    });
  });
  it('should display threadpage when username and password is valid', () => {
    // fill email
    cy.get('input[placeholder="Email Address"]').type('hendriwp123@gmail.com');

    // fill password
    cy.get('input[placeholder="Enter Password"]').type('hendri123');

    // click button login
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // verified element should be on homepage
    cy.get('img[alt="Avatar Profile"]').should('be.visible');
    cy.get('.avatar-menu').click();
    cy.get('button').contains('Logout').should('be.visible');
  });
});

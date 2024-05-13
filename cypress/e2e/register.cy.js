import randomstring from 'randomstring';
/*
    Register spec
    - should display register page correctyly
    - should display alert when name is empty
    - should display alert when email is empty
    - should display alert when password is empty
    - should display alert when username registered already
    - should display login page when username and password is not registered already
*/

const randomString = randomstring.generate({
  length: 5,
  charset: 'alphabetic',
});
const now = +new Date();

describe('register spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/register');
  });
  it('should display register page correctyly', () => {
    cy.get('input[placeholder="Name"]').should('be.visible');
    cy.get('input[placeholder="Email Address"]').should('be.visible');
    cy.get('input[placeholder="Enter Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Sign Up$/)
      .should('be.visible');
  });
  it('should display alert when name is empty', () => {
    // click register button without typing name
    cy.get('button')
      .contains(/^Sign Up$/)
      .click();

    cy.on('window:alert', (text) => {
      expect(text).to.equal('"name" is not allowed to be empty');
    });
  });

  it('should display alert when email is empty', () => {
    // fill name
    cy.get('input[placeholder="Name"]').type('Pow');
    // click register button without typing email
    cy.get('button')
      .contains(/^Sign Up$/)
      .click();

    cy.on('window:alert', (text) => {
      expect(text).to.equal('"email" is not allowed to be empty');
    });
  });
  it('should display alert when password is empty', () => {
    // fill name
    cy.get('input[placeholder="Name"]').type('Pow');
    // fill email
    cy.get('input[placeholder="Email Address"]').type('pow@gmail.com');
    // click register button without typing password
    cy.get('button')
      .contains(/^Sign Up$/)
      .click();

    cy.on('window:alert', (text) => {
      expect(text).to.equal('"password" is not allowed to be empty');
    });
  });
  it('should display alert when username registered already', () => {
    // fill name
    cy.get('input[placeholder="Name"]').type('hendriwp');
    // fill email
    cy.get('input[placeholder="Email Address"]').type('hendriwp123@gmail.com');
    // fill password
    cy.get('input[placeholder="Enter Password"]').type('hendri123');
    // click register button
    cy.get('button')
      .contains(/^Sign Up$/)
      .click();

    cy.on('window:alert', (text) => {
      expect(text).to.equal('email is already taken');
    });
  });
  it('should display login page when username and password is not registered already', () => {
    cy.get('input[placeholder="Name"]').type(randomString);
    cy.get('input[placeholder="Email Address"]').type(
      `${randomString.concat(now)}@gmail.com`,
    );
    cy.get('input[placeholder="Enter Password"]').type(randomString);
    cy.get('button')
      .contains(/^Sign Up$/)
      .click();
    cy.visit('http://localhost:5173/login');
  });
});

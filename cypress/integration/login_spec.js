describe('Login', () => {
  beforeEach(() => {
    cy.visit('/auth/signin');
  });

  it('should not log in', () => {
    cy.get('input#email').type('rsitdikov@datanyze.com');
    cy.get('input#password').type('datanyzeZ');
    cy.get('button.submit-sign-in').click();
    cy.get('p.error-message').should('contain', 'The password is invalid or the user does not have a password.');
  });

  it('should successfully log in', () => {
    cy.get('input#email').type('rsitdikov@datanyze.com');
    cy.get('input#password').type('datanyze');
    cy.get('button.submit-sign-in').click();
    cy.get('.menu-block').should('contain', 'Log out');
  });
});

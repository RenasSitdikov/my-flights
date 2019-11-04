describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display a log in link', () => {
    cy.get('.text-block').should('contain', 'Log in');
  });

  it('should redirect to login page', () => {
    cy.get('.text-block').contains('Log in').click();
    cy.url().should('include', '/auth/signin');
  });

  it('should display a sign up link', () => {
    cy.get('.text-block').should('contain', 'Sign up');
  });

  it('should redirect to sign up', () => {
    cy.get('.text-block').contains('Sign up').click();
    cy.url().should('include', '/auth/signup');
  });
});

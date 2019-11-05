describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should redirect to login page', () => {
    // Arrange
    // Act
    cy.get('[data-cy=start-page-text-block]').contains('Log in').click();
    // Assert
    cy.url().should('include', '/auth/signin');
  });

  it('should redirect to sign up', () => {
    // Arrange
    // Act
    cy.get('[data-cy=start-page-text-block]').contains('Sign up').click();
    // Assert
    cy.url().should('include', '/auth/signup');
  });
});

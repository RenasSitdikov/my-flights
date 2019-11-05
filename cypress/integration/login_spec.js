describe('Login', () => {
  beforeEach(() => {
    cy.visit('/auth/signin');
  });

  // work with data-test-id

  it('should not log in', () => {
    // Arrange
    cy.get('[data-cy=email]').type('rsitdikov@datanyze.com');
    cy.get('[data-cy=password]').type('datanyzeZ');
    // Act
    cy.get('[data-cy=submit-sign-in]').click();
    // Assert
    cy.get('[data-cy=error-message]')
      .should('contain', 'The password is invalid or the user does not have a password.')
      .should('have.css', 'color')
      .and('match', /rgb\(255, 0, 0\)/);
  });

  it('should successfully log in', () => {
    // Arrange
    cy.get('[data-cy=email]').type('rsitdikov@datanyze.com');
    cy.get('[data-cy=password]').type('datanyze');
    // Act
    cy.get('[data-cy=submit-sign-in]').click();
    // Assert
    cy.get('[data-cy=menu-block]').should('contain', 'Log out');
  });
});

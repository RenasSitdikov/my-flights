describe('Header', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display sidenav after burger click and hidden after one more click', () => {
    // Arrange
    // Act
    cy.get('[data-cy=toolbar]').get('[data-cy=burger]').click();
    // Assert
    cy.get('[data-cy=sidenav]')
      .should('be.visible')
      .should('have.css', 'visibility')
      .and('match', /visible/);
  });
});

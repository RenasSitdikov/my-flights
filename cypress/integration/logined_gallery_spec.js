describe('Gallery', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show Airbus A350 in Gallery', () => {
    // Arrange
    // Act
    cy.get('.menu-block').contains('Gallery').click();
    // Assert
    cy.url().should('include', '/flights-gallery');
    cy.get('[data-cy=gallery-container]')
      .contains('[data-cy=card-title]', 'Airbus A350')
      .should('have.css', 'font-size')
      .and('match', /20px/);
  });
});

describe('Gallery', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show gallery link', () => {
    cy.get('.menu-block').should('contain', 'Gallery');
  });

  it('should show Airbus A350 in Gallery', () => {
    cy.get('.menu-block').contains('Gallery').click();
    cy.url().should('include', '/flights-gallery');
    cy.get('.gallery-container').should('contain', 'Airbus A350');
  });
});

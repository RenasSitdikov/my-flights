describe('Header', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display an app name', () => {
    cy.get('.app-name').should('contain', 'My Flights App');
  });

  it('should have register and login link in sidenav', () => {
    cy.get('mat-sidenav').should('contain', 'Register');
    cy.get('mat-sidenav').should('contain', 'Log in');
  });

  it('should display sidenav after burger click and hidden after one more click', () => {
    cy.get('mat-toolbar').get('.burger').click();
    cy.get('mat-sidenav')
      .should('be.visible')
      .should('have.css', 'visibility')
      .and('match', /visible/);
    cy.get('mat-toolbar').get('.burger').click();
    cy.get('mat-sidenav')
      .should('have.css', 'visibility')
      .and('match', /hidden/);
  });
});

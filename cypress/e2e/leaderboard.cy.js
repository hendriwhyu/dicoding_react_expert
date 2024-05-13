/*
    Leaderboard spec
    - should display leaderboard page
    - when user login should open leaderboard page
*/

describe('Leaderboard spec', () => {
  it('should display leaderboards page', () => {
    cy.visit('http://localhost:5173/leaderboards');
    cy.get('h1').contains('Leaderboard 🏆').should('be.visible');
  });
});

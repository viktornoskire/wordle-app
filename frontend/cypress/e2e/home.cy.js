describe('template spec', () => {
  it('passes', () => {
    expect(true).to.equal(true);
  });

  it('is the correct port', () => {
    cy.visit('http://localhost:5173/');
    cy.location().should(loq => {
      expect(loq.host).to.eq('localhost:5173');
    });
  });
});

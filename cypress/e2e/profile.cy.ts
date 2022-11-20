describe('empty spec', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('Open App', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('termintool.vercel.app');
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.p-1 > .w-full').select('Köln');
    cy.get('#s-0 > .bg-gradient-to-r').click();

    /* ==== Generated with Cypress Studio ==== */
    cy.get('.xl\\:grid-cols-2 > :nth-child(1) > :nth-child(2) > :nth-child(2) > :nth-child(31) > .bg-gradient-to-r').click();
    cy.get('.xl\\:grid-cols-2 > .overflow-auto > .flex-col > :nth-child(3) > .bg-white > .text-center').click();
    cy.get(':nth-child(3) > .border-2').click();
    cy.get('.container > :nth-child(1) > .gap-4 > .bg-gradient-to-r').click();
    /* ==== End Cypress Studio ==== */
  });
})
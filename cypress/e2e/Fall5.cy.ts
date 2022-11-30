describe('empty spec', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('Fall 5', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('develop-termintool.vercel.app');
    cy.get('.overflow-hidden').click();
    cy.get('.hidden > .w-1\\/2.p-2 > .rounded').click();
    cy.get('[placeholder="Email"]').clear('s');
    cy.get('[placeholder="Email"]').type('s1nlows@googlemail.com');
    cy.get('[placeholder="Password"]').clear();
    cy.get('[placeholder="Password"]').type('f,f4gf,f4g{enter}');
    cy.get('.flex-grow > .flex > .text-slate-100').click();
    cy.get(':nth-child(7) > :nth-child(1) > .font-bold').click();
    cy.get(':nth-child(7) > :nth-child(1) > .font-bold').click();
    cy.get(':nth-child(9) > :nth-child(1) > .text-center').click();
    cy.get(':nth-child(9) > :nth-child(1) > .text-center').click();
    cy.get(':nth-child(9) > :nth-child(1) > .text-center').click();
    cy.get(':nth-child(2) > :nth-child(1) > .text-center').click();
    cy.get(':nth-child(2) > :nth-child(1) > .text-center').click();
    cy.get(':nth-child(2) > :nth-child(1) > .text-center').click();
    cy.get(':nth-child(2) > :nth-child(1) > .text-center').click();
    cy.get('.overflow-y-scroll > :nth-child(2) > :nth-child(1) > .font-bold').click();
    cy.get('.overflow-y-scroll > :nth-child(2) > :nth-child(1) > .font-bold').click();
    cy.get('.overflow-y-scroll > :nth-child(2) > :nth-child(2)').click();
    cy.get(':nth-child(2) > :nth-child(2) > .font-bold').click();
    cy.get(':nth-child(2) > :nth-child(2) > .font-bold').click();
    cy.get('.hidden > .w-1\\/2 > .rounded').click();
    /* ==== End Cypress Studio ==== */
  });
})
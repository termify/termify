describe('empty spec', () => {
  it('passes', () => {
    cy.visit('develop-termintool.vercel.app')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.mt-24 > .text-center').click();
    cy.get('.hidden > .w-1\\/2.p-2 > .rounded').click();
    cy.get('[placeholder="Email"]').clear();
    cy.get('[placeholder="Email"]').type('s1nlows@gmail.com');
    cy.get('[placeholder="Password"]').clear();
    cy.get('[placeholder="Password"]').type('f,f4gf,f4g');
    cy.get('.flex-grow > .flex > .text-slate-100').click();
    /* ==== End Cypress Studio ==== */
  })
})
describe('empty spec', () => {
  it('passes', () => {
    cy.visit('develop-termintool.vercel.app')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('Fall 4', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('develop-termintool.vercel.app');
    cy.get('.mt-24 > .text-center').click();
    cy.get('.hidden > .w-1\\/2.p-2 > .rounded').click();
    cy.get('[placeholder="Email"]').clear('s');
    cy.get('[placeholder="Email"]').type('s1nlows@googlemail.com');
    cy.get('[placeholder="Password"]').clear();
    cy.get('[placeholder="Password"]').type('f,f4gf,f4g{enter}');
    cy.get('.flex-grow > .flex > .text-slate-100').click();
    cy.get('.text-2xl > .bg-clip-text').click();
    cy.get('.p-1 > .w-full').select('Köln');
    cy.get('#s-1 > .bg-gradient-to-r').click();
    cy.get('.xl\\:grid-cols-2 > :nth-child(1) > .mt-8 > .flex > :nth-child(3) > .w-8').click();
    cy.get('.xl\\:grid-cols-2 > :nth-child(1) > :nth-child(2) > :nth-child(2) > :nth-child(15) > .bg-gradient-to-r').click();
    cy.get('.xl\\:grid-cols-2 > .overflow-auto > .flex-col > :nth-child(17) > .bg-indigo-50 > .text-center').click();
    cy.get(':nth-child(1) > .border-2').select('Personalausweis beantragen');
    cy.get('.w-full.justify-center > .bg-gradient-to-r').click();
    cy.get('.min-h-screen > .bg-slate-900').click();
    cy.get('.hidden > .w-1\\/2').click();
    /* ==== End Cypress Studio ==== */
  });
})
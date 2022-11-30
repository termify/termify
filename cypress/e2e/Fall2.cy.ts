describe('empty spec', () => {
  it('passes', () => {
    cy.visit('develop-termintool.vercel.app')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('Fall 2', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('develop-termintool.vercel.app');
    cy.get('.overflow-hidden > :nth-child(1)').click();
    cy.get('.hidden > .w-1\\/2.p-2 > .rounded').click();
    cy.get('[placeholder="Email"]').clear('s');
    cy.get('[placeholder="Email"]').type('s1nlows@googlemail.com');
    cy.get('[placeholder="Password"]').clear();
    cy.get('[placeholder="Password"]').type('f,f4gf,f4g{enter}');
    cy.get('.flex-grow > .flex > .text-slate-100').click();
    cy.get('.p-4 > :nth-child(4)').click();
    cy.get(':nth-child(4) > .px-2').clear();
    cy.get(':nth-child(4) > .px-2').type('Elisabethstraße 9');
    cy.get(':nth-child(5) > .px-2').clear();
    cy.get(':nth-child(5) > .px-2').type('00543');
    cy.get(':nth-child(6) > .px-2').clear();
    cy.get(':nth-child(6) > .px-2').type('Ganzegal');
    cy.get('.justify-center > .bg-gradient-to-r').click();
    cy.get('.hidden').click();
    cy.get('.hidden > .w-1\\/2').click();
    /* ==== End Cypress Studio ==== */
  });
})
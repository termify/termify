describe("empty spec", () => {
	it("passes", () => {
		cy.visit("develop-termintool.vercel.app");
	});

	/* ==== Test Created with Cypress Studio ==== */
	it("Fall 6", function () {
		/* ==== Generated with Cypress Studio ==== */
		cy.visit("develop-termintool.vercel.app");
		cy.get(".mt-24 > .text-center").click();
		cy.get(".hidden > .w-1\\/2.p-2 > .rounded").click();
		cy.get('[placeholder="Email"]').type("eddysoulo91@gmail.com");
		cy.get('[placeholder="Password"]').clear();
		cy.get('[placeholder="Password"]').type("123456ea");
		cy.get(".flex-grow > .flex > .text-slate-100").click();
		cy.get(":nth-child(2) > :nth-child(1) > .text-center").click();
		cy.get(":nth-child(2) > :nth-child(1) > .text-center").click();
		cy.get(".overflow-y-scroll > :nth-child(2) > :nth-child(1) > .font-bold").click();
		cy.get(".overflow-y-scroll > :nth-child(2) > :nth-child(1) > .font-bold").click();
		cy.get(".overflow-y-scroll > :nth-child(2) > :nth-child(1) > .font-bold").click();
		cy.get(".overflow-y-scroll > :nth-child(2) > :nth-child(1) > .font-bold").click();
		cy.get(":nth-child(2) > :nth-child(2) > .text-center").click();
		cy.get(":nth-child(2) > :nth-child(2) > .font-bold").click();
		cy.get(":nth-child(2) > :nth-child(2) > .font-bold").click();
		cy.get(":nth-child(2) > :nth-child(2) > .font-bold").click();
		cy.get(":nth-child(2) > :nth-child(2) > .font-bold").click();
		cy.get(".hidden > .w-1\\/2 > .rounded").click();
		/* ==== End Cypress Studio ==== */
	});
});

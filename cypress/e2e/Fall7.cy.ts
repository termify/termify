describe("empty spec", () => {
	it("passes", () => {
		cy.visit("develop-termintool.vercel.app");
	});

	/* ==== Test Created with Cypress Studio ==== */
	it("Fall7", function () {
		/* ==== Generated with Cypress Studio ==== */
		cy.visit("https://develop-termintool.vercel.app");
		cy.get(".p-1 > .w-full").select("Köln");
		cy.get("#s-1").click();
		cy.get(".xl\\:grid-cols-2 > :nth-child(1) > .mt-8 > .flex > :nth-child(3) > .w-8").click();
		cy.get(
			".xl\\:grid-cols-2 > :nth-child(1) > :nth-child(2) > :nth-child(2) > :nth-child(24) > .bg-gradient-to-r"
		).click();
		cy.get(".xl\\:grid-cols-2 > .overflow-auto > .flex-col > :nth-child(5) > .bg-indigo-50 > .text-center").click();
		cy.get('[placeholder="Email"]').clear();
		cy.get('[placeholder="Email"]').type("eddysoulo91@gmail.com");
		cy.get('[placeholder="Password"]').clear();
		cy.get('[placeholder="Password"]').type("123456ea{enter}");
		cy.get(".w-full.justify-center > .bg-gradient-to-r").click();
		/* ==== End Cypress Studio ==== */
	});
});

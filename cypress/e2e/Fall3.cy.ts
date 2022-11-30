describe("empty spec", () => {
	it("passes", () => {
		cy.visit("develop-termintool.vercel.app");
	});

	/* ==== Test Created with Cypress Studio ==== */
	it("Fall 3", function () {
		/* ==== Generated with Cypress Studio ==== */
		cy.visit("develop-termintool.vercel.app");
		cy.get(".mt-24 > .text-center").click();
		cy.get(".hidden > .w-1\\/2.p-2").click();
		cy.get('[placeholder="Email"]').click();
		cy.get(".mt-8").click();
		cy.get(".border-2").type("eddysoulo91@gmail.com");
		cy.get(".bg-slate-50 > .flex-col > .bg-gradient-to-r").click();
		/* ==== End Cypress Studio ==== */
	});
});

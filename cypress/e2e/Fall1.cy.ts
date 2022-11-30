describe("empty spec", () => {
	/* ==== Test Created with Cypress Studio ==== */
	it("Fall 1", function () {
		/* ==== Generated with Cypress Studio ==== */
		cy.visit("develop-termintool.vercel.app");
		cy.get(".hidden > .w-1\\/2.p-2 > .rounded").click();
		cy.get('[placeholder="Email"]').clear();
		cy.get('[placeholder="Email"]').type("eddysoulo91@gmail.com");
		cy.get('[placeholder="Password"]').clear();
		cy.get('[placeholder="Password"]').type("123456ea");
		cy.get(".flex-grow > .flex > .text-slate-100").click();
		cy.get(".bg-sky-50 > .p-4 > :nth-child(1)").click();
		cy.get(":nth-child(1) > .px-2").clear();
		cy.get(":nth-child(1) > .px-2").type("Test");
		cy.get(":nth-child(2) > .px-2").clear();
		cy.get(":nth-child(2) > .px-2").type("Drei");
		cy.get(":nth-child(3) > .px-2").clear();
		cy.get(":nth-child(3) > .px-2").type("1980-10-14");
		cy.get(":nth-child(4) > .px-2").clear();
		cy.get(":nth-child(4) > .px-2").type("Elisabethstraße 12");
		cy.get(":nth-child(5) > .px-2").clear();
		cy.get(":nth-child(5) > .px-2").type("00346");
		cy.get(":nth-child(6) > .px-2").clear();
		cy.get(":nth-child(6) > .px-2").type("Berlin");
		cy.get(".justify-center > .bg-gradient-to-r").click();
		/* ==== End Cypress Studio ==== */
	});
});

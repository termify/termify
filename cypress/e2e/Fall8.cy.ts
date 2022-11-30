describe("empty spec", () => {
	it("passes", () => {
		cy.visit("develop-termintool.vercel.app");
	});

	/* ==== Test Created with Cypress Studio ==== */
	it("Fall 8", function () {
		/* ==== Generated with Cypress Studio ==== */
		cy.visit("develop-termintool.vercel.app");
		cy.get(".hidden > .w-1\\/2.p-2").click();
		cy.get('[placeholder="Email"]').type("eddysoulo91@gmail.com");
		cy.get('[placeholder="Password"]').clear();
		cy.get('[placeholder="Password"]').type("123456ea");
		cy.get(".flex-grow > .flex > .text-slate-100").click();
		cy.get(".text-2xl > .bg-clip-text").click();
		cy.get(".p-1 > .w-full").select("Pforzheim");
		cy.get("#s-4").click();
		cy.get(".xl\\:grid-cols-2 > :nth-child(1) > .mt-8 > .flex > :nth-child(3) > .w-8").click();
		cy.get(".xl\\:grid-cols-2 > :nth-child(1) > .mt-8 > .flex > :nth-child(3) > .w-8").click();
		cy.get(
			".xl\\:grid-cols-2 > :nth-child(1) > :nth-child(2) > :nth-child(2) > :nth-child(11) > .bg-gradient-to-r"
		).click();
		cy.get(".xl\\:grid-cols-2 > .overflow-auto > .flex-col > :nth-child(1) > .bg-indigo-50 > .text-center").click();
		cy.get(":nth-child(1) > .border-2").select("Keine Anliegen anwählbar");
		cy.get(".container > :nth-child(1) > .gap-4").click();
		cy.get(".w-full.justify-center > .bg-gradient-to-r").click();
		cy.get(".hidden > .cursor-pointer > a").click();
		cy.get(".hidden > .w-1\\/2").click();
		/* ==== End Cypress Studio ==== */
	});
});

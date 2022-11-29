import Link from "next/link";
import { ReactNode } from "react";

export default function Footer() {
	return (
		<footer className="grid grid-cols-2 place-content-center place-items-center bg-slate-50 p-4 shadow-inner">
			<FooterSection>
				<FooterSectionLink name={"Home"} to={"/"} />
				<FooterSectionLink name={"FAQ"} to={"/faq"} />
			</FooterSection>
		</footer>
	);
}

function FooterSection({ children }: { children: ReactNode }) {
	return <>{children}</>;
}

function FooterSectionLink({ to, name }: { name: string; to: string }) {
	return (
		<Link href={to}>
			<a>{name}</a>
		</Link>
	);
}

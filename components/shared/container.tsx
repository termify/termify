import { ReactElement } from "react";

interface Container {
	children: ReactElement | ReactElement[];
}

export default function Container({ children }: Container) {
	return <main className="flex flex-col flex-grow h-full w-screen">{children}</main>;
}

import { ImageResponse } from "@vercel/og";

export const config = {
	runtime: "experimental-edge",
};

export default function () {
	return new ImageResponse(<OgImage />, {
		width: 1200,
		height: 600,
		emoji: "twemoji",
	});
}

function OgImage() {
	return (
		// eslint-disable-next-line react/no-unknown-property
		<div tw={"bg-slate-50 w-screen h-screen flex justify-center items-center flex-col"}>
			{/* eslint-disable-next-line react/no-unknown-property */}
			<p tw={"text-7xl font-bold "}>Termify</p>
			{/* eslint-disable-next-line react/no-unknown-property */}
			<div tw={"flex"}>
				{/* eslint-disable-next-line react/no-unknown-property */}
				<p tw={"text-5xl"}>Terminplanung einfach gemacht </p>
			</div>
		</div>
	);
}

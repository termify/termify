import { ImageResponse } from '@vercel/og';

export const config = {
    runtime: 'experimental-edge',
};

export default function () {
    return new ImageResponse(<OgImage />, {
        width: 1200,
        height: 600,
        emoji: 'twemoji',
    });
}

function OgImage() {
    return (
        <div tw={'bg-slate-50 w-screen h-screen flex justify-center items-center flex-col'}>
            <p tw={'text-7xl font-bold '}>Termify</p>
            <div tw={'flex'}>
                <p tw={'text-5xl'}>Terminplanung einfach gemacht </p>
            </div>
        </div>
    );
}

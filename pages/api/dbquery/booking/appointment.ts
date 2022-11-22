import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../lib/database';

type AppointmentData = {
    id: number;
    district: {
        id: number;
        districtName: string;
    };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<AppointmentData[]>) {
    switch (req.method) {
        case 'POST':
            await postController(req, res);
            break;
    }
}

const postController = async (req: NextApiRequest, res: NextApiResponse<AppointmentData[]>) => {
    const { districtId } = req.body as { districtId: number };

    const partnerAllData = (await db.partner.findMany({
        include: {
            Office: true,
            District: true,
        },
        where: {
            districtId, //POST Variable setzen
        },
    })) as unknown as AppointmentData[];

    console.log('Data', partnerAllData);

    res.status(200).json(partnerAllData);
};
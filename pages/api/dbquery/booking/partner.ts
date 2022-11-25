import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../lib/database';

type AllPartnerData = {
    id: number;
    district: {
        id: number;
        districtName: string;
    };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<AllPartnerData[]>) {
    switch (req.method) {
        case 'POST':
            await postController(req, res);
            break;
    }
}

const postController = async (req: NextApiRequest, res: NextApiResponse<AllPartnerData[]>) => {
    const { districtId } = req.body as { districtId: number };

    const partnerAllData = (await db.partner.findMany({
        include: {
            Office: true,
            District: true,
        },
        where: {
            districtId, //POST Variable setzen
        },
    })) as unknown as AllPartnerData[];

    console.log('Data', partnerAllData);

    res.status(200).json(partnerAllData);
};

import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../lib/database';

type OfficeData = {
    id: number;
    officeName: string;
    officeDescription?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<OfficeData[]>) {
    switch (req.method) {
        case 'GET':
            await getController(req, res);
            break;
    }
}

const getController = async (req: NextApiRequest, res: NextApiResponse<OfficeData[]>) => {
    const officeData = (await db.office.findMany()) as unknown as OfficeData[];
    console.log(officeData);
    res.status(200).json(officeData);
};

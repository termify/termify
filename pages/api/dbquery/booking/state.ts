import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../lib/database';

type AllStateData = {
    id: number;
    stateName: string;
    district: {
        id: number;
        districtName: string;
    };
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<AllStateData[]>) {
    switch (req.method) {
        case 'GET':
            await getController(req, res);
            break;
    }
}

const getController = async (req: NextApiRequest, res: NextApiResponse<AllStateData[]>) => {
    const stateAllData = (await db.state.findMany({
        where: {
            District: {
                some: {
                    Partner: {
                        some: {},
                    },
                },
            },
        },

        include: {
            District: {
                where: {
                    Partner: {
                        some: {},
                    },
                },
            },
        },
    })) as unknown as AllStateData[];
    res.status(200).json(stateAllData);
};

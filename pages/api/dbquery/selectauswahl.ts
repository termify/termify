// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../lib/database';

type Data = {
    id: number;
    officeName: string;
    officeDescription?: string;
}

export default async function handler(req: NextApiRequest,res: NextApiResponse<Data[]>) {

    const allData = await db.office.findMany() as unknown as Data[];

//   console.log("All",allData)

    res.status(200).json(allData)
}

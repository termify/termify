// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../lib/database';

type DataOffice = {
    id: number;
    officeName: string;
    officeDescription?: string;
}

type DataDistrict = {
    id: number;
    districtName: string;
}

export default async function handler(req: NextApiRequest,res: NextApiResponse<DataOffice[]>) {

    const allOfficeData = await db.office.findMany() as unknown as DataOffice[];
    // console.log("Header",req.header)
    console.log("Headers",req.headers["DBTYPE"])
console.log(req.query)
//   console.log("All",allData)

    res.status(200).json(allOfficeData)
}
//TODO Kevin Bläser: Abfrage zur Auswahl; Landkreis -> Partner => Office


// export async function handler(req: NextApiRequest,res: NextApiResponse<DataDistrict[]>){
//     const allDistrictData = await db.district.findMany() as unknown as DataDistrict[];

//     res.status(200).json(allDistrictData)
// }
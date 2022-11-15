// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/database";

type Data = {
    id: number;
    officeName: string;
    officeDescription?: string;
};

type RequestType = "auwahl" | "district";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data[]>) {
    let allData;

    const { type } = req.query.type as unknown as { type: RequestType };

    switch (type) {
        case "auwahl":
            allData = (await db.office.findMany()) as unknown as Data[];
            break;
    }

    //   console.log("All",allData)
    console.log("Req", req.query.type);

    res.status(200).json(allData);
}
//TODO Kevin Bläser: Abfrage zur Auswahl; Landkreis -> Partner => Office

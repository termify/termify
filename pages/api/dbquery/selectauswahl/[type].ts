// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/database";

type Data = {
    id: number;
    officeName: string;
    officeDescription?: string;
};

type RequestType = "auswahl" | "district";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data[]>) {
    const { type } = req.query as unknown as { type: RequestType };

    switch (type) {
        case "auswahl":
            const allData = (await db.office.findMany()) as unknown as Data[];
            res.status(200).json(allData);
            break;
    }
}
//TODO Kevin Bläser: Abfrage zur Auswahl; Landkreis -> Partner => Office

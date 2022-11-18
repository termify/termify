// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { empty } from "@prisma/client/runtime";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/database";

type AuswahlData = {
    id: number;
    officeName: string;
    officeDescription?: string;
};

type AllPartnerData = {
    id: number;
    district: {
        id: number;
        districtName: string
    }
}

type AllStateData = {
    id: number;
    stateName: string;
    district: {
        id: number;
        districtName: string
    }
    
}

type RequestType = "auswahl" | "district" | "partner" | "state";

export default async function handler(req: NextApiRequest, res: NextApiResponse<AuswahlData[] | AllPartnerData[] | AllStateData[]>) {
    const { type } = req.query as unknown as { type: RequestType };

    switch (type) {
        case "auswahl":
            const officeData = await db.office.findMany() as unknown as AuswahlData[];
            console.log(officeData)
            res.status(200).json(officeData);
            break;
        case "partner":
            const partnerAllData = await db.partner.findMany({
                include: {
                    Office: true,
                    District: true
                }
            }) as unknown as AllPartnerData[];
            res.status(200).json(partnerAllData);
            break;
        case "state":
            const stateAllData = await db.state.findMany({
                where: {
                    District: {
                        some: {
                            Partner: {
                                some: {}
                            }
                        }
                    }
                },
                include: {
                    District: {
                        where: {
                            Partner:{
                                some: {}
                            }
                        }
                    }
                }
            }) as unknown as AllStateData[];
            res.status(200).json(stateAllData);
            break;
    }
}
//TODO Kevin Bläser: Abfrage zur Auswahl; Landkreis -> Partner => Office

import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/database";

//REST API für den Partner
//Hierüber lassen sich die Daten abfragen
//Zeitpunkt der Anfrage = Alle Termine ab diesem Zeitpunkt

//GET PartnerID,Zeitpunkt; Abgleich Termine seitens Termify
//POST Abgleich Termine seitens Kunde
type AppointmentData = {
	id: number;
	partnerId: number;
	userId: string;
    User: {
        id: number;
        uuid: number;
        email: string;
        address: string;
        birthday: Date;
        city: string;
        firstname: string;
        surname: string;
        zipcode: number;
    }
	timestamp: number;
	typeOfRequest: string;
	note: string;
	attachment: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
	switch (req.method) {
		case "GET":
			await getController(req, res);
			break;
		// case "POST":
		// 	await postController(req, res);
		// 	break;
	}
}

const getController = async (req: NextApiRequest, res: NextApiResponse<AppointmentData[]>) => {
	const { partnerId } = req.query as { partnerId: string };

	const appointmentData = (await db.appointment.findMany({
        select: {
            id: true,
            partnerId: true,
            userId: true,
            User: {
                select: {
                    id: true,
                    uuid: true,
                    email: true,
                    address: true,
                    birthday: true,
                    city: true,
                    firstname: true,
                    surname: true,
                    zipcode: true,
                }
            },
            timestamp: true,
            typeOfRequest: true,
            note: true,
            attachment: true,
        },
		where: {
			partnerId: parseInt(partnerId),
		},
	})) as unknown as AppointmentData[];

	res.status(200).json(appointmentData);
};

// const postController = async (req: NextApiRequest, res: NextApiResponse<AppointmentData[]>) => {
// 	const { partnerId, userId, timestamp, typeOfRequest, note, attachment } = req.body as {
// 		partnerId: string;
// 		userId: string;
// 		timestamp: number;
// 		typeOfRequest: string;
// 		note: string;
// 		attachment: string;
// 	};

// 	const appointmentData = (await db.appointment.create({
// 		data: {
// 			userId: userId,
// 			partnerId: parseInt(partnerId),
// 			timestamp: timestamp,
// 			typeOfRequest: typeOfRequest,
// 			note: note,
// 			attachment: attachment,
// 		},
// 	})) as unknown as AppointmentData[];
    
// 	res.status(200).json(appointmentData);
// };
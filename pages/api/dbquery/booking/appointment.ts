import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/database";

type AppointmentData = {
	id: number;
	partnerId: number;
	userId: string;
	timestamp: number;
	typeOfRequest: string;
	note: string;
	attachment: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<AppointmentData[]>) {
	switch (req.method) {
		case "POST":
			await postController(req, res);
			break;
        case "PUT":
            await putController(req, res);
            break;
}
}

const postController = async (req: NextApiRequest, res: NextApiResponse<AppointmentData[]>) => {
	const { partnerId, userId, timestamp, typeOfRequest, note, attachment } = req.body as {
		partnerId: string;
		userId: string;
		timestamp: number;
		typeOfRequest: string;
		note: string;
		attachment: string;
	};

	const appointmentData = (await db.appointment.create({
		data: {
			userId: userId,
			partnerId: parseInt(partnerId),
			timestamp: timestamp,
			typeOfRequest: typeOfRequest,
			note: note,
			attachment: attachment,
		},
	})) as unknown as AppointmentData[];


	// /*insert into "Appointment" ("userId", "partnerId", "timestamp")
	// values ('f0e7f64b-210e-435a-afea-de151148e873','1','2022-11-29 10:30:00')*/
	// insert into "AppointmentEntry" ("apId","typeOfRequest","note","attachment")

	// Select id, 'Bürgergeld' as "typeOfRequest", 'meine Notiz' as "note",
	// 'http://www.link.de/1213' as "attachment" from "Appointment"
	// where "userId" = 'f0e7f64b-210e-435a-afea-de151148e873' and "partnerId" = '1' and "timestamp" = '2022-11-29 10:30:00';

	// console.log('Data', appointmentData);

	res.status(200).json(appointmentData);
};


const putController = async (req: NextApiRequest, res: NextApiResponse<AppointmentData[]>) => {
    const {pickDate} = req.body as { pickDate : {day:number, month:number, year:number}};
	const appointmentPickData = (await db.appointment.findMany({
        where: {
            timestamp: {
                gte: new Date(pickDate.year,pickDate.month - 1,pickDate.day,0,0,0).getTime()/1000,
                lte: new Date(pickDate.year,pickDate.month - 1,pickDate.day,23,59,59).getTime()/1000,
            }
        }
    })) as unknown as AppointmentData[];


    res.status(200).json(appointmentPickData);


};


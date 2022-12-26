import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/database";

export type AppointmentData = {
	id: number;
	partnerId: number;
	userId: string;
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
		case "POST":
			await postController(req, res);
			break;
		case "PUT":
			await putController(req, res);
			break;
	}
}

const getController = async (req: NextApiRequest, res: NextApiResponse<AppointmentData[]>) => {
	const { uuid } = req.query as { uuid: string };
	const { timestamp } = req.query as { timestamp: string };

	const appointmentData = (await db.appointment.findMany({
		orderBy: {
			timestamp: "asc",
		},
		where: {
			userId: uuid,
			timestamp: {
				gte: timestamp,
			},
		},
	})) as unknown as AppointmentData[];

	res.status(200).json(appointmentData);
};

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

	res.status(200).json(appointmentData);
};

const putController = async (req: NextApiRequest, res: NextApiResponse<AppointmentData[]>) => {
	const { pickDate } = req.body as { pickDate: { day: number; month: number; year: number } };
	const appointmentPickData = (await db.appointment.findMany({
		where: {
			timestamp: {
				gte: new Date(pickDate.year, pickDate.month - 1, pickDate.day, 0, 0, 0).getTime() / 1000,
				lte: new Date(pickDate.year, pickDate.month - 1, pickDate.day, 23, 59, 59).getTime() / 1000,
			},
		},
	})) as unknown as AppointmentData[];

	res.status(200).json(appointmentPickData);
};

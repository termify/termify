import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/database";

type AppointmentSlotData = {
	id: number;
	isBlackList: boolean;
	dateFrom: string;
	dateTo: string;
	partnerId: number;
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

const getController = async (req: NextApiRequest, res: NextApiResponse<AppointmentSlotData[]>) => {
	const partnerId = req.query.partnerId as string;

	const appointmentSlotData = (await db.appointmentSlots.findMany({
		where: {
			partnerId: parseInt(partnerId),
		},
	})) as unknown as AppointmentSlotData[];

	res.status(200).json(appointmentSlotData);
};

const postController = async (req: NextApiRequest, res: NextApiResponse<AppointmentSlotData[]>) => {
	const { isBlackList, dateFrom, dateTo, partnerId } = req.body as {
		isBlackList: boolean;
		dateFrom: string;
		dateTo: string;
		partnerId: number;
	};

	const setAppointmentSlotData = (await db.appointmentSlots.create({
		data: { isBlackList, dateFrom, dateTo, partnerId },
	})) as unknown as AppointmentSlotData[];

	res.status(200).json(setAppointmentSlotData);
};

const putController = async (req: NextApiRequest, res: NextApiResponse<AppointmentSlotData[]>) => {
	const { id, isBlackList, dateFrom, dateTo } = req.body as {
		id: number;
		isBlackList: boolean;
		dateFrom: string;
		dateTo: string;
	};

	const updateAppointmentSlotData = (await db.appointmentSlots.updateMany({
		where: {
			id,
		},
		data: {
			isBlackList,
			dateFrom,
			dateTo,
		},
	})) as unknown as AppointmentSlotData[];

	res.status(200).json(updateAppointmentSlotData);
};

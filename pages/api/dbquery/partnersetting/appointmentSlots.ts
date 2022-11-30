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
		case "DELETE":
			await deleteController(req, res);
			break;
	}
}

const deleteController = async (req: NextApiRequest, res: NextApiResponse) => {
	const id = req.query.id as string;

	console.log("EEE", id);

	await db.appointmentSlots.delete({
		where: {
			id: parseInt(id),
		},
	});

	res.status(200).json({ success: true });
};

const getController = async (
	req: NextApiRequest,
	res: NextApiResponse<Record<"whiteList" | "blackList", AppointmentSlotData[]>>
) => {
	const partnerId = req.query.partnerId as string;
	const responseObject: Record<"whiteList" | "blackList", AppointmentSlotData[]> = {
		whiteList: [],
		blackList: [],
	};

	const appointmentSlotData = (await db.appointmentSlots.findMany({
		where: {
			partnerId: parseInt(partnerId),
		},
	})) as unknown as AppointmentSlotData[];

	appointmentSlotData.forEach((e, i) => {
		if (e.isBlackList) {
			responseObject.blackList.push(e);
		} else {
			responseObject.whiteList.push(e);
		}
	});

	res.status(200).json(responseObject);
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

const putController = async (req: NextApiRequest, res: NextApiResponse<AppointmentSlotData[] | any>) => {
	const { partnerId } = req.query as { partnerId: string };

	const { slot } = req.body as {
		slot: { id: number; isBlackList: boolean; dateFrom: string; dateTo: string };
	};

	try {
		const response = await db.appointmentSlots.create({
			data: {
				partnerId: parseInt(partnerId),
				isBlackList: slot.isBlackList,
				dateFrom: slot.dateFrom,
				dateTo: slot.dateTo,
			},
		});

		res.status(200).json({ id: response.id });
	} catch (e) {
		res.status(500).json({ success: false });
	}
};

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

	const { slots } = req.body as {
		slots: { id: number; isBlackList: boolean; dateFrom: string; dateTo: string }[];
	};

	try {
		for await (const slot of slots) {
			if (slot.id === -1) {
				await db.appointmentSlots.create({
					data: {
						partnerId: parseInt(partnerId),
						isBlackList: slot.isBlackList,
						dateFrom: slot.dateFrom,
						dateTo: slot.dateTo,
					},
				});
			} else {
				await db.appointmentSlots.update({
					where: {
						id: slot.id,
					},
					data: {
						isBlackList: slot.isBlackList,
						dateFrom: slot.dateFrom,
						dateTo: slot.dateTo,
					},
				});
			}
		}
		res.status(200).json({ success: true });
	} catch (e) {
		res.status(500).json({ success: false });
	}
};

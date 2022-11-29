import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/database";

type AppointmentSettingData = {
	id: number;
	intervall: number;
	partnerId: number;
	holydaysOn: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
	switch (req.method) {
		case "GET":
			await getController(req, res);
			break;
		case "PUT":
			await putController(req, res);
			break;
	}
}

const getController = async (req: NextApiRequest, res: NextApiResponse<AppointmentSettingData>) => {
	const partnerId = req.query.partnerId as string;

	const appointmentSettingData = (await db.appointmentSettings.findFirst({
		where: {
			partnerId: parseInt(partnerId),
		},
	})) as unknown as AppointmentSettingData;

	res.status(200).json(appointmentSettingData);
};

const putController = async (req: NextApiRequest, res: NextApiResponse<AppointmentSettingData[]>) => {
	
	const { id, intervall, holydaysOn } = req.body as {
		id: number;
		intervall: number;
		holydaysOn: boolean;
	};

	console.log("BODY", req.body);

	const setAppointmentSettingData = (await db.appointmentSettings.update({
		where: {
			id,
		},
		data: {
			intervall,
			holydaysOn,
		},
	})) as unknown as AppointmentSettingData[];

	res.status(200).json(setAppointmentSettingData);
};

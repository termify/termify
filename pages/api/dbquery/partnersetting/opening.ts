import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/database";

type OpeningData = {
	id: number;
	weekday: string;
	timeslotFrom: string;
	timeslotTo: string;
	partnerId: number;
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

const getController = async (req: NextApiRequest, res: NextApiResponse<OpeningData[]>) => {
	const partnerId = req.query.partnerId as string;

	const openingData = (await db.opening.findMany({
		take: 7,
		where: {
			partnerId: parseInt(partnerId),
		},
	})) as unknown as OpeningData[];

	res.status(200).json(openingData);
};

const putController = async (req: NextApiRequest, res: NextApiResponse<OpeningData[]>) => {
	const { id, timeslotFrom, timeslotTo, disabled } = req.body as {
		id: number;
		timeslotFrom: string;
		timeslotTo: string;
		disabled: boolean;
	};

	const setOpeningData = (await db.opening.updateMany({
		where: {
			id,
		},
		data: {
			timeslotFrom,
			timeslotTo,
			disabled,
		},
	})) as unknown as OpeningData[];

	res.status(200).json(setOpeningData);
};

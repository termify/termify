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

const putController = async (req: NextApiRequest, res: NextApiResponse<OpeningData[] | any>) => {
	const { openings } = req.body as {
		openings: { id: number; timeslotFrom: string; timeslotTo: string; disabled: boolean }[];
	};

	try {
		for await (const open of openings) {
			await db.opening.updateMany({
				where: {
					id: open.id,
				},
				data: {
					timeslotFrom: open.timeslotFrom,
					timeslotTo: open.timeslotTo,
					disabled: open.disabled,
				},
			});
		}

		res.status(200).json({ success: true });
	} catch (e) {
		res.status(500).json({ success: false });
	}
};

import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/database";

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

type WebApiConfigEntrie = { active: boolean; qname: string };

export interface WebApiConfig {
	Appointment: {
		id: WebApiConfigEntrie;
		user: {
			userid: WebApiConfigEntrie;
			email: WebApiConfigEntrie;
			birthday: WebApiConfigEntrie;
			firstname: WebApiConfigEntrie;
			surname: WebApiConfigEntrie;
			address: WebApiConfigEntrie;
			zipcode: WebApiConfigEntrie;
			city: WebApiConfigEntrie;
		};
		typeOfRequest: WebApiConfigEntrie;
		note: WebApiConfigEntrie;
		attachment: WebApiConfigEntrie;
		timestamp: WebApiConfigEntrie;
	};
}

const getController = async (req: NextApiRequest, res: NextApiResponse<WebApiConfig>) => {
	const partnerId = req.query.partnerId as string;

	const data = (await db.partner.findFirst({
		where: {
			id: parseInt(partnerId),
		},
	})) as unknown as { webapiconfig: WebApiConfig };

	res.status(200).json(data.webapiconfig);
};

const putController = async (req: NextApiRequest, res: NextApiResponse<any>) => {
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

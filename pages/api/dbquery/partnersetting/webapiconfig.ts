import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
	switch (req.method) {
		case "GET":
			await getController(req, res);
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

const getController = async (req: NextApiRequest, res: NextApiResponse) => {
	const partnerId = req.query.partnerId as string;

	const data = (await db.partner.findFirst({
		where: {
			id: parseInt(partnerId),
		},
	})) as unknown as { webapiconfig: WebApiConfig };

	console.log("Data", data);

	res.status(200).json({ data: JSON.stringify(data.webapiconfig) });
};

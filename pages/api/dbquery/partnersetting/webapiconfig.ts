import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
	switch (req.method) {
		case "GET":
			await getController(req, res);
			break;
		case "POST":
			await postController(req, res);
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

const postController = async (req: NextApiRequest, res: NextApiResponse<{ success: boolean }>) => {
	const partnerId = req.query.partnerId as string;
	const body = req.body as WebApiConfig;

	console.log("Diese Body", body);

	await db.partner.update({
		where: {
			id: parseInt(partnerId),
		},
		data: {
			// @ts-ignore
			webapiconfig: body,
		},
	});

	res.status(200).json({ success: true });
};

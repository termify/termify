import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/database";

type SystemUserData = {
	id: number;
	uuid: string;
	partnerid: number;
};

type UserPartnerData = {
	id: number;
	systemUser: {
		id: number;
		uuid: string;
	};
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<SystemUserData[]>) {
	switch (req.method) {
		case "GET":
			await getController(req, res);
			break;
	}
}

const getController = async (req: NextApiRequest, res: NextApiResponse<SystemUserData[]>) => {
	const uuid = req.query.id as string;

	const userPartnerData = (await db.systemUser.findUnique({
		select: {
			partnerId: true,
		},
		where: {
			uuid,
		},
	})) as unknown as SystemUserData[];

	res.status(200).json(userPartnerData);
};

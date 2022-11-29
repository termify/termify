import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/database";

type OfficeServiceData = {
	id: number;
	serviceText: string;
	serviceDescription?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<OfficeServiceData[]>) {
	switch (req.method) {
		case "POST":
			await postController(req, res);
			break;
	}
}

const postController = async (req: NextApiRequest, res: NextApiResponse<OfficeServiceData[]>) => {
	const { officeId } = req.body as { officeId: number };

	console.log("ID", officeId);

	const officeServiceData = (await db.officeService.findMany({
		select: {
			serviceText: true,
			serviceDescription: true,
		},
		where: {
			officeId,
		},
	})) as unknown as OfficeServiceData[];

	console.log("Office Service", officeServiceData);
	res.status(200).json(officeServiceData);
};

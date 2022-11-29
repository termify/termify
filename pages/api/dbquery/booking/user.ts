import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/database";
import { PersonalDataProps } from "../../../../components/userDashboard";

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
	switch (req.method) {
		case "GET":
			await getController(req, res);
			break;
		case "PUT":
			await updateController(req, res);
			break;
	}
}

const updateController = async (req: NextApiRequest, res: NextApiResponse<{ ok: boolean }>) => {
	const { id } = req.query as { id: string };
	const { firstName, lastName, birthday, street, zipCode, city } = req.body as PersonalDataProps;

	const splitDate = birthday.split("-");

	try {
		await db.user.update({
			where: {
				uuid: id,
			},
			data: {
				firstname: firstName,
				surname: lastName,
				birthday: new Date(parseInt(splitDate[0]), parseInt(splitDate[1]) - 1, parseInt(splitDate[2]) + 1),
				address: street,
				zipcode: parseInt(zipCode),
				city: city,
			},
		});
		res.status(200).json({ ok: true });
	} catch (e) {
		console.error("Fehler", e);
		res.status(200).json({ ok: false });
	}
};

const getController = async (req: NextApiRequest, res: NextApiResponse<PersonalDataProps>) => {
	const { id } = req.query as { id: string };

	const personalData = await db.user.findFirst({
		where: {
			uuid: id,
		},
	});

	if (personalData) {
		res.status(200).json({
			firstName: personalData.firstname!,
			lastName: personalData.surname!,
			birthday: `${personalData.birthday!.getFullYear()}-${personalData.birthday!.getMonth() + 1}-${
				personalData.birthday!.getDate() < 10
					? `0${personalData.birthday!.getDate()}`
					: personalData.birthday!.getDate()
			}`,
			street: personalData.address!,
			zipCode: personalData.zipcode!.toFixed(),
			city: personalData.city!,
		});
	}
};

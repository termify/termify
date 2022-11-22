import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/database";

//TODO Kevin Bläser: Zeitslot Abfragen erstellen

export type OpeningData = {
	id: number;
	weekday: string;
	timeslotFrom: Date | null;
	timeslotTo: Date | null;
};

export type AllASettingsData = {
	id: number;
	intervall: number;
	holydaysOn: boolean;
};

export type AllASlotsData = {
	id: number;
	isBlackList: boolean;
	dateFrom: Date;
	dateTo: Date;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<GetResponse>) {
	switch (req.method) {
		case "GET":
			await getController(req, res);
			break;
	}
}

export interface GetResponse {
	openingData: OpeningData[];
	appointmentData: AllASlotsData[];
	settingData: AllASettingsData[];
}

const getController = async (req: NextApiRequest, res: NextApiResponse<GetResponse>) => {
	const openingData = (await db.opening.findMany({
		select: {
			id: true,
			weekday: true,
			timeslotFrom: true,
			timeslotTo: true,
		},
	})) as unknown as OpeningData[];

	const appointmentData = (await db.appointmentSlots.findMany({
		select: {
			id: true,
			isBlackList: true,
			dateFrom: true,
			dateTo: true,
		},
	})) as unknown as AllASlotsData[];

	const settingData = (await db.appointmentSettings.findMany({
		select: {
			id: true,
			intervall: true,
			holydaysOn: true,
		},
	})) as unknown as AllASettingsData[];

	res.status(200).json({ openingData, appointmentData, settingData });
};

import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../lib/database';

//TODO Kevin Bläser: Zeitslot Abfragen erstellen

export type OpeningData = {
    id: number;
    weekday: string;
    timeslotFrom: Date | null;
    timeslotTo: Date | null;
};

export type AllOpeningData = {
    id: number;
    Opening: OpeningData[];
};

export type AllASettingsData = {
    id: number;
    intervall: number;
};

export type AllASlotsData = {
    id: number;
    AppointmentSlots: {
        id: number;
        isBlackList: boolean;
        dateFrom: Date;
        dateTo: Date;
    };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<GetResponse>) {
    switch (req.method) {
        case 'GET':
            await getController(req, res);
            break;
    }
}

export interface GetResponse {
    openingData: AllOpeningData[];
    appointmentData: AllASlotsData[];
    settingData: AllASettingsData[];
}

const getController = async (req: NextApiRequest, res: NextApiResponse<GetResponse>) => {
    const openingData = (await db.partnerOpening.findMany({
        where: {
            Opening: {
                some: {},
            },
        },
        include: {
            Opening: {
                select: {
                    id: true,
                    weekday: true,
                    timeslotFrom: true,
                    timeslotTo: true,
                },
            },
        },
    })) as unknown as AllOpeningData[];

    const appointmentData = (await db.partnerAppointment.findMany({
        include: {
            AppointmentSlots: {
                select: {
                    id: true,
                    isBlackList: true,
                    dateFrom: true,
                    dateTo: true,
                },
            },
        },
        where: {
            AppointmentSlots: {
                some: {},
            },
        },
    })) as unknown as AllASlotsData[];

    const settingData = (await db.appointmentSettings.findMany({
        select: {
            id: true,
            intervall: true,
        },
    })) as unknown as AllASettingsData[];
    res.status(200).json({ openingData, appointmentData, settingData });
};

import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../lib/database';

type AppointmentData = {
    id: number;
    partnerId: number;
    userId: string;
    timestamp: Date;
    typeOfRequest: string;
    note: string;
    attachment: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<AppointmentData[]>) {
    switch (req.method) {
        case 'POST':
            await postController(req, res);
            break;
    }
}

const postController = async (req: NextApiRequest, res: NextApiResponse<AppointmentData[]>) => {
    const {partnerId, userId, timestamp, typeOfRequest, note, attachment} = req.body as {partnerId:number; userId:string; timestamp:Date; typeOfRequest:string; note: string; attachment: string}

    console.log("Body", req.body);
    
    // const appointmentData = (await db.appointment.create({
    //     data: {
    //         userId: userId,
    //         partnerId: partnerId,
    //         timestamp: timestamp,
    //         typeOfRequest: typeOfRequest,
    //         note: note,
    //         attachment: attachment,
    //     }
    // })) as unknown as AppointmentData[];

// /*insert into "Appointment" ("userId", "partnerId", "timestamp") 
// values ('f0e7f64b-210e-435a-afea-de151148e873','1','2022-11-29 10:30:00')*/
// insert into "AppointmentEntry" ("apId","typeOfRequest","note","attachment") 

// Select id, 'Bürgergeld' as "typeOfRequest", 'meine Notiz' as "note", 
// 'http://www.link.de/1213' as "attachment" from "Appointment" 
// where "userId" = 'f0e7f64b-210e-435a-afea-de151148e873' and "partnerId" = '1' and "timestamp" = '2022-11-29 10:30:00';



    // console.log('Data', appointmentData);

    // res.status(200).json(appointmentData);
    res.status(200).json({});
};
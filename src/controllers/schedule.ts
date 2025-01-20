import { Response, Request} from 'express'
import { getSchedule, createSchedule } from '../db/schedule'



export const getAllSchedule = async (req: Request, res: Response) : Promise<any> => {
    try {
        const schedule = await getSchedule();
        return res.status(200).json({success: true, data: schedule})
    }catch(error) {
        console.error(error)
        return res.status(500).json({ error: "Internal server error"})
    }
};


export const schedules = async (req: Request, res:Response) : Promise<any> => {
    try {
        const {message,tour_id,email,date,phone, name,time_id} = req.body;

        console.log('Received data:', req.body);

        if(!message || !tour_id || !email || !phone || !name ||!date || !time_id ) {
            return res.status(400).json({ error: "Details required"})
        }

        const newSchedules = await createSchedule({
            time_id,
            message,
            email,
            tour_id,
            date,
            phone,
            name,
        });
        return res.status(201).json({ success: true, data: newSchedules });

    }catch(error) {
        console.error(error)
        return res.status(500).json({errror: "Internal server error"})
    }
}


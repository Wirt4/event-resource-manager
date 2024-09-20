import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "middleware/db-connect"
import theaterEvents from "@/mongoose/theater_events/model"
import {EventServices} from "@/mongoose/theater_events/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  await dbConnect()
  let events:any = []
  const services =new EventServices()
  try{
    events = await services.findAllEvents()
  }catch(error){
    console.error({error})
  }
  res.status(200).json(events)
}

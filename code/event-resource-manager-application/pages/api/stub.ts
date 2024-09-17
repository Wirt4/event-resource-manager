import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "middleware/db-connect"
import theaterEvents from "@/mongoose/theater_events/model"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  await dbConnect()
  let events:any = []
  try{
    events = await theaterEvents.find()
  }catch(error){
    console.error({error})
  }
  res.status(200).json(events)
}

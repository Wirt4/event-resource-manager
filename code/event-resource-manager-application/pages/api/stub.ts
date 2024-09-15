import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "middleware/db-connect"
import TheaterEvents from "@/mongoose/theaterEvents/model"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  await dbConnect()
  let events:any = []
  try{
    events = await TheaterEvents.find({})
  }catch(error){
    console.error({error})
  }
  res.status(200).json(events)
}

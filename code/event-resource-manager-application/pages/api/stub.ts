import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "middleware/db-connect"
import {findAllEvents} from "@/mongoose/theaterEvents/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  await dbConnect()
  const events = await findAllEvents()
  console.log('test endpoint called')
  res.status(200).json(events)
}

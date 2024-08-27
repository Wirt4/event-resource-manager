import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "middleware/db-connect"
import { findLocationById } from "mongoose/locations/services"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  await dbConnect()
  const locations = await onUserWishList(['12340', "61390"])
  console.log(typeof locations)
  res.status(200).json(locations)
}

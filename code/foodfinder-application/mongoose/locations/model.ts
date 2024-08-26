import mongoose, { model } from "mongoose"
import { LocationType, LocationSchema } from "mongoose/locations/schema"
export default mongoose.models.locations || model<LocationType>("locations", LocationSchema)